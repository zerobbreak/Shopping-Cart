import { render, screen } from "../utils/test-utils";
import ProductCard from "../../src/components/ProductCard";
import { describe, it, expect } from "vitest";

const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "This is a test product description",
    category: "electronics",
    image: "https://example.com/image.jpg",
};

describe("ProductCard", () => {
    it("renders product details correctly", () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$99.99")).toBeInTheDocument();
        expect(screen.getByText("electronics")).toBeInTheDocument();
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
        expect(image).toHaveAttribute("alt", "Test Product");
    });

    it("links to the correct product page", () => {
        render(<ProductCard product={mockProduct} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/shop/1");
    });
});
