/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type AppContextType = {
  currentUser: User | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState<User | null>({
    name: "Demo User",
    email: "demo@gmail.com",
  });

  return (
    <AppContext.Provider value={{ currentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};