import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { server } from "./mocks/server";
import MovieForm from "../components/MovieForm";
import { http, HttpResponse } from "msw";
// DETTA ÄR FÖR SKOJ SKULL :)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MovieForm-komponent", () => {
  it("skapar en ny film", async () => {
    const mockToken = "mocked-jwt-token";
    const mockOnMovieCreated = vi.fn();
    render(<MovieForm token={mockToken} onMovieCreated={mockOnMovieCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/Titel/i), {
      target: { value: "Ny film" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Regissör/i), {
      target: { value: "Regissör" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Beskrivning/i), {
      target: { value: "En beskrivning" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Produktionsår/i), {
      target: { value: "2023" },
    });

    fireEvent.click(screen.getByText(/Skapa film/i));

    await waitFor(() => {
      expect(mockOnMovieCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Ny film",
          director: "Regissör",
          description: "En beskrivning",
          productionYear: 2023,
        })
      );
    });
  });

  it("visar felmeddelande om POST-anropet misslyckas", async () => {
    server.use(
      http.post("/movies", () => {
        return HttpResponse.json(
          { message: "Ogiltig data för filmen" },
          { status: 400 }
        );
      })
    );

    const mockToken = "mocked-jwt-token";
    const mockOnMovieCreated = vi.fn();
    render(<MovieForm token={mockToken} onMovieCreated={mockOnMovieCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/Titel/i), {
      target: { value: "Ny film" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Regissör/i), {
      target: { value: "Regissör" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Beskrivning/i), {
      target: { value: "En beskrivning" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Produktionsår/i), {
      target: { value: "2023" },
    });

    fireEvent.click(screen.getByText(/Skapa film/i));

    await waitFor(() => {
      expect(screen.getByText(/Kunde inte skapa film/)).toBeInTheDocument();
      expect(mockOnMovieCreated).not.toHaveBeenCalled();
    });
  });
});
