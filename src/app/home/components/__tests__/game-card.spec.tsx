import { act, fireEvent, render, screen } from '@testing-library/react';
import GameCard from '../game-card';
import { allGames } from '@/utils/endpoint';
import { useCartStore } from '@/stores/cart.store';

jest.mock("@/stores/cart.store", () => ({
  useCartStore: jest.fn(),
}));

describe('Header Component', () => {
    test('renders the game card with all the correct elements', () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [],
            addItem: jest.fn(),
            removeItem: jest.fn(),
            clearCart: jest.fn(),
            isAdded: jest.fn(),
        });
        const mockGame = allGames[0];
        render(<GameCard game={mockGame} />);
        const titleElement = screen.getByText(mockGame.name);
        expect(titleElement).toBeInTheDocument();
        const imageElement = screen.getByAltText(mockGame.name);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', mockGame.image);
        const priceElement = screen.getByText(`$${mockGame.price}`);
        expect(priceElement).toBeInTheDocument();
        const buttonElement = screen.getByRole('button', { name: 'Add to Cart' });
        expect(buttonElement).toBeInTheDocument();
        const newTag = screen.getByText('New');
        expect(newTag).toBeInTheDocument();
    });
    test("renders without the new tag if the game is not new", () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [],
            addItem: jest.fn(),
            removeItem: jest.fn(),
            clearCart: jest.fn(),
            isAdded: jest.fn(),
        });
        render(<GameCard game={allGames[1]} />);
        const newTag = screen.queryByText('New');
        expect(newTag).not.toBeInTheDocument();
    });
    test("renders the game card with the correct price", () => {
        render(<GameCard game={allGames[0]} />);
        const priceElement = screen.getByText(`$${allGames[0].price}`);
        expect(priceElement).toBeInTheDocument();
    });
    test("renders the game added to cart", () => {
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [allGames[0]],
            addItem: jest.fn(),
            removeItem: jest.fn(),
            clearCart: jest.fn(),
            isAdded: jest.fn(() => true),
        });
        render(<GameCard game={allGames[0]} />);
        const buttonElement = screen.getByText('Added');
        expect(buttonElement).toBeInTheDocument();
    });
    test("calls addItem when the add button is clicked", async () => {
        const addItem = jest.fn();
        (useCartStore as unknown as jest.Mock).mockReturnValue({
            items: [allGames[0]],
            addItem: addItem,
            removeItem: jest.fn(),
            clearCart: jest.fn(),
            isAdded: jest.fn(),
        });
        render(<GameCard game={allGames[0]} />);
        const buttonElement = screen.getByText('Add to Cart');
        await act(async () => {
           await fireEvent.click(buttonElement);
        });
        expect(addItem).toHaveBeenCalledWith(allGames[0]);
    });
    
    
});
