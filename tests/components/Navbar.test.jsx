import { render, screen } from "../utils/test-utils";
import Navbar from "../../src/components/Navbar";
import { describe, it, expect } from "vitest";

describe("Navbar", () => {
    it("renders navigation links", () => {
        render(<Navbar />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Shop")).toBeInTheDocument();
        expect(screen.getByText("Blog")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("renders the logo", () => {
        render(<Navbar />);
        expect(screen.getByText("Store")).toBeInTheDocument();
    });
});
