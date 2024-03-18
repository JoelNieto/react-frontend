"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Listing } from "../types";

interface ContextProps {
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
}

const GlobalContext = createContext<ContextProps>({
  selectedId: "",
  setSelectedId: (): string => "",
  listings: [],
  setListings: (): Listing[] => [],
});

export const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [selectedId, setSelectedId] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);

  return (
    <GlobalContext.Provider
      value={{ selectedId, setSelectedId, listings, setListings }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
