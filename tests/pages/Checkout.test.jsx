import { render, screen, fireEvent, waitFor } from "../utils/test-utils";
import Checkout from "../../src/pages/Checkout";
import { describe, it, expect, vi } from "vitest";
import * as CartContext from "../../src/context/CartContext";

// Mock CartContext
const mockUseCart = vi.fn();
vi.mock("../../src/context/CartContext", async () => {
    const actual = await vi.importActual("../../src/context/CartContext");
    return {
        ...actual,
        useCart: () => mockUseCart(),
    };
});

// Mock Toast
vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("Checkout Page", () => {
    it("renders empty cart message when cart is empty", () => {
        mockUseCart.mockReturnValue({ cart: [], cartTotal: 0 });
        render(<Checkout />);
        expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });

    it("renders checkout form when cart has items", () => {
        mockUseCart.mockReturnValue({
            cart: [{ id: 1, title: "Item 1", price: 10, quantity: 1, image: "img.jpg" }],
            cartTotal: 10,
            clearCart: vi.fn(),
        });
        render(<Checkout />);
        expect(screen.getByText("Checkout")).toBeInTheDocument();
        expect(screen.getByText("Order Summary")).toBeInTheDocument();
    });

    it("validates form inputs", async () => {
        mockUseCart.mockReturnValue({
            cart: [{ id: 1, title: "Item 1", price: 10, quantity: 1, image: "img.jpg" }],
            cartTotal: 10,
            clearCart: vi.fn(),
        });
        render(<Checkout />);

        const submitBtn = screen.getByText("Pay $10.00");
        fireEvent.click(submitBtn);

        expect(screen.getByText("First name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
});
