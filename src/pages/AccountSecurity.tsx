import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const securityOverview = [
  { label: "Mật khẩu", value: "Đã cập nhật 24 ngày trước", state: "Tốt" },
  { label: "Xác thực 2 lớp", value: "Đang bật qua ứng dụng Authenticator", state: "An toàn" },
  { label: "Email khôi phục", value: "demo@gmail.com", state: "Đã xác minh" },
  { label: "Số điện thoại khôi phục", value: "+84 862 861 730", state: "Đã xác minh" },
];

const sessionDevices = [
  { name: "MacBook Pro 14”", location: "Hà Nội, Việt Nam", time: "Đang hoạt động", status: "Hiện tại" },
  { name: "iPhone 15", location: "Hà Nội, Việt Nam", time: "2 giờ trước", status: "Tin cậy" },
  { name: "Windows PC", location: "TP. Hồ Chí Minh, Việt Nam", time: "1 ngày trước", status: "Cần kiểm tra" },
];

const securityActions = [
  { title: "Đổi mật khẩu", description: "Thiết lập mật khẩu mạnh hơn để tăng an toàn tài khoản.", action: "Cập nhật" },
  { title: "Quản lý thiết bị", description: "Đăng xuất khỏi các thiết bị lạ và giữ lại thiết bị tin cậy.", action: "Xem thiết bị" },
  { title: "Mã dự phòng", description: "Lưu mã dự phòng để đăng nhập khi không có điện thoại.", action: "Tạo mã" },
];

const securityLogs = [
  { title: "Đăng nhập thành công", detail: "MacBook Pro 14” · Hà Nội", time: "Hôm nay, 09:12" },
  { title: "Mật khẩu được thay đổi", detail: "Thực hiện từ iPhone 15", time: "03/04/2026, 22:16" },
  { title: "Thêm thiết bị tin cậy", detail: "Windows PC · TP. Hồ Chí Minh", time: "02/04/2026, 18:03" },
];

export default function AccountSecurity() {
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
            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Bảo mật tài khoản</h3>
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
              Điểm bảo mật tài khoản
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">92/100</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[92%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Tài khoản của bạn đang ở mức an toàn cao. Tiếp tục duy trì các thiết lập hiện tại.
            </p>
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-8">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Trạng thái bảo mật hiện tại</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Theo dõi thông tin xác minh, phương thức đăng nhập và các lớp bảo vệ đang hoạt động.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {securityOverview.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {item.state}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-7">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Phiên đăng nhập & thiết bị</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Kiểm tra những thiết bị đã truy cập và thu hồi quyền nếu phát hiện bất thường.
          </p>
          <div className="mt-5 space-y-3">
            {sessionDevices.map((device) => (
              <div
                key={device.name}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{device.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{device.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-500">{device.time}</p>
                  <p className="mt-1 text-xs font-semibold text-indigo-700">{device.status}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-5">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Hành động bảo mật</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Thực hiện nhanh những thao tác quan trọng để tăng độ an toàn cho tài khoản.
          </p>
          <div className="mt-5 space-y-3">
            {securityActions.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                <button
                  type="button"
                  className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-[#ebe9e9] p-6 xl:col-span-12">
          <h4 className="text-xl font-bold text-slate-900 md:text-2xl">Lịch sử hoạt động bảo mật</h4>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Theo dõi toàn bộ sự kiện đăng nhập và thay đổi thông tin bảo mật gần đây.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {securityLogs.map((log) => (
              <div key={log.title + log.time} className="rounded-2xl bg-white px-4 py-4">
                <p className="text-sm font-semibold text-slate-900">{log.title}</p>
                <p className="mt-1 text-xs text-slate-500">{log.detail}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">{log.time}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
