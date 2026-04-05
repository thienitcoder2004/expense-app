/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  name: string;
  email: string;
};

type Transaction = {
  id: number;
  title: string;
  amount: number;
};

type AppContextType = {
  currentUser: User | null;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  balance: number;
  login: (user: User) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: "Ăn uống", amount: -100000 },
    { id: 2, title: "Lương", amount: 5000000 },
  ]);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    setTransactions([...transactions, { ...t, id: Date.now() }]);
  };

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        transactions,
        addTransaction,
        balance,
        login,
        logout,
      }}
    >
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