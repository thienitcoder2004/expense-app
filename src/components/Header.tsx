import { useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const titleMap: Record<string, string> = {
  "/": "Tổng quan tài chính",
  "/transactions": "Quản lý giao dịch",
  "/categories": "Quản lý danh mục",
  "/budget": "Quản lý ngân sách",
  "/reports": "Báo cáo thống kê",
  "/profile": "Thông tin cá nhân",
};

export default function Header() {
  const location = useLocation();
  const { currentUser } = useApp();

  return (
    <header className="mb-6 rounded-3xl bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {titleMap[location.pathname] || "Expense Manager"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi thu chi và kiểm soát tài chính cá nhân
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
            {(currentUser?.name?.charAt(0) || "U").toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{currentUser?.name}</p>
            <p className="text-xs text-slate-500">{currentUser?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}