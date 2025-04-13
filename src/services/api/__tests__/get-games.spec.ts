import { getGames } from "../get-games";

describe('getGames', () => {
  it('should return games filtered by genre', async () => {
    const response = await getGames({ genre: 'Action', page: 1 });
    expect(response.games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ genre: 'Action' }),
      ])
    );
  });

  it('should return paginated games', async () => {
    const response = await getGames({ page: 1 });
    expect(response.games.length).toBeLessThanOrEqual(12);
    expect(response.totalPages).toBeGreaterThan(0);
  });

  it('should return the first page of games when page is not provided', async () => {
    const response = await getGames({ genre: 'RPG' });
    expect(response.currentPage).toBe(1);
  });

  it('should handle invalid page numbers', async () => {
    const response = await getGames({ genre: 'Action', page: -1 });
    expect(response.currentPage).toBe(1);
    expect(response.games.length).toBeLessThanOrEqual(12);
  });
});
