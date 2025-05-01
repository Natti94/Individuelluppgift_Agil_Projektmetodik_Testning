import React from "react";
import { it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import Login from "../components/Login";
import "whatwg-fetch";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("loggar in och visar filmer med alla fält", async () => {
  render(<Login />);
  fireEvent.change(screen.getByPlaceholderText(/Användarnamn/i), {
    target: { value: "AgilaGrupp3" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Lösenord/i), {
    target: { value: "AgilaGrupp3" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Logga in och hämta filmer/i }));
  await waitFor(() => {
    expect(screen.getByText(/Inception/)).toBeInTheDocument();
    expect(screen.getByText(/Interstellar/)).toBeInTheDocument();
    expect(screen.getAllByText(/Regissör: Christopher Nolan/)).toHaveLength(2); // Updated
    expect(screen.getByText(/Beskrivning: En drömheistfilm/)).toBeInTheDocument();
    expect(screen.getByText(/Produktionsår: 2010/)).toBeInTheDocument();
    // Removed the second expect for "Regissör: Christopher Nolan" since it's redundant
    expect(screen.getByText(/Beskrivning: En rymdresa/)).toBeInTheDocument();
    expect(screen.getByText(/Produktionsår: 2014/)).toBeInTheDocument();
  });
});

it("visar felmeddelande vid misslyckad inloggning", async () => {
  render(<Login />);
  fireEvent.change(screen.getByPlaceholderText(/Användarnamn/i), {
    target: { value: "fel" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Lösenord/i), {
    target: { value: "fel" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Logga in och hämta filmer/i }));
  await waitFor(() => {
    expect(screen.getByText(/Inloggning misslyckades/)).toBeInTheDocument();
  });
});