type CategoryItem = {
  id: number;
  name: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  total: string;
  transactions: number;
  favorite?: boolean;
  system?: boolean;
  subcategories?: string[];
};

const summaryCards = [
  {
    label: "Tổng danh mục",
    value: "16",
    note: "+3 trong tháng này",
    icon: "🗂️",
    tone: "bg-indigo-50 text-indigo-700",
  },
  {
    label: "Danh mục chi",
    value: "11",
    note: "Ăn uống, di chuyển, mua sắm...",
    icon: "💸",
    tone: "bg-rose-50 text-rose-700",
  },
  {
    label: "Danh mục thu",
    value: "5",
    note: "Lương, thưởng, đầu tư...",
    icon: "💰",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Yêu thích",
    value: "4",
    note: "Dùng thường xuyên nhất",
    icon: "⭐",
    tone: "bg-amber-50 text-amber-700",
  },
] as const;

const categories: CategoryItem[] = [
  {
    id: 1,
    name: "Ăn uống",
    type: "expense",
    icon: "🍜",
    color: "bg-rose-100 text-rose-700",
    total: "4.250.000đ",
    transactions: 18,
    favorite: true,
    subcategories: ["Cafe", "Bữa trưa", "Ăn tối"],
  },
  {
    id: 2,
    name: "Di chuyển",
    type: "expense",
    icon: "🛵",
    color: "bg-sky-100 text-sky-700",
    total: "1.280.000đ",
    transactions: 9,
    subcategories: ["Xăng xe", "Gửi xe", "Grab"],
  },
  {
    id: 3,
    name: "Mua sắm",
    type: "expense",
    icon: "🛍️",
    color: "bg-violet-100 text-violet-700",
    total: "2.910.000đ",
    transactions: 11,
    favorite: true,
    subcategories: ["Quần áo", "Đồ dùng học tập"],
  },
  {
    id: 4,
    name: "Hóa đơn",
    type: "expense",
    icon: "🧾",
    color: "bg-orange-100 text-orange-700",
    total: "1.730.000đ",
    transactions: 6,
    system: true,
    subcategories: ["Điện", "Nước", "Internet"],
  },
  {
    id: 5,
    name: "Lương",
    type: "income",
    icon: "💼",
    color: "bg-emerald-100 text-emerald-700",
    total: "9.500.000đ",
    transactions: 2,
    system: true,
    subcategories: ["Lương part-time", "Thưởng"],
  },
  {
    id: 6,
    name: "Freelance",
    type: "income",
    icon: "💻",
    color: "bg-indigo-100 text-indigo-700",
    total: "3.200.000đ",
    transactions: 4,
    favorite: true,
    subcategories: ["Thiết kế UI", "Fix giao diện web"],
  },
];

const templates = [
  "Sinh viên cơ bản",
  "Nhân viên văn phòng",
  "Người mới đi làm",
  "Kinh doanh nhỏ",
];

const quickFilters = ["Tất cả", "Danh mục chi", "Danh mục thu", "Yêu thích", "Hệ thống"];

function TypeBadge({ type }: { type: CategoryItem["type"] }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        type === "income"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      {type === "income" ? "Thu" : "Chi"}
    </span>
  );
}

export default function Categories() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-800">{card.value}</h3>
                <p className="mt-2 text-sm text-slate-500">{card.note}</p>
              </div>
              <div className={`rounded-2xl px-4 py-3 text-2xl ${card.tone}`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Bộ lọc và thao tác nhanh</h3>
            <p className="mt-1 text-sm text-slate-500">
              Giao diện mẫu để tìm kiếm, phân loại và thêm mới danh mục.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white">
              + Tạo danh mục mới
            </button>
            <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
              Import template
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-3xl bg-slate-50 p-4">
            <label className="text-sm font-semibold text-slate-700">Tìm kiếm danh mục</label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-400">
              <span>🔎</span>
              <span className="text-sm">Tìm theo tên danh mục, mô tả, icon...</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((filter, index) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    index === 0
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm font-semibold text-indigo-700">Gợi ý giao diện form tạo danh mục</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-white px-4 py-3">Tên danh mục</div>
              <div className="rounded-2xl bg-white px-4 py-3">Loại: Thu / Chi</div>
              <div className="rounded-2xl bg-white px-4 py-3">Màu sắc</div>
              <div className="rounded-2xl bg-white px-4 py-3">Biểu tượng</div>
              <div className="col-span-2 rounded-2xl bg-white px-4 py-3">Danh mục cha / danh mục con</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Danh sách danh mục</h3>
              <p className="mt-1 text-sm text-slate-500">
                Mẫu hiển thị danh mục chính, danh mục con và trạng thái dùng trong đồ án.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              Hiển thị 6 / 16 danh mục
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-3xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${category.color}`}
                    >
                      {category.icon}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-semibold text-slate-800">{category.name}</h4>
                        <TypeBadge type={category.type} />
                        {category.favorite ? (
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Yêu thích
                          </span>
                        ) : null}
                        {category.system ? (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                            Hệ thống
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {category.subcategories?.map((sub) => (
                          <span
                            key={sub}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:w-fit">
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Tổng phát sinh</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{category.total}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Giao dịch</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{category.transactions} mục</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">
                    Xem chi tiết
                  </button>
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">
                    Sửa danh mục
                  </button>
                  <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600">
                    Thêm danh mục con
                  </button>
                  <button className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600">
                    Xóa / chuyển dữ liệu
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Chi tiết danh mục đang chọn</h3>
            <div className="mt-4 rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-2xl text-rose-700">
                  🍜
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">Ăn uống</h4>
                  <p className="text-sm text-slate-500">Danh mục chi tiêu chính</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Màu sắc</p>
                  <p className="mt-1 font-semibold text-slate-800">Rose / Pink</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Biểu tượng</p>
                  <p className="mt-1 font-semibold text-slate-800">Bát mì</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Danh mục cha</p>
                  <p className="mt-1 font-semibold text-slate-800">Chi tiêu cá nhân</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Trạng thái</p>
                  <p className="mt-1 font-semibold text-amber-600">Yêu thích</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-slate-700">Cây danh mục con</p>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">└── Cafe</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">└── Bữa trưa</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">└── Ăn tối</div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Template danh mục</h3>
                <p className="mt-1 text-sm text-slate-500">Mẫu import có sẵn để người dùng chọn nhanh.</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                Import UI
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {templates.map((template) => (
                <div
                  key={template}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-slate-800">{template}</p>
                    <p className="text-sm text-slate-500">Bao gồm nhóm thu, chi và danh mục con cơ bản</p>
                  </div>
                  <button className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    Chọn mẫu
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Ghi chú cho phần trình bày đồ án</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Đây là giao diện tĩnh, chỉ mô phỏng bố cục và trạng thái hiển thị.</li>
              <li>• Có đủ khu vực để diễn giải các chức năng: tạo, sửa, xóa, yêu thích, hệ thống, danh mục con.</li>
              <li>• Khi demo, bạn chỉ cần nói đây là bản mockup frontend chưa xử lý dữ liệu thật.</li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
