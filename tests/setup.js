import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
})

// Mock IntersectionObserver
const IntersectionObserverMock = function () {
    return {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
    };
};

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);