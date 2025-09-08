import "@testing-library/jest-dom";

// Polyfill TextEncoder / TextDecoder for Jest (Node.js env)
import { TextEncoder, TextDecoder } from "util";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};


(global as any).localStorage = localStorageMock;

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;