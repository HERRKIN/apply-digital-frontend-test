import { use } from "react";
import { GameList } from "@/app/home/components/game-list";
import { GamePages } from "@/app/home/components/game-pages";
import { getGames } from "@/services/api/get-games";
import { GenreDropdown } from "@/app/home/components/genre-dropdown";
import { ArrowLeft } from "lucide-react";
export default function Home(props: { searchParams: { genre?: string | null; page?: number } }) {

  const { games } = use(getGames({
    genre: props.searchParams.genre ?? null,
    page: props.searchParams.page
  }));
  return (
    <main className='flex min-h-[h-screen - 185px] items-center flex-col flex-1 md:p-12 p-4'>
      <div className="flex flex-col w-full max-w-[1172px]">
        {games.length > 0 ? (<> <h1 className="font-archivio text-4xl w-full mb-10">Top Sellers</h1>
        <GenreDropdown selectedGenre={props.searchParams.genre ?? ""} />
        <GameList games={games} />
        <GamePages />
        </>) : (<div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-archivio text-2xl md:text-4xl  mb-10 ">No games found {props.searchParams.genre ? `for ${props.searchParams.genre}` : ""}</h1>
          {props.searchParams.genre && <a href="/" className="text-secondary flex items-center gap-2 border border-secondary shadow-md rounded-md px-5 py-2"><ArrowLeft className="w-4 h-4" />Back to catalog</a>}
        </div>)}
      </div>
    </main>
  )
}
