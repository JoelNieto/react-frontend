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
  savedIds: number[];
  setSavedIds: Dispatch<SetStateAction<number[]>>;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
  showModal: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  savedIds: [],
  setSavedIds: (): number[] => [],
  listings: [],
  setListings: (): Listing[] => [],
  showModal: false,
  toggleModal: () => false,
});

export const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [showModal, toggleModal] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        savedIds,
        setSavedIds,
        listings,
        setListings,
        showModal,
        toggleModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
