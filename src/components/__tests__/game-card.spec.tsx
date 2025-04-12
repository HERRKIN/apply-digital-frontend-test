import { render, screen } from '@testing-library/react';
import GameCard from '../game-card';
import { allGames } from '@/utils/endpoint';
describe('Header Component', () => {
    test('renders the game card with all the correct elements', () => {
        render(<GameCard game={allGames[0]} />);
        const titleElement = screen.getByText(allGames[0].name);
        expect(titleElement).toBeInTheDocument();
        const imageElement = screen.getByAltText(allGames[0].name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', allGames[0].image);
        const priceElement = screen.getByText(`$${allGames[0].price}`);
        expect(priceElement).toBeInTheDocument();
        const buttonElement = screen.getByRole('button', { name: 'Add to Cart' });
        expect(buttonElement).toBeInTheDocument();
        const newTag = screen.getByText('New');
        expect(newTag).toBeInTheDocument();
    });
    test("renders without the new tag if the game is not new", () => {
        render(<GameCard game={allGames[1]} />);
        const newTag = screen.queryByText('New');
        expect(newTag).not.toBeInTheDocument();
    });
    test("renders the game card with the correct price", () => {
        render(<GameCard game={allGames[0]} />);
        const priceElement = screen.getByText(`$${allGames[0].price}`);
        expect(priceElement).toBeInTheDocument();
    });
    
});
