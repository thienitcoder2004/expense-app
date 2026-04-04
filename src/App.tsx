import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AppProvider, { useApp } from "./context/AppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Budget from "./pages/Budget";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";

function PrivateRoute() {
  const { currentUser } = useApp();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}