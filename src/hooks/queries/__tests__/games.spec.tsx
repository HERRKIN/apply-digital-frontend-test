import { Providers, queryClient } from '@/components/providers';
import { useGames } from '../games';
import { gamesService } from '@/services/games';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, waitFor } from '@testing-library/react';

jest.mock('@/services/games');



describe('useGames Hook', () => {
    test('should return the correct data', () => {
        const { result } = renderHook(() => useGames(1), {
            wrapper: ({ children }) => (<Providers>{children}</Providers>)
        });
        expect(result.current.data).toEqual(undefined);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.isSuccess).toBe(false);
    });
});

describe('Games Service', () => {
    const mockedGamesService = gamesService as jest.Mocked<typeof gamesService>;

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should fetch games successfully', async () => {
        const mockData = { games: [{ id: '1', name: 'Game 1', genre: 'Action', image: '', description: '', price: 0, isNew: false }], total: 1, page: 1, limit: 10  };
        const page = 1;
        mockedGamesService.getGames.mockResolvedValue(mockData);
        const { result } = renderHook(() => useGames(page), {
            wrapper: ({ children }) => (<Providers>{children}</Providers>)
        });
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(mockedGamesService.getGames).toHaveBeenCalledWith(page);
        expect(mockedGamesService.getGames).toHaveBeenCalledTimes(1);
    });

    
});
