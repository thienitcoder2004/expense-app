import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const personalInfo = {
  phone: "+84 862 861 730",
  birthday: "26 / 07 / 2004",
  address: "123 Phố Huế, Hai Bà Trưng, Hà Nội",
  memberSince: "THÀNH VIÊN TỪ THÁNG 4, 2026",
};

export default function Profile() {
  const { currentUser } = useApp();
  const userName = currentUser?.name ?? "Demo User";
  const userEmail = currentUser?.email ?? "demo@gmail.com";
  const avatarInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-900 via-[#172a52] to-[#243f78] p-6 text-white shadow-sm md:p-8">
        <div className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-indigo-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-indigo-100">Trung tâm quản lý tài khoản</p>
            <h3 className="mt-3 text-2xl font-bold md:text-4xl">Welcome back, Thin</h3>
            <p className="mt-3 text-base text-indigo-100 md:text-lg">
              Quản lý hồ sơ, cài đặt bảo mật và hoạt động tài chính của bạn tại một nơi an toàn
              duy nhất.
            </p>
          </div>
          <div className="inline-flex w-full max-w-sm items-center gap-4 rounded-3xl bg-white/95 p-4 text-slate-900 shadow-sm">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
              {avatarInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold">{userName}</p>
              <p className="truncate text-sm text-slate-500">{userEmail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <article className="relative overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 text-slate-900 xl:col-span-7">
          <div className="pointer-events-none absolute -right-8 top-4 text-8xl opacity-20">👤</div>
          <h4 className="text-2xl font-bold md:text-3xl">Thông tin cá nhân</h4>
          <p className="mt-3 max-w-xl text-base text-slate-700 md:text-lg">
            Cập nhật chi tiết hồ sơ, quản lý thông tin liên lạc và các tùy chọn cá nhân hóa tài
            khoản của bạn
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-slate-500">Họ và tên</p>
              <p className="mt-1 font-semibold text-slate-900">{userName}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-slate-500">Email</p>
              <p className="mt-1 font-semibold text-slate-900">{userEmail}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-slate-500">Số điện thoại</p>
              <p className="mt-1 font-semibold text-slate-900">{personalInfo.phone}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-slate-500">Ngày sinh</p>
              <p className="mt-1 font-semibold text-slate-900">{personalInfo.birthday}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm">
            <p className="text-slate-500">Địa chỉ</p>
            <p className="mt-1 font-semibold text-slate-900">{personalInfo.address}</p>
          </div>
          <Link
            to="/profile/personal-info"
            className="mt-5 inline-flex text-base font-semibold text-indigo-700 transition hover:text-indigo-800"
          >
            Quản lý hồ sơ →
          </Link>
        </article>

        <article className="relative overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 text-slate-900 xl:col-span-5">
          <div className="pointer-events-none absolute -right-6 top-3 text-8xl opacity-20">🔐</div>
          <h4 className="text-2xl font-bold md:text-3xl">Bảo mật tài khoản</h4>
          <p className="mt-3 max-w-xl text-base text-slate-700 md:text-lg">
            Thiết lập 2FA, đổi mật khẩu và xem các thiết bị đã đăng nhập gần đây.
          </p>
          <button
            type="button"
            className="mt-6 text-base font-semibold text-indigo-700 transition hover:text-indigo-800"
          >
            Kiểm tra trạng thái &gt;
          </button>
        </article>

        <article className="relative overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 text-slate-900 xl:col-span-5">
          <div className="pointer-events-none absolute -right-8 top-4 text-8xl opacity-20">🔔</div>
          <h4 className="text-2xl font-bold md:text-3xl">Tùy chọn thông báo</h4>
          <p className="mt-3 max-w-xl text-base text-slate-700 md:text-lg">
            Quản lý cách chúng tôi liên lạc với bạn về giao dịch, bảo mật và khuyến mãi.
          </p>
          <button
            type="button"
            className="mt-6 text-base font-semibold text-indigo-700 transition hover:text-indigo-800"
          >
            Đặt cảnh báo &gt;
          </button>
        </article>

        <article className="relative overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 text-slate-900 xl:col-span-7">
          <div className="pointer-events-none absolute -right-8 top-4 text-8xl opacity-20">📊</div>
          <h4 className="text-2xl font-bold md:text-3xl">Thống kê hoạt động</h4>
          <p className="mt-3 max-w-2xl text-base text-slate-700 md:text-lg">
            Xem phân tích chi tiết về chi tiêu và tăng trưởng tài sản của bạn trong tháng này.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-medium text-slate-500">Giao dịch tháng này</p>
              <p className="mt-2 text-xl font-bold text-slate-900">186</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-medium text-slate-500">Tiết kiệm ròng</p>
              <p className="mt-2 text-xl font-bold text-emerald-600">+18%</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-medium text-slate-500">Danh mục hoạt động</p>
              <p className="mt-2 text-xl font-bold text-slate-900">12</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-xs font-medium text-slate-500">Mục tiêu hoàn thành</p>
              <p className="mt-2 text-xl font-bold text-indigo-600">72%</p>
            </div>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 text-slate-900 xl:col-span-12">
          <div className="pointer-events-none absolute -right-8 top-4 text-8xl opacity-20">⚙️</div>
          <h4 className="text-2xl font-bold md:text-3xl">Hành động tài khoản</h4>
          <p className="mt-3 max-w-2xl text-base text-slate-700 md:text-lg">
            Đóng tài khoản, xuất dữ liệu hoặc chuyển đổi tài khoản
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {personalInfo.memberSince}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              Xuất dữ liệu
            </button>
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Đăng xuất
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
