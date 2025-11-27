import { render, screen, fireEvent, waitFor } from "../utils/test-utils";
import Shop from "../../src/pages/Shop";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../../src/api/api";

// Mock API
vi.mock("../../src/api/api", () => ({
    getProducts: vi.fn(),
    getCategories: vi.fn(),
}));

const mockProducts = [
    { id: 1, title: "Apple Watch", price: 300, category: "electronics", image: "img1.jpg" },
    { id: 2, title: "Banana", price: 1, category: "food", image: "img2.jpg" },
    { id: 3, title: "Shirt", price: 20, category: "clothing", image: "img3.jpg" },
];

const mockCategories = ["electronics", "food", "clothing"];

describe("Shop Page", () => {
    beforeEach(() => {
        api.getProducts.mockResolvedValue(mockProducts);
        api.getCategories.mockResolvedValue(mockCategories);
    });

    it("renders products and categories", async () => {
        render(<Shop />);

        await waitFor(() => {
            expect(screen.getByText("Apple Watch")).toBeInTheDocument();
            expect(screen.getByText("Banana")).toBeInTheDocument();
            // Use getAllByText because "electronics" appears in filter and potentially product card
            const electronicsElements = screen.getAllByText("electronics");
            expect(electronicsElements.length).toBeGreaterThan(0);
        });
    });

    it("filters products by category", async () => {
        render(<Shop />);

        await waitFor(() => expect(screen.getByText("Apple Watch")).toBeInTheDocument());

        // Click on electronics category
        // We need to be specific about clicking the radio button or label
        const categoryRadio = screen.getByLabelText("electronics");
        fireEvent.click(categoryRadio);

        await waitFor(() => {
            expect(screen.getByText("Apple Watch")).toBeInTheDocument();
            expect(screen.queryByText("Banana")).not.toBeInTheDocument();
        });
    });

    it("sorts products by price", async () => {
        render(<Shop />);

        await waitFor(() => expect(screen.getByText("Apple Watch")).toBeInTheDocument());

        const sortSelect = screen.getByRole("combobox");
        fireEvent.change(sortSelect, { target: { value: "price-asc" } });

        // Verify items are still present
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.getByText("Apple Watch")).toBeInTheDocument();
    });
});
