import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Calculator from "../components/calculator";

beforeEach(() => {
  cleanup();
});

describe("Calculator-komponent", () => {
  it("adderar två tal korrekt", () => {
    render(<Calculator />);
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /Första talet/i }),
      {
        target: { value: "5" },
      }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /Andra talet/i }), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByText("+"));
    expect(
      screen.getByText((content) => content.includes("Resultat: 8"))
    ).toBeInTheDocument();
  });

  it("subtraherar två tal korrekt", () => {
    render(<Calculator />);
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /Första talet/i }),
      {
        target: { value: "5" },
      }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /Andra talet/i }), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByText("-"));
    expect(
      screen.getByText((content) => content.includes("Resultat: 2"))
    ).toBeInTheDocument();
  });

  it("multiplicerar två tal korrekt", () => {
    render(<Calculator />);
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /Första talet/i }),
      {
        target: { value: "4" },
      }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /Andra talet/i }), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByText("*"));
    expect(
      screen.getByText((content) => content.includes("Resultat: 12"))
    ).toBeInTheDocument();
  });

  it("hanterar division med 0", () => {
    render(<Calculator />);
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /Första talet/i }),
      {
        target: { value: "10" },
      }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /Andra talet/i }), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("/"));
    expect(
      screen.getByText((content) => content.includes("Kan inte dela med 0"))
    ).toBeInTheDocument();
  });

  it("dividerar två tal korrekt", () => {
    render(<Calculator />);
    fireEvent.change(
      screen.getByRole("spinbutton", { name: /Första talet/i }),
      {
        target: { value: "6" },
      }
    );
    fireEvent.change(screen.getByRole("spinbutton", { name: /Andra talet/i }), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("/"));
    expect(
      screen.getByText((content) => content.includes("Resultat: 3"))
    ).toBeInTheDocument();
  });
});
