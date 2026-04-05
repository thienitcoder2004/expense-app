export default function Profile() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Hồ sơ cá nhân</h3>
            <p className="mt-2 text-sm text-slate-500">Cập nhật thông tin và xem cấu hình tài khoản.</p>
          </div>
          <button className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-bold text-white">D</div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Demo User</p>
              <p className="mt-1 text-sm text-slate-500">demo@gmail.com</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quyền</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">Premium</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tổng chi</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">$12,780</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900">Cài đặt tài khoản</h4>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Thông báo</p>
              <p className="mt-2 text-sm text-slate-500">Bật thông báo qua email và báo cáo hàng tuần.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Bảo mật</p>
              <p className="mt-2 text-sm text-slate-500">Xác thực hai yếu tố đang tắt.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
