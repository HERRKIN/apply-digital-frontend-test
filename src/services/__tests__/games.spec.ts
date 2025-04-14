
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
        expect(global.fetch).toHaveBeenCalledWith(`/api/games?page=1`);
        expect(result.games).toBeDefined();
    });
    test('should fetch page 2 of games', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ games: [] }),
        });

        const result = await gamesService.getGames(2);
        expect(result).toBeDefined();
        expect(global.fetch).toHaveBeenCalledWith(`/api/games?page=2`);
        expect(result.games).toBeDefined();
    });
    test('should fetch games with genre', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ games: [] }),
        });

        const result = await gamesService.getGames(1, "action");
        expect(result).toBeDefined();
        expect(global.fetch).toHaveBeenCalledWith(`/api/games?page=1&genre=action`);
        expect(result.games).toBeDefined();
    });
});