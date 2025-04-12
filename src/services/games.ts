import { Game } from "@/utils/endpoint";

export type GamesResponse = {
    games: Game[];
    total: number;
    page: number;
    limit: number;
}


export const gamesService = {
    getGames: async (page: number = 1):Promise<GamesResponse> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games?page=${page}`);
        return response.json();
    }
}
