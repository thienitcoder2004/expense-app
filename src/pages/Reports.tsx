export default function Reports() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Báo cáo</h3>
            <p className="mt-2 text-sm text-slate-500">Những phân tích chi tiêu và thu nhập chính.</p>
          </div>
          <button className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Xuất dữ liệu
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Biến động chi tiêu</h4>
          <p className="mt-4 text-3xl font-semibold text-slate-900">+18%</p>
          <p className="mt-2 text-sm text-slate-500">So với tháng trước.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Danh mục hàng đầu</h4>
          <p className="mt-4 text-3xl font-semibold text-slate-900">Đồ ăn & giải trí</p>
          <p className="mt-2 text-sm text-slate-500">Chiếm 31% tổng chi.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Thu nhập trung bình</h4>
          <p className="mt-4 text-3xl font-semibold text-slate-900">$4,660</p>
          <p className="mt-2 text-sm text-slate-500">Theo báo cáo hàng tháng.</p>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h4 className="text-base font-semibold text-slate-900">Xu hướng chính</h4>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-700">Chi tiêu cho ăn uống</p>
            <p className="mt-3 text-sm text-slate-500">Nâng cao 14% so với tháng trước.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-700">Thu nhập thụ động</p>
            <p className="mt-3 text-sm text-slate-500">Tăng đều qua các nguồn đầu tư.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
