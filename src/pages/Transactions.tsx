const sampleTransactions = [
  { date: "24/10/2023", merchant: "Apple Store", category: "Electronics", amount: "- $1,299.00", status: "Expense" },
  { date: "23/10/2023", merchant: "Delta Airlines", category: "Travel", amount: "- $642.50", status: "Expense" },
  { date: "22/10/2023", merchant: "Stripe Payout", category: "Income", amount: "+ $4,200.00", status: "Income" },
  { date: "21/10/2023", merchant: "Blue Bottle Coffee", category: "Dining", amount: "- $12.40", status: "Expense" },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Giao dịch</h3>
            <p className="mt-2 text-sm text-slate-500">Danh sách giao dịch gần đây của bạn.</p>
          </div>
          <button className="self-start rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 md:self-auto">
            Thêm giao dịch
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng thu nhập</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$18,650</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng chi</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$6,478</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Số giao dịch</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">24</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Mức trung bình</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$275</p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
        <h4 className="text-base font-semibold text-slate-900">Chi tiết giao dịch</h4>
        <div className="mt-5 space-y-4">
          {sampleTransactions.map((item) => (
            <div key={item.merchant} className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{item.merchant}</p>
                <p className="text-xs text-slate-500">{item.date} • {item.category}</p>
              </div>
              <div className="flex flex-col items-start gap-2 text-right md:items-end">
                <p className={`text-sm font-semibold ${item.status === "Income" ? "text-emerald-600" : "text-slate-900"}`}>{item.amount}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Income" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
