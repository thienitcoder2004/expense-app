import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/transactions", label: "Giao dịch", icon: "💸" },
  { to: "/categories", label: "Danh mục", icon: "🗂️" },
  { to: "/budget", label: "Ngân sách", icon: "🎯" },
  { to: "/profile", label: "Hồ sơ", icon: "👤" },
  { to: "/reports", label: "Báo cáo thống kê", icon: "🗂️"}
];

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 bg-slate-900 p-4 text-white md:min-h-screen md:w-72">
      <div className="mb-6">
        <p className="text-sm font-medium text-indigo-300">Expense Manager</p>
        <h1 className="mt-1 text-2xl font-bold">Quản lý chi tiêu</h1>
      </div>

      <nav className="flex gap-2 overflow-x-auto md:block md:space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800/50 text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}