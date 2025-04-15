"use client"
import { Game } from "@/utils/endpoint";
import Image from "next/image";
import { useCartStore } from "@/stores/cart.store";
import { cn } from "@/utils/cn";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
export default function GameCard({ game }: { game: Game }) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const cartStore = useCartStore();
  const isAdded = isHydrated ? cartStore.isAdded(game.id) : false;
  return (
    <div className={cn(
      "flex flex-col border border-gray-400 rounded-md p-4 w-full items-center  justify-between sm:max-w-[380px]",
      !isAdded && "hover:shadow-md hover:translate-y-[-1px] transition-all duration-300",
       isAdded && "border-green-500")} data-testid="game-card">
      <div className="bg-image-card bg-cover bg-center w-full max-h-[240px] relative">
        <img src={game.image} alt={game.name} className="w-full h-full object-cover rounded-tl-md rounded-tr-md " />
        {game.isNew && <span className="absolute top-1 left-1 text-secondary bg-stone-100 px-2 py-1 text-sm font-normal rounded-sm">New</span>}
      </div>
      <div className="flex flex-col w-full pt-5">
        <span className=" text-neutral-500 text-sm font-semibold w-full leading-loose uppercase">{game.genre}</span>
        <div className="flex justify-between items-center w-full leading-loose pb-5 ">
          <span className="text-sm font-bold max-w-[70%]">{game.name}</span>
          <span className="text-secondary text-xl font-bold">${game.price}</span>
        </div>
          <button className={cn(
            "group border flex items-center justify-center gap-2 border-neutral-700 text-neutral-500 text-lg font-bold rounded-md p-2",
            isAdded && "bg-secondary text-white"
            )} onClick={() => cartStore.addItem(game)} disabled={isAdded}>
            {isAdded && (<CheckIcon className="w-4 h-4" />)}
            <span className={cn("leading-none",
               !isAdded &&"group-hover:scale-90  group-active:scale-95 transition-all duration-300 text-secondary"
               )}> {isAdded ? "Added" : "Add to Cart"}</span>
          </button>
      </div>
    </div>
  );
}
