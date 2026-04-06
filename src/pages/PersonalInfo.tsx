import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const profileData = {
  fullName: "Đỗ Tấn Thành",
  email: "demo@gmail.com",
  phone: "+84 862 861 730",
  birthday: "26 / 07 / 2004",
  gender: "Nam",
  address: "123 Phố Huế, Hai Bà Trưng, Hà Nội",
  city: "Hà Nội",
  memberSince: "THÀNH VIÊN TỪ THÁNG 4, 2026",
};

export default function PersonalInfo() {
  const { currentUser } = useApp();
  const userName = currentUser?.name ?? profileData.fullName;
  const userEmail = currentUser?.email ?? profileData.email;
  const avatarInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-[#ebe9e9] p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Hồ sơ người dùng
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Thông tin cá nhân</h3>
          </div>
          <Link
            to="/profile"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            ← Quay lại hồ sơ
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <article className="overflow-hidden rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-4">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
            {avatarInitial}
          </div>
          <h4 className="mt-4 text-center text-xl font-bold text-slate-900">{userName}</h4>
          <p className="mt-1 text-center text-sm text-slate-500">{userEmail}</p>
          <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            {profileData.memberSince}
          </p>
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-xs text-slate-500">Số điện thoại</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.phone}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-xs text-slate-500">Ngày sinh</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.birthday}</p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3">
              <p className="text-xs text-slate-500">Giới tính</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.gender}</p>
            </div>
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-8">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Chi tiết hồ sơ</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Cập nhật dữ liệu cá nhân để đồng bộ trải nghiệm quản lý chi tiêu và bảo mật tài khoản.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Họ và tên</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{userName}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{userEmail}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Số điện thoại</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.phone}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ngày sinh</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.birthday}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Địa chỉ</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.address}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Thành phố</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.city}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Giới tính</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{profileData.gender}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              Hủy thay đổi
            </button>
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Cập nhật hồ sơ
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
