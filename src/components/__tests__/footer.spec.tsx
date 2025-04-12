import { render, screen } from '@testing-library/react';
import Footer from '../footer';

describe('Header Component', () => {
    test('renders the footer with the correct elements', () => {
        render(<Footer />);
        const titleElement = screen.getByAltText('Apply Digital Logo');
        expect(titleElement).toBeInTheDocument();
    });
});
