
import { gamesService } from '../games';



describe('gamesService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn()
    });
    test('should fetch games with correct URL', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ games: [] }),
        });

        const result = await gamesService.getGames();
        expect(result).toBeDefined();
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/api/games?page=1`);
        expect(result.games).toBeDefined();
    });
});