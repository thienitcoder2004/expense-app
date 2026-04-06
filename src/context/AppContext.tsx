{/* eslint-disable react-refresh/only-export-components */}
import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type AppContextType = {
  currentUser: User | null;
  balance: number;
  login: (user: User) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [balance] = useState<number>(1250000);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{ currentUser, balance, login, logout }}>
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