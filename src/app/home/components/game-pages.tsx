"use client";

import { useState } from "react";
import { GamePage } from "./game-page";


export const GamePages = () => {
  const [pageCount, setPageCount] = useState(1);
  const [endReached, setEndReached] = useState(false);


  const handlePageCount = () => {
    setPageCount(pageCount + 1);
  };

  const renderPages = () => {
    if (pageCount === 1) return null;
    const firstPage = 2; // first page is 2 because the first page is already rendered from the server
    const length = pageCount - 1; // real page numbers to generate
    return Array.from({ length }, (_, index) => (
      <GamePage
        key={"GAMEPAGE-" + index}
        page={index + firstPage}
        onEndReached={() => setEndReached(true)}
      />
    ));
  };
  return (
    <div>
      {renderPages()}
      {!endReached && (
        <button
          onClick={handlePageCount}
          className="bg-neutral-700 text-white px-4 py-2 rounded-md w-fit mt-10"
        >
          SEE MORE
        </button>
      )}
      {endReached && (
        <div className="text-center text-neutral-400 mt-10 border border-neutral-400 rounded-md p-4 bg-neutral-50">
          No more games to show
        </div>
      )}
    </div>
  );
};
