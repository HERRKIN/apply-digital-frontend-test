import { render, screen, fireEvent } from "@testing-library/react";
import { GenreDropdown } from "../genre-dropdown";
import { availableFilters } from "@/utils/endpoint";

describe("GenreDropdown Component", () => {
  beforeEach(() => {
    delete (window as any).location;
    (window as any).location = { href: "" };
  });

  it('should redirect to "/" when "All" is selected', () => {
    render(<GenreDropdown selectedGenre="" />);
    const selectElement = screen.getByRole("combobox");
    
    fireEvent.change(selectElement, { target: { value: "" } });
    
    expect(window.location.href).toBe("/");
  });

  it('should redirect to `/?genre=<genre>` when a specific genre is selected', () => {
    const testGenre = availableFilters[0];
    render(<GenreDropdown selectedGenre="" />);
    
    const selectElement = screen.getByRole("combobox");
    
    fireEvent.change(selectElement, { target: { value: testGenre } });
    
    expect(window.location.href).toBe(`/?genre=${testGenre}`);
  });
});
