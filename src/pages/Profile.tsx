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
      <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-slate-800">Hồ sơ</h3>
          <p className="text-base text-slate-500">Quản lý thông tin cá nhân</p>
        </div>

        <div className="my-6 h-px w-full bg-slate-200" />

        <div className="space-y-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-semibold text-white">
                  {avatarInitial}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-sm text-white"
                >
                  📷
                </button>
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-900">{userName}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {personalInfo.memberSince}
                </p>
              </div>
            </div>

            <div className="w-full rounded-2xl bg-slate-50 p-4 lg:max-w-lg">
              <p className="text-sm text-slate-500">
                Ảnh đại diện giúp người khác dễ dàng nhận diện bạn trong các báo cáo và giao dịch
                chung.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Họ và Tên</p>
              <div className="rounded-full bg-slate-100 px-5 py-3 text-slate-600">{userName}</div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Email</p>
              <div className="rounded-full bg-slate-100 px-5 py-3 text-slate-600">{userEmail}</div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Số điện thoại</p>
              <div className="rounded-full bg-slate-100 px-5 py-3 text-slate-600">
                {personalInfo.phone}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Ngày sinh</p>
              <div className="rounded-full bg-slate-100 px-5 py-3 text-slate-600">
                {personalInfo.birthday}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium text-slate-700">Địa chỉ</p>
              <div className="rounded-full bg-slate-100 px-5 py-3 text-slate-600">
                {personalInfo.address}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Xóa Tài Khoản
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Hủy Bỏ
            </button>
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
