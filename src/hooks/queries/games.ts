import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { type GamesResponse, gamesService } from "@/services/games";

export const useGames = (page: number, genre: string): UseQueryResult<GamesResponse> => {
    return useQuery({
        queryKey: ["games", page, genre],
        queryFn: () => gamesService.getGames(page, genre),
    });
};
