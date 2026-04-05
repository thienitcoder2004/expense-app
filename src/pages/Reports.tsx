import { useState } from "react";
import { ArrowUp, ArrowDown, Download } from "lucide-react";

export default function Reports() {
  const [range, setRange] = useState("Tháng này");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Báo cáo Phân tích
          </h2>
          <p className="text-slate-500">
            Theo dõi chi tiêu và tài chính của bạn
          </p>
        </div>

        <div className="flex gap-3">
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option>Hôm nay</option>
            <option>Tuần này</option>
            <option>Tháng này</option>
            <option>Năm nay</option>
          </select>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Tổng thu" value="+ 15,000,000đ" icon="up" />
        <Card title="Tổng chi" value="- 8,200,000đ" icon="down" />
        <Card title="Số dư" value="6,800,000đ" />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">
            Chi theo danh mục
          </h3>
          <div className="space-y-3">
            <Progress label="Ăn uống" percent={40} />
            <Progress label="Mua sắm" percent={25} />
            <Progress label="Giải trí" percent={20} />
            <Progress label="Khác" percent={15} />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Thu theo nguồn</h3>
          <div className="space-y-3">
            <Progress label="Lương" percent={70} color="bg-green-500" />
            <Progress label="Freelance" percent={20} color="bg-blue-500" />
            <Progress label="Khác" percent={10} color="bg-purple-500" />
          </div>
        </div>
      </div>

      {/* CASHFLOW */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">
          Dòng tiền theo thời gian
        </h3>
        <div className="h-40 flex items-end gap-2">
          {[20, 40, 30, 60, 80, 50, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-indigo-500 rounded-xl"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* TOP GIAO DỊCH */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">
          Top giao dịch lớn nhất
        </h3>
        <div className="space-y-4">
          <Transaction name="Mua laptop" amount="-25,000,000đ" />
          <Transaction name="Lương tháng" amount="+15,000,000đ" />
          <Transaction name="Du lịch" amount="-8,000,000đ" />
        </div>
      </div>

      {/* SO SÁNH */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">
          So sánh tháng này vs tháng trước
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Compare label="Thu" current="15tr" prev="12tr" up />
          <Compare label="Chi" current="8tr" prev="9tr" />
        </div>
      </div>
    </div>
  );
}
