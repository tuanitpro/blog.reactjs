import { createContext, useContext } from "react";
import type { RefObject } from "react";

export const ScrollContext = createContext<RefObject<HTMLDivElement | null>>({
  current: null,
});

export const useScrollContext = () => useContext(ScrollContext);
