import { render, screen, waitFor } from "../utils/test-utils";
import Home from "../../src/pages/Home";
import { describe, it, expect, vi } from "vitest";
import * as api from "../../src/api/api";

// Mock the API module
vi.mock("../../src/api/api");

const mockProducts = [
    {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "Desc 1",
        category: "cat1",
        image: "img1.jpg",
    },
    {
        id: 2,
        title: "Product 2",
        price: 20,
        description: "Desc 2",
        category: "cat2",
        image: "img2.jpg",
    },
    {
        id: 3,
        title: "Product 3",
        price: 30,
        description: "Desc 3",
        category: "cat3",
        image: "img3.jpg",
    },
];

describe("Home Page", () => {
    it("renders the hero section", () => {
        // Mock the API response
        api.getProductsLimit.mockResolvedValue([]);

        render(<Home />);

        expect(screen.getByText(/Discover Your/i)).toBeInTheDocument();
        expect(screen.getByText(/Perfect Style/i)).toBeInTheDocument();
    });

    it("fetches and displays featured products", async () => {
        api.getProductsLimit.mockResolvedValue(mockProducts);

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.getByText("Product 2")).toBeInTheDocument();
            expect(screen.getByText("Product 3")).toBeInTheDocument();
        });
    });
});
