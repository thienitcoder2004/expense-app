const categories = [
  { title: "Ăn uống", value: "$1,250", ratio: "25%" },
  { title: "Di chuyển", value: "$890", ratio: "18%" },
  { title: "Giải trí", value: "$620", ratio: "13%" },
  { title: "Thu nhập", value: "$4,200", ratio: "33%" },
];

export default function Categories() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Danh mục</h3>
            <p className="mt-2 text-sm text-slate-500">Theo dõi tỉ lệ chi tiêu theo từng danh mục.</p>
          </div>
          <button className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Thêm danh mục
          </button>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <div key={category.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-slate-900">{category.title}</p>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{category.ratio}</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-slate-900">{category.value}</p>
            <p className="mt-2 text-sm text-slate-500">Chi tiêu so với mục tiêu.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
