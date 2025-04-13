import { render, screen } from '@testing-library/react';
import { Summary } from '../sumary';
import { useCartStore } from '@/stores/cart.store';
jest.mock('@/stores/cart.store');

describe('Summary', () => {
  const mockItems = [
    { id: 1, name: 'Game 1', price: 29.99 },
    { id: 2, name: 'Game 2', price: 49.99 },
  ];

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({ items: mockItems });
  });

  test('renders order summary with correct item count', () => {
    render(<Summary />);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText(`${mockItems.length} items`)).toBeInTheDocument();
  });

  test('renders list of items with correct names and prices', () => {
    render(<Summary />);
    mockItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    });
  });

  test('calculates and displays the order total correctly', () => {
    render(<Summary />);
    const total = mockItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });
});
