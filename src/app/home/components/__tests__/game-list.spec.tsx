import { render, screen } from '@testing-library/react';
import { GameList } from '../game-list';
import { allGames } from '@/utils/endpoint';


jest.mock('@/services/games');

describe('GameList Component', () => {
    test('renders the game list with the correct elements', () => {
        const games = allGames.splice(0, 6);
 

        render(<GameList games={games} />); 
        for (const game of games) {
            const titleElement = screen.getByText(game.name);
            expect(titleElement).toBeInTheDocument();
        }
    });
    test('renders nothing when no games are provided', () => {
        render(<GameList games={[]} />);
        expect(screen.queryByText('Game List')).toBeNull();
    });
});
