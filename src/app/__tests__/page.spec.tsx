import { render, screen } from '@testing-library/react';
import { use } from 'react';
import Page from '../page';
import { gamesService } from '@/services/games'; 
import { GamePages } from '@/components/game-pages';
import { GameList } from '@/components/game-list'; 
import { Game } from '@/utils/endpoint'; 

// Mock the service module
jest.mock('@/services/games');
// Mock the child components to isolate the Page component logic
jest.mock('@/components/game-list', () => ({
  GameList: jest.fn(() => <div data-testid="game-list">Mock GameList</div>),
}));
jest.mock('@/components/game-pages', () => ({
  GamePages: jest.fn(() => <div data-testid="game-pages">Mock GamePages</div>),
}));


// Type assertion for the mocked service
const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

// Corrected mock data structure matching the Game interface
const mockGames: Game[] = [
  {
    id: '1',
    name: 'Mock Game 1',
    image: '/mock/img1.jpg',
    price: 10.00, // Price as number
    genre: 'Action', // Added genre
    description: 'Description for Mock Game 1', // Added description
    isNew: true, // Added isNew
  },
  {
    id: '2',
    name: 'Mock Game 2',
    image: '/mock/img2.jpg',
    price: 20.00, // Price as number
    genre: 'RPG', // Added genre
    description: 'Description for Mock Game 2', // Added description
    isNew: false, // Added isNew
  },
];

// Mock the 'use' promise
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));
const mockedUse = use as jest.Mock;


describe('Page Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup the mock for gamesService.getGames to return a resolved promise
    // containing the mock data, simulating the behavior of 'use'
    const mockResponse = {
        games: mockGames,
        total: mockGames.length, // Add total count
        page: 1,                // Add page number
        limit: 10               // Add limit
      };
    const mockPromise = Promise.resolve(mockResponse);
    mockedGamesService.getGames.mockReturnValue(mockPromise);

    // Configure the mock 'use' to return the resolved value of the promise
    // This simulates React Suspense resolving the promise passed to 'use'
    mockedUse.mockImplementation((promise) => {
      // This is a simplified simulation. In a real scenario,
      // testing components using 'use' might require @testing-library/react's async utilities
      // or specific patterns depending on the React version and testing setup.
      // Here, we directly return the expected resolved value for simplicity.
      if (promise === mockPromise) {
        // Return the full mock response object
        return mockResponse;
      }
      // Fallback for other potential uses of 'use'
      return jest.requireActual('react').use(promise);
    });
  });

  test('renders the page title', () => {
    render(<Page />);
    const titleElement = screen.getByText(/Top Sellers/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('fetches games and passes them to GameList', () => {
    render(<Page />);
    // Check if getGames was called
    expect(mockedGamesService.getGames).toHaveBeenCalledTimes(1);

    // Check if 'use' was called with the promise from getGames
    expect(mockedUse).toHaveBeenCalledWith(expect.any(Promise));

    // Check if GameList component was rendered and received the correct props
    expect(GameList).toHaveBeenCalledTimes(1);
    expect(GameList).toHaveBeenCalledWith({ games: mockGames }, {}); // Second arg is context/ref
  });

  test('renders the GamePages component', () => {
      render(<Page />);
      // Check if GamePages component was rendered
      expect(GamePages).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('game-pages')).toBeInTheDocument(); // Check if the mocked component's content is there
  });
});
