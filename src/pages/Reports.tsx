
import { useState } from "react";
import { ArrowUp, ArrowDown, Download } from "lucide-react";

export default function Reports() {
  const [range, setRange] = useState("Tháng này");

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

/* COMPONENTS */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Card({ title, value, icon }: any) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-slate-500 text-sm">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
        {icon === "up" && <ArrowUp className="text-green-500" />}
        {icon === "down" && <ArrowDown className="text-red-500" />}
      </div>
    </div>
  );
}

function Progress({
  label,
  percent,
  color = "bg-indigo-500",
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Transaction({ name, amount }: any) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span>{name}</span>
      <span
        className={
          amount.startsWith("-")
            ? "text-red-500 font-semibold"
            : "text-green-500 font-semibold"
        }
      >
        {amount}
      </span>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Compare({ label, current, prev, up }: any) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <h4 className="text-lg font-bold">{current}</h4>
      <p className="text-xs text-slate-400">
        Tháng trước: {prev}
      </p>
      <p
        className={`text-sm mt-1 ${
          up ? "text-green-500" : "text-red-500"
        }`}
      >
        {up ? "▲ Tăng" : "▼ Giảm"}
      </p>
    </div>
  );
}