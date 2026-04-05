const budgetItems = [
  { title: "Mua sắm", spent: 4300, limit: 5000, color: "bg-indigo-600" },
  { title: "Du lịch", spent: 1850, limit: 2500, color: "bg-emerald-600" },
  { title: "Ăn uống", spent: 1020, limit: 1500, color: "bg-sky-600" },
];

export default function Budget() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Ngân sách</h3>
            <p className="mt-2 text-sm text-slate-500">Thiết lập và theo dõi chi tiêu theo kế hoạch.</p>
          </div>
          <button className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Tạo ngân sách mới
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900">Tổng quan ngân sách</h4>
          <div className="mt-5 space-y-5">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Ngân sách tháng này</p>
                <p className="text-sm font-semibold text-slate-900">$9,000</p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[94%] rounded-full bg-indigo-600" />
              </div>
              <p className="mt-3 text-sm text-slate-600">94% đã được sử dụng.</p>
            </div>

            {budgetItems.map((item) => {
              const percent = Math.round((item.spent / item.limit) * 100);
              return (
                <div key={item.title} className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.spent} / {item.limit} USD</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{percent}%</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900">Lời khuyên tiết kiệm</h4>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl bg-indigo-50 p-5">
              <p className="text-sm font-semibold text-indigo-700">Giảm ăn ngoài</p>
              <p className="mt-2 text-sm text-slate-600">Giảm 12% chi tiêu ăn uống và chuyển vào quỹ tiết kiệm.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Tăng dự phòng</p>
              <p className="mt-2 text-sm text-slate-600">Tạo mục tiêu dự phòng 3 tháng cho chi phí cố định.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
