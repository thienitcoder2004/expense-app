import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const notificationChannels = [
  {
    title: "Thông báo đẩy trên ứng dụng",
    description: "Nhận cảnh báo giao dịch mới, ngân sách sắp vượt mức và nhắc nhở mục tiêu.",
    enabled: true,
  },
  {
    title: "Email thông báo",
    description: "Gửi tổng hợp báo cáo chi tiêu, biến động số dư và hoạt động đăng nhập.",
    enabled: true,
  },
  {
    title: "SMS quan trọng",
    description: "Nhận tin nhắn cho các sự kiện bảo mật hoặc giao dịch có giá trị lớn.",
    enabled: false,
  },
];

const notificationGroups = [
  { name: "Giao dịch", detail: "Biến động số dư, giao dịch mới, hoàn tiền", status: "Đang bật" },
  { name: "Ngân sách", detail: "Sắp chạm hạn mức và vượt ngân sách theo danh mục", status: "Đang bật" },
  { name: "Bảo mật", detail: "Đăng nhập mới, đổi mật khẩu, thiết bị lạ", status: "Bắt buộc" },
  { name: "Khuyến mãi", detail: "Ưu đãi, mẹo tiết kiệm, tính năng mới", status: "Tùy chọn" },
];

const scheduleOptions = [
  { label: "Tổng hợp cuối ngày", time: "21:00", state: "Đã bật" },
  { label: "Báo cáo hàng tuần", time: "Thứ 2 · 08:00", state: "Đã bật" },
  { label: "Báo cáo hàng tháng", time: "Ngày 1 · 09:00", state: "Đã bật" },
];

export default function NotificationPreferences() {
  const { currentUser } = useApp();
  const userName = currentUser?.name ?? "Demo User";
  const userEmail = currentUser?.email ?? "demo@gmail.com";
  const avatarInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-[#ebe9e9] p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Hồ sơ người dùng
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Tùy chọn thông báo
            </h3>
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
          <div className="mt-6 rounded-2xl bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kênh ưu tiên
            </p>
            <p className="mt-2 text-3xl font-bold text-indigo-600">Email + App</p>
            <p className="mt-3 text-sm text-slate-600">
              Bạn đang bật kênh thông báo chính để không bỏ lỡ các giao dịch quan trọng.
            </p>
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-8">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Kênh nhận thông báo</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Bật hoặc tắt từng kênh nhận tin theo nhu cầu sử dụng của bạn.
          </p>
          <div className="mt-5 space-y-3">
            {notificationChannels.map((channel) => (
              <label
                key={channel.title}
                className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{channel.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{channel.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={channel.enabled}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-7">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Nhóm thông báo</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Chọn những loại cảnh báo bạn muốn nhận thường xuyên.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {notificationGroups.map((group) => (
              <div key={group.name} className="rounded-2xl bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{group.name}</p>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {group.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{group.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-5">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Lịch nhắc</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Thiết lập thời điểm nhận báo cáo để phù hợp nhịp sinh hoạt cá nhân.
          </p>
          <div className="mt-5 space-y-3">
            {scheduleOptions.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-600">{item.state}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Thao tác nhanh</h4>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Lưu cấu hình hiện tại hoặc khôi phục cài đặt mặc định.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                Đặt lại mặc định
              </button>
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
