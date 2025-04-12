import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GamePages } from "../game-pages";
import { Providers } from "../providers";
import * as useGamesHook from "../../hooks/queries/games"; 

// Mock the useGames hook
jest.mock("../../hooks/queries/games");
const useGamesMock = useGamesHook.useGames as jest.Mock;

describe("GamesPage Component", () => {
  beforeEach(() => {
    useGamesMock.mockReset();
  });

  test("renders see more button initially", () => {
    render(<GamePages />, {
      wrapper: ({ children }) => <Providers>{children}</Providers>,
    });
    const seeMoreButton = screen.getByRole("button", { name: /see more/i });
    expect(seeMoreButton).toBeInTheDocument();
  });

  test("renders no see more button when endReached is triggered", async () => {
    const user = userEvent.setup();
    useGamesMock.mockReturnValue({
      data: { games: [] },
      isLoading: false,
      isError: false,
      isPending: false,
      error: null,
    });

    render(<GamePages />, {
      wrapper: ({ children }) => <Providers>{children}</Providers>,
    });

    const seeMoreButton = screen.getByRole("button", { name: /see more/i });
    expect(seeMoreButton).toBeInTheDocument(); 

    await user.click(seeMoreButton);

    await waitFor(() => {
        expect(useGamesMock).toHaveBeenCalledWith(2); 
    });

    await waitFor(() => {
        expect(screen.queryByRole("button", { name: /see more/i })).not.toBeInTheDocument();
    });
    expect(screen.getByText(/no more games to show/i)).toBeInTheDocument();
  });

  test("loads the next page when 'SEE MORE' is clicked", async () => {
      const user = userEvent.setup();
      useGamesMock.mockReturnValue({
          data: { games: [{ id: 1, name: "Game 1", background_image: "img1.jpg", slug: "game-1" }] }, 
          isLoading: false,
          isError: false,
          isPending: false,
          error: null,
      });

      render(<GamePages />, {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
      });

      const seeMoreButton = screen.getByRole("button", { name: /see more/i });

      // Click the button to load page 2
      await user.click(seeMoreButton);

      await waitFor(() => {
          expect(useGamesMock).toHaveBeenCalledWith(2);
      });

      // The button should still be visible because we returned data
      expect(screen.getByRole("button", { name: /see more/i })).toBeInTheDocument();
     
      await waitFor(() => {
          expect(screen.getByText("Add to Cart")).toBeInTheDocument();
      });
  });
  test("End Reached", async () => {
      const user = userEvent.setup();
      useGamesMock.mockReturnValue({
          data: { games: [] }, 
          isLoading: false,
          isError: false,
          isPending: false,
          error: null,
      });

      render(<GamePages />, {
          wrapper: ({ children }) => <Providers>{children}</Providers>,
      });
      const seeMoreButton = screen.getByRole("button", { name: /see more/i });

      // Click the button to load page 2
      await user.click(seeMoreButton);

      await waitFor(() => {
          expect(useGamesMock).toHaveBeenCalledWith(2);
      });

      const seeMoreButton2 = screen.queryByRole("button", { name: /see more/i });
      expect(seeMoreButton2).toBeNull();
     
      await waitFor(() => {
          expect(screen.getByText("No more games to show")).toBeInTheDocument();
      });
  });
});

