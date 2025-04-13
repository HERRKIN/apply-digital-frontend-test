import { GET } from "../route";
import { NextRequest } from "next/server";

describe('GET Games API Route', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

   test('should call getGames with correct parameters', async () => {
   jest.mock('@/services/api/get-games', () => ({
       getGames: jest.fn().mockResolvedValue({
           games: [],
           totalPages: 1,
           currentPage: 1
       })
   }));
    const request = new Request('http://localhost/api/games?genre=Action&page=1');
    
    const response = await GET(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('games');
    expect(data).toHaveProperty('availableFilters');
    expect(data.totalPages).toBeGreaterThan(0);
    expect(data.currentPage).toBe(1);
  });
  test('should call getGames without params', async () => {
   jest.mock('@/services/api/get-games', () => ({
       getGames: jest.fn().mockResolvedValue({
           games: [],
           totalPages: 1,
           currentPage: 1
       })
   }));
    const request = new Request('http://localhost/api/games');
    
    const response = await GET(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('games');
    expect(data).toHaveProperty('availableFilters');
    expect(data.totalPages).toBeGreaterThan(0);
    expect(data.currentPage).toBe(1);
  });
});