import { render, screen } from '@testing-library/react';
import { Loader } from '../loader';

describe('Loader Component', () => {
    test('renders loading spinner', () => {
        render(<Loader />);
        const spinner = screen.getByTestId('loader');
        expect(spinner).toBeInTheDocument();
    });
});
