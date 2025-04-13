import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import { CartItem, CartList } from '../cart-list';
import { useCartStore } from '@/stores/cart.store';
import { Game } from '@/utils/endpoint';
jest.mock('@/stores/cart.store');

describe('CartList', () => {
  const mockItems = [
    { id: 1, name: 'Game 1', price: 29.99, image: 'image1.jpg', genre: 'Action', description: 'An action-packed game', isNew: false },
    { id: 2, name: 'Game 2', price: 49.99, image: 'image2.jpg', genre: 'Adventure', description: 'An adventurous game', isNew: true },
  ];

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({ items: mockItems });
  });

  test('renders cart items', () => {
    render(<CartList />);
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    });
  });

  test('renders "New" label for new items', () => {
    render(<CartList />);
    
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});


describe('CartItem', () => {
 

  test('renders cart item details', async () => {
     const mockItem = {
    id: 1,
    name: 'Game 1',
    price: 29.99,
    image: 'image1.jpg',
    genre: 'Action',
    description: 'An action-packed game',
    isNew: false,
  };
    const mockRemoveItem = jest.fn();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
        items: [mockItem],
        removeItem: mockRemoveItem,
    });

    render(<CartItem item={mockItem as unknown as Game} />);
    const removeButton = screen.getByTestId('remove-item');
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.genre)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    await act(async () => {
        await waitFor(() => {
            fireEvent.click(removeButton);
        });
    });
    expect(mockRemoveItem).toHaveBeenCalledWith(mockItem.id);

    
  });
});
