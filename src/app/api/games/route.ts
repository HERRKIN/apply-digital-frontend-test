import { getGames } from "@/services/api/get-games";
import { availableFilters } from "@/utils/endpoint";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const pageParam = searchParams.get("page");
  const page = parseInt(pageParam || "1");


  const { games, totalPages, currentPage } = await getGames({genre, page});

  return Response.json({ games, availableFilters, totalPages, currentPage });
}
