import { Game } from "@/utils/endpoint";
import GameCard from "./game-card";

export  const GameList = ({ games, className }: { games: Game[], className?: string }) => {
  if(games.length === 0) return null;
  return (
    <div className={`grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-1 ${className}`}>
      {games.map((game: Game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};





