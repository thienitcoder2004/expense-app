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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.792V21.02a1.003 1.003 0 01-1.003 1.003H4.003A1.003 1.003 0 013 21.02V3.98a1.003 1.003 0 011.003-1.003h12.995c.554 0 1.003.449 1.003 1.003V9.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 15.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 11.25v2.25a3.75 3.75 0 01-3.75 3.75h-1.5"
            />
          </svg>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Chào mừng trở lại!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Đăng nhập để quản lý chi tiêu của bạn.
          </p>
        </div>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue="demo@example.com"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                defaultValue="password"
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8a7fb8c514a099546270416f24184f494a00386e
