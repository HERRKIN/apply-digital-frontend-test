import { Game } from "@/utils/endpoint";
import Image from "next/image";

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="flex flex-col border border-gray-400 rounded-md p-4 w-full items-center max-w-[380px] justify-between hover:shadow-md hover:translate-y-[-1px] transition-all duration-300 cursor-pointer" data-testid="game-card">
      <div className="bg-image-card bg-cover bg-center w-full max-h-[240px] relative">
        <img src={game.image} alt={game.name} className="w-full h-full object-cover rounded-tl-md rounded-tr-md" />
        {game.isNew && <span className="absolute top-1 left-1 text-secondary bg-stone-100 px-2 py-1 text-sm font-normal rounded-sm">New</span>}
      </div>
      <div className="flex flex-col w-full pt-5">
        <span className=" text-neutral-500 text-sm font-semibold w-full leading-loose uppercase">{game.genre}</span>
        <div className="flex justify-between items-center w-full leading-loose pb-5 ">
          <span className="text-sm font-bold max-w-[70%]">{game.name}</span>
          <span className="text-secondary text-xl font-bold">${game.price}</span>
        </div>
          <button className="group border border-neutral-700 text-neutral-500 text-lg font-bold rounded-md p-2">
            <span className="group-hover:text-sm  group-active:text-lg transition-all duration-300">Add to Cart</span>
          </button>
      </div>
    </div>
  );
}
