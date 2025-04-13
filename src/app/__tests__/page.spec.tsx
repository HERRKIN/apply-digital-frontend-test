import { render, screen } from '@testing-library/react';
import { use } from 'react';
import Page from '../page';
import { gamesService } from '@/services/games'; 
import { GamePages } from '@/components/game-pages';
import { GameList } from '@/components/game-list'; 
import { Game } from '@/utils/endpoint'; 
import { getGames } from '@/services/api/get-games';
// Mock the service module
jest.mock('@/services/games');
// Mock the child components to isolate the Page component logic
jest.mock('@/components/game-list', () => ({
  GameList: jest.fn(() => <div data-testid="game-list">Mock GameList</div>),
}));
jest.mock('@/components/game-pages', () => ({
  GamePages: jest.fn(() => <div data-testid="game-pages">Mock GamePages</div>),
}));

const mockedGetGames = getGames as jest.Mocked<typeof getGames>;


const mockGames: Game[] = [
  {
    id: '1',
    name: 'Mock Game 1',
    image: '/mock/img1.jpg',
    price: 10.00,
    genre: 'Action',
    description: 'Description for Mock Game 1',
    isNew: true,
  },
  {
    id: '2',
    name: 'Mock Game 2',
    image: '/mock/img2.jpg',
    price: 20.00,
    genre: 'RPG',
    description: 'Description for Mock Game 2',
    isNew: false,
  },
];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));
const mockedUse = use as jest.Mock;


describe('Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders the page title', async () => {
    mockedUse.mockImplementation(() => {
      return { games: mockGames, total: mockGames.length, page: 1, limit: 10 };
    });
    render(<Page searchParams={{}} />);
    const titleElement = await screen.findByText(/Top Sellers/i); // Use findByText for async rendering
    expect(titleElement).toBeInTheDocument();
  });
     

  test('fetches games and passes them to GameList', () => {
    render(<Page searchParams={{}} />);
    expect(mockedUse).toHaveBeenCalledWith(expect.any(Promise));
    expect(GameList).toHaveBeenCalledTimes(1);
    expect(GameList).toHaveBeenCalledWith({ games: mockGames }, {});
  });

  test('renders the GamePages component', () => {
      render(<Page searchParams={{}} />);
      expect(GamePages).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('game-pages')).toBeInTheDocument();
  });
});
