import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { balance } = useApp();

  return (
    <div className="space-y-6 max-w-[1480px] mx-auto">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-600">Tổng tài sản</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">$1,422,094</h1>
            <p className="mt-3 text-sm text-slate-500">+12.4% so với quý trước</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Chi tiêu tháng</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">$8,432</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mục tiêu tiết kiệm</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">84% đạt</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Thu nhập</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">$12,400</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Giao dịch gần đây</h2>
                <p className="mt-1 text-sm text-slate-500">Những lần chi tiêu và nhận tiền mới nhất</p>
              </div>
              <button className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Xem tất cả
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { date: "24/10/2023", merchant: "Apple Store", category: "Điện tử", amount: "- $1,299" },
                { date: "23/10/2023", merchant: "Vietnam Airlines", category: "Du lịch", amount: "- $642" },
                { date: "22/10/2023", merchant: "Chuyển khoản lương", category: "Thu nhập", amount: "+ $4,200" },
                { date: "21/10/2023", merchant: "Cà phê Ngó", category: "Ăn uống", amount: "- $12" },
              ].map((item) => (
                <div key={item.merchant} className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.merchant}</p>
                    <p className="text-xs text-slate-500">{item.date} • {item.category}</p>
                  </div>
                  <p className={`text-sm font-semibold ${item.amount.startsWith("+") ? "text-emerald-600" : "text-slate-900"}`}>{item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Lời nhắc tiết kiệm</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Chi tiêu ăn uống cao</p>
                <p className="mt-3 text-sm text-slate-500">Ăn uống tăng 24% so với tuần trước, có thể bạn nên chi tiêu ít hơn.</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Cơ hội tiết kiệm</p>
                <p className="mt-3 text-sm text-slate-500">Nếu giảm chi tiêu không cần thiết, bạn có thể tiết kiệm thêm $2,000.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Tổng thu tháng này</h3>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">$12,400</p>
            <p className="mt-1 text-sm text-slate-500">Tất cả khoản tiền nhận</p>
            <p className="mt-3 text-xs text-emerald-600 font-medium">+12% so với tháng trước</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Tổng chi tháng này</h3>
            <p className="mt-2 text-2xl font-semibold text-rose-600">$8,432</p>
            <p className="mt-1 text-sm text-slate-500">Tất cả khoản chi tiêu</p>
            <p className="mt-3 text-xs text-slate-600 font-medium">3 giao dịch lớn nhất: Mua sắm, Ăn uống, Du lịch</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Số dư hiện tại</h3>
            <p className="mt-2 text-2xl font-semibold text-indigo-600">$3,968</p>
            <p className="mt-1 text-sm text-slate-500">Thu - Chi</p>
            <p className="mt-3 text-xs text-slate-600 font-medium">Cập nhật đến hôm nay</p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Chi tiêu theo loại</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">Ăn uống</span>
                <span className="font-semibold text-slate-900">$2,540</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">Du lịch</span>
                <span className="font-semibold text-slate-900">$1,850</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">Mua sắm</span>
                <span className="font-semibold text-slate-900">$4,042</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Ngân sách còn lại</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">$568</p>
              </div>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">92%</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">Còn lại từ $9,000</p>
          </div>
        </aside>
      </div>
    </div>
  );

}

