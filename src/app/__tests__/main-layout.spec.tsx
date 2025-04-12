import { render, screen } from '@testing-library/react';
import { MainLayout } from '@/components/main-layout';
import RootLayout, {  metadata } from '../layout';
 
jest.mock('next/font/google', () => ({
    Inter: ({ subsets }: { subsets: string[] }) => ({
        className: 'font-inter',
    }),
}));

describe('MainLayout Component', () => {
    test('renders children correctly', () => {
        render(
            <MainLayout>
                <div>Test Child</div>
            </MainLayout>
        );
        const childElement = screen.getByText('Test Child');
        expect(childElement).toBeInTheDocument();
    });

    test('renders Header and Footer', () => {
        render(
            <MainLayout>
                <div>Test Child</div>
            </MainLayout>
        );
        const headerElement = screen.getByText(/GamerShop/i);
        const footerElement = screen.getByAltText('Apply Digital Logo');
        expect(headerElement).toBeInTheDocument();
        expect(footerElement).toBeInTheDocument();
    });
});

describe('Root Layout', () => {
    test('renders children correctly', () => {
        render(<RootLayout>
            <div>Test Child</div>
        </RootLayout>
    );
        const childElement = screen.getByText('Test Child');
        expect(childElement).toBeInTheDocument();
    });
    test("metadata", () => {
        expect(metadata.title).toBeDefined();
        expect(metadata.description).toBeDefined();
    });
});