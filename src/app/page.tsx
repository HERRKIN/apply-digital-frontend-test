import { use } from "react";
import { GameList } from "@/components/game-list";
import { GamePages } from "@/components/game-pages";
import { getGames } from "@/services/api/get-games";
import { GenreDropdown } from "@/components/genre-dropdown";
export default function Home(props: { searchParams: { genre?: string | null; page?: number } }) {

  const { games } = use(getGames({
    genre: props.searchParams.genre ?? null,
    page: props.searchParams.page
  }));

  return (
    <main className='flex min-h-screen flex-col items-center p-12'>
      <div className="flex flex-col">
        <h1 className="font-archivio text-4xl w-full mb-10">Top Sellers</h1>
        <GenreDropdown selectedGenre={props.searchParams.genre ?? ""} />
        <GameList games={games} />
        <GamePages />
      </div>
    </main>
  )
}
