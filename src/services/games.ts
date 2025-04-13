import { Game } from "@/utils/endpoint";

export type GamesResponse = {
    games: Game[];
    total: number;
    page: number;
    limit: number;
}


export const gamesService = {
    getGames: async (page: number = 1, genre: string = ""):Promise<GamesResponse> => {
        const genreQuery = genre.length > 0 ? `&genre=${genre}` : "";

        const response = await fetch(`/api/games?page=${page}${genreQuery}`);
        return response.json();
    }
}
