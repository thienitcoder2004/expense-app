import { useMemo, useState } from "react";

type BudgetItem = {
  id: number;
  category: string;
  amount: number;
};

export default function Budget() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: 1, category: "Tiêu dùng hàng ngày", amount: 1200000 },
    { id: 2, category: "Giải trí", amount: 800000 },
  ]);

  const totalBudget = useMemo(
    () => budgets.reduce((sum, item) => sum + item.amount, 0),
    [budgets]
  );

  const handleAddBudget = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (!category.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const newBudget: BudgetItem = {
      id: Date.now(),
      category: category.trim(),
      amount: parsedAmount,
    };

    setBudgets((current) => [newBudget, ...current]);
    setCategory("");
    setAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Ngân sách</h3>
            <p className="mt-2 text-slate-600">Thiết lập và theo dõi ngân sách của bạn.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-right shadow-sm sm:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Tổng ngân sách
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalBudget.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Tạo ngân sách mới</p>
                <p className="mt-1 text-sm text-slate-500">Thêm nhóm chi tiêu và ngân sách tương ứng.</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {budgets.length} mục
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleAddBudget}>
              <label className="block text-sm font-medium text-slate-700">
                Danh mục
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Ví dụ: Ăn uống"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Số tiền (VND)
                <input
                  type="number"
                  min="0"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="1.000.000"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                Thêm ngân sách
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Nhóm chi tiêu</p>
                <p className="mt-1 text-sm text-slate-500">Xem tổng quan từng mục ngân sách.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Cập nhật vừa phải
              </span>
            </div>

            <div className="mt-6 space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {budgets.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.category}</p>
                    <p className="mt-1 text-sm text-slate-500">Ngân sách giới hạn</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.amount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
