"use client";

import { useEffect } from "react";
import { useGames } from "../../../hooks/queries/games";
import { GameList } from "./game-list";
import { Loader } from "../../../components/loader";
import { useSearchParams } from "next/navigation";


export const GamePage = ({
  page,
  onEndReached,
}: {
  page: number;
  onEndReached: () => void;
}) => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") ?? "";
  const { data, isError, isLoading, error, isPending } = useGames(page, genre);
  useEffect(() => {
    if (!isPending && !isError && !isLoading && data.games.length === 0) {
      onEndReached();
    }
  }, [isPending, isError, isLoading, data, onEndReached]);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data || data.games.length === 0) return null;
  return (
      <GameList games={data?.games} className="mt-4"/>
  );
};
