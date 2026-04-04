import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { balance } = useApp();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Tổng quan tài chính</h1>
      <p className="mb-6 text-gray-600">
        Theo dõi thu chi và kiểm soát tài chính cá nhân
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Số dư hiện tại</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {balance.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}