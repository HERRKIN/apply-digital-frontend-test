import { delay } from "@/utils/endpoint";

import { allGames } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;
export const getGames = async ({genre, page=1}: {genre: string | null, page?: number }) => {
  let pageNumber = page
  if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;

  let games = allGames;

  if (genre) {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  await delay(2000);

  const fromIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const toIndex = pageNumber * ITEMS_PER_PAGE;
  games = games.slice(fromIndex, toIndex);

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);
  const currentPage = pageNumber;

  return { games, totalPages, currentPage };
};
