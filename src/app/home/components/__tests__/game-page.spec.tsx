import { render, screen } from "@testing-library/react";
import { GamePage } from "../game-page";
import * as gamesHooks from "@/hooks/queries/games";
import { allGames, Game } from "@/utils/endpoint";
import { QueryObserverResult, RefetchOptions, UseQueryResult } from "@tanstack/react-query";
import { GamesResponse } from "@/services/games";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

jest.mock('next/navigation');

jest.mock('@/hooks/queries/games');

describe("GamePage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calls the useGames hook and render loader", () => {
    (gamesHooks.useGames as jest.MockedFunction<typeof gamesHooks.useGames>).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
        isPending: true,
        isLoadingError: false,
        isRefetchError: false,
        isPlaceholderData: false,
        status: "pending",
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: false,
        isFetchedAfterMount: false,
        isFetching: false,
        isInitialLoading: true,
        isPaused: false,
        isRefetching: false,
        isStale: false,
        refetch: jest.fn().mockResolvedValue({ data: { games: [], total: 0, page: 0, limit: 0 }, error: null }),
        fetchStatus: "idle",
        promise: Promise.resolve({ games: [], total: 0, page: 0, limit: 0 } as GamesResponse)
    });
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue({
        get: jest.fn().mockReturnValue(""),
    } as unknown as ReadonlyURLSearchParams);
    const endReached = jest.fn();
    render(<GamePage page={2} onEndReached={endReached} />);
    // Expect the mocked hook to have been called
    expect(gamesHooks.useGames).toHaveBeenCalledWith(2, "");
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(endReached).not.toHaveBeenCalled();
  });

  test("render the game list", () => {
    const endReached = jest.fn();
    // Cast the mocked function and set its return value for this test
    (gamesHooks.useGames as jest.MockedFunction<typeof gamesHooks.useGames>).mockReturnValue({
      data: { games: allGames.slice(0, 12), total: 12, page: 1, limit: 10 },
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      status: "success",
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isStale: false,
      refetch: jest.fn().mockResolvedValue({ data: { games: [], total: 0, page: 0, limit: 0 }, error: null }),
      fetchStatus: "idle",
      promise: Promise.resolve({ games: [], total: 0, page: 0, limit: 0 } as GamesResponse)
    });
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue({
        get: jest.fn().mockReturnValue(""),
    } as unknown as ReadonlyURLSearchParams);
    render(<GamePage page={2} onEndReached={endReached} />);
    // Expect the mocked hook to have been called
    expect(gamesHooks.useGames).toHaveBeenCalledWith(2, "");
    expect(screen.getAllByTestId("game-card").length).toBe(12);
  });

  test("render no games and called onEndReached", () => {
    const endReached = jest.fn();
    (gamesHooks.useGames as jest.MockedFunction<typeof gamesHooks.useGames>).mockReturnValue({
      data: { games: [], total: 0, page: 1, limit: 10 },
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      status: "success",
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isStale: false,
      refetch: jest.fn().mockResolvedValue({ data: { games: [], total: 0, page: 0, limit: 0 }, error: null }),
      fetchStatus: "idle",
      promise: Promise.resolve({ games: [], total: 0, page: 0, limit: 0 } as GamesResponse)
    });
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue({
        get: jest.fn().mockReturnValue(""),
    } as unknown as ReadonlyURLSearchParams);
    render(<GamePage page={2} onEndReached={endReached} />);
    // Expect the mocked hook to have been called
    expect(gamesHooks.useGames).toHaveBeenCalledWith(2, "");
    const gameCards = screen.queryAllByTestId("game-card")
    expect(gameCards.length).toBe(0);
    expect(endReached).toHaveBeenCalled();
  });

  test("render error", () => {
    const endReached = jest.fn();
    (gamesHooks.useGames as jest.MockedFunction<typeof gamesHooks.useGames>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: new Error("Error"),
      isPending: false,
      isLoadingError: true,
      isRefetchError: false,
      isPlaceholderData: false,
      status: "error",
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isStale: false,
      refetch: jest.fn().mockResolvedValue({ data: { games: [], total: 0, page: 0, limit: 0 }, error: null }),
      fetchStatus: "idle",
      promise: Promise.resolve({ games: [], total: 0, page: 0, limit: 0 } as GamesResponse)
    });
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue({
        get: jest.fn().mockReturnValue(""),
    } as unknown as ReadonlyURLSearchParams);
    render(<GamePage page={2} onEndReached={endReached} />);
    expect(gamesHooks.useGames).toHaveBeenCalledWith(2, "");
    expect(screen.getByText("Error: Error")).toBeInTheDocument();
    expect(endReached).not.toHaveBeenCalled();
  });
  test("Renders with no genre", () =>{
    (gamesHooks.useGames as jest.MockedFunction<typeof gamesHooks.useGames>).mockReturnValue({
      data: { games: allGames.slice(0, 12), total: 12, page: 1, limit: 10 },
      isLoading: false, 
      isError: false,
      isSuccess: true,
      error: null,
      isPending: false,
      isLoadingError: false,
      isRefetchError: false,
      isPlaceholderData: false,
      status: "success",
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isRefetching: false,
      isStale: false,
      refetch: jest.fn().mockResolvedValue({ data: { games: [], total: 0, page: 0, limit: 0 }, error: null }),
      fetchStatus: "idle",
      promise: Promise.resolve({ games: [], total: 0, page: 0, limit: 0 } as GamesResponse)
    });
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValue({
        get: jest.fn().mockReturnValue(undefined),
    } as unknown as ReadonlyURLSearchParams);
    render(<GamePage page={2} onEndReached={() => {}} />);
    expect(gamesHooks.useGames).toHaveBeenCalledWith(2, "");
    expect(screen.getAllByTestId("game-card").length).toBe(12);
  })
});