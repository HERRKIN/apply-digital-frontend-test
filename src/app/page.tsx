import { gamesService } from "@/services/games";
import { use } from "react";
import { GameList } from "@/components/game-list";
import { GamePages } from "@/components/game-pages";
export default function Home() {
  const { games } = use(gamesService.getGames())

  return (
    <main className='flex min-h-screen flex-col items-center p-12'>
      <div className="flex flex-col">
        <h1 className="font-archivio text-4xl w-full mb-10">Top Sellers</h1>
        <GameList games={games} />
        <GamePages />
      </div>
    </main>
  )
}
