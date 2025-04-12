import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('Header Component', () => {
    test('renders the header with the correct title', () => {
        render(<Header />);
        const titleElement = screen.getByTestId('header-link');
        const cartIcon = screen.getByTestId('cart-link');
        expect(titleElement).toBeInTheDocument();
        expect(cartIcon).toBeInTheDocument();
        expect(cartIcon).toHaveAttribute('href', '/cart');
        expect(cartIcon).toHaveAttribute('aria-label', 'Cart');
        expect(cartIcon.firstChild).toHaveClass('lucide-shopping-cart');
    });
});
