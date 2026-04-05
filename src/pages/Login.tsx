import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = () => {
    // Giả lập việc đăng nhập thành công
    login({ name: "Demo User", email: "demo@example.com" });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 text-slate-900">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Sovereign Insight</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Đăng nhập vào tài khoản</h2>
          <p className="mt-2 text-sm text-slate-500">Quản lý chi tiêu và theo dõi tài chính cá nhân.</p>
        </div>

        <form className="space-y-5">
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Mật khẩu
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <button className="w-full rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Bạn chưa có tài khoản? <span className="font-semibold text-indigo-600">Đăng ký ngay</span>
        </p>
      </div>
    </div>
  );
}