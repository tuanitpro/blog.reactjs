import "@testing-library/jest-dom";

// Polyfill TextEncoder / TextDecoder for Jest (Node.js env)
import { TextEncoder, TextDecoder } from "util";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).localStorage = localStorageMock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder = TextDecoder;