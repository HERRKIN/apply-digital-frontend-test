"use client";
import { availableFilters } from "@/utils/endpoint";

export const GenreDropdown = ({selectedGenre}: { selectedGenre: string }) => {
    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = event.target.value;
        if(genre === ""){
            window.location.href = "/";
        }else{
            window.location.href = `/?genre=${genre}`;
        }
    };

    return (
        <div className="flex justify-end items-center gap-2 py-4 text-xl">
            <label htmlFor="genre-dropdown" className=" text-secondary font-bold">Genre</label>
            <select value={selectedGenre} onChange={handleGenreChange} className=" px-4 text-left border-l border-secondary">
                <option value="">All</option>
                {availableFilters.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
};