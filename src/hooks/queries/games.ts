import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { type GamesResponse, gamesService } from "@/services/games";

export const useGames = (page: number): UseQueryResult<GamesResponse> => {
    return useQuery({
        queryKey: ["games", page],
        queryFn: () => gamesService.getGames(page),
    });
};
