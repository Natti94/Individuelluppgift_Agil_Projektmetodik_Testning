import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "../components/Calculator";

describe("Calculator-komponent", () => {
  it("adderar två tal korrekt", () => {
    render(<Calculator />);
    fireEvent.change(screen.getByRole("textbox", { name: /num1/i }), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /num2/i }), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Resultat: 8")).toBeInTheDocument();
  });

  it("hanterar division med 0", () => {
    render(<Calculator />);
    fireEvent.change(screen.getByRole("textbox", { name: /num1/i }), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /num2/i }), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("/"));
    expect(screen.getByText("Kan inte dela med 0")).toBeInTheDocument();
  });
});
