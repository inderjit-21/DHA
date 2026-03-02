"use client";
import { createContext, useContext, useRef } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const imagesRef = useRef([]);
  return (
    <AppContext.Provider value={imagesRef}>
        {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useImages must be used inside ImageProvider");
  return ctx;
};
