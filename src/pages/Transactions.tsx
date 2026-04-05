import { useEffect, useMemo, useState } from "react";

type TransactionType = "income" | "expense";

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type Transaction = {
  id: string;
  idCode: string;
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
};

const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Ăn uống", icon: "🍔", color: "bg-orange-100 text-orange-600" },
  { id: "cat-2", name: "Di chuyển", icon: "🚕", color: "bg-sky-100 text-sky-600" },
  { id: "cat-3", name: "Mua sắm", icon: "🛍️", color: "bg-pink-100 text-pink-600" },
  { id: "cat-4", name: "Lương", icon: "💼", color: "bg-emerald-100 text-emerald-600" },
  { id: "cat-5", name: "Khác", icon: "📦", color: "bg-slate-100 text-slate-600" },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tr-1",
    idCode: "TR-2026-101",
    description: "Ăn trưa văn phòng",
    amount: 85000,
    type: "expense",
    categoryId: "cat-1",
    date: "2026-04-05",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "tr-2",
    idCode: "TR-2026-102",
    description: "Đổ xăng",
    amount: 120000,
    type: "expense",
    categoryId: "cat-2",
    date: "2026-04-04",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "tr-3",
    idCode: "TR-2026-103",
    description: "Lương part-time",
    amount: 3500000,
    type: "income",
    categoryId: "cat-4",
    date: "2026-04-03",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "tr-4",
    idCode: "TR-2026-104",
    description: "Mua áo mới",
    amount: 290000,
    type: "expense",
    categoryId: "cat-3",
    date: "2026-04-02",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "tr-5",
    idCode: "TR-2026-105",
    description: "Freelance UI",
    amount: 1800000,
    type: "income",
    categoryId: "cat-5",
    date: "2026-04-01",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "tr-6",
    idCode: "TR-2026-106",
    description: "Cafe cuối tuần",
    amount: 45000,
    type: "expense",
    categoryId: "cat-1",
    date: "2026-03-31",
    user: { name: "Hải", avatar: "H" },
  },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");

  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState({ start: "", end: "" });
  const [filterAmountRange, setFilterAmountRange] = useState({ min: 0, max: 0 });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    icon: "📦",
    color: "bg-slate-100 text-slate-600",
  });

  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    type: "expense" as TransactionType,
    categoryId: CATEGORIES[0].id,
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchTerm, typeFilter, filterDateRange, filterAmountRange]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getCategory = (id: string) => {
    return categories.find((c: Category) => c.id === id) || categories[categories.length - 1];
  };

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch =
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.idCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === "all" || t.type === typeFilter;

        const matchesStartDate =
          !filterDateRange.start || new Date(t.date) >= new Date(filterDateRange.start);

        const matchesEndDate =
          !filterDateRange.end || new Date(t.date) <= new Date(filterDateRange.end);

        const matchesMinAmount =
          !filterAmountRange.min || t.amount >= Number(filterAmountRange.min);

        const matchesMaxAmount =
          !filterAmountRange.max || t.amount <= Number(filterAmountRange.max);

        return (
          matchesSearch &&
          matchesType &&
          matchesStartDate &&
          matchesEndDate &&
          matchesMinAmount &&
          matchesMaxAmount
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, typeFilter, filterDateRange, filterAmountRange]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const averageAmount =
    filteredTransactions.length > 0
      ? Math.round(
          filteredTransactions.reduce((sum, item) => sum + item.amount, 0) / filteredTransactions.length
        )
      : 0;

  const handleOpenAddForm = () => {
    setEditingTransaction(null);
    setFormData({
      description: "",
      amount: 0,
      type: "expense",
      categoryId: categories[0]?.id || CATEGORIES[0].id,
      date: new Date().toISOString().split("T")[0],
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      categoryId: transaction.categoryId,
      date: transaction.date,
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa giao dịch này?");
    if (!confirmed) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast("Đã xóa giao dịch", "success");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      showToast("Vui lòng nhập mô tả giao dịch", "error");
      return;
    }

    if (formData.amount <= 0) {
      showToast("Số tiền phải lớn hơn 0", "error");
      return;
    }

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                ...formData,
              }
            : t
        )
      );
      showToast("Đã cập nhật giao dịch", "success");
    } else {
      const newTransaction: Transaction = {
        ...formData,
        id: Math.random().toString(36).slice(2, 11),
        idCode: `TR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        user: { name: "Hải", avatar: "H" },
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      showToast("Đã thêm giao dịch mới", "success");
    }

    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newCategoryData.name.trim()) {
      showToast("Vui lòng nhập tên danh mục", "error");
      return;
    }

    const newCat: Category = {
      id: "cat-" + Math.random().toString(36).slice(2, 7),
      ...newCategoryData,
    };

    setCategories((prev) => [...prev, newCat]);
    setFormData((prev) => ({ ...prev, categoryId: newCat.id }));
    setIsCategoryFormOpen(false);
    setNewCategoryData({
      name: "",
      icon: "📦",
      color: "bg-slate-100 text-slate-600",
    });
    showToast("Đã thêm danh mục mới", "success");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-4 w-72 rounded bg-slate-200" />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-7 w-32 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Giao dịch</h3>
            <p className="mt-2 text-sm text-slate-500">
              Quản lý danh sách giao dịch thu và chi của bạn.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsAdvancedFilterOpen((prev) => !prev)}
              className="rounded-3xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {isAdvancedFilterOpen ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
            </button>

            <button
              onClick={handleOpenAddForm}
              className="rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Thêm giao dịch
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng thu nhập</p>
            <p className="mt-3 text-2xl font-semibold text-emerald-600">
              {formatCurrency(summary.income)}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng chi</p>
            <p className="mt-3 text-2xl font-semibold text-rose-600">
              {formatCurrency(summary.expense)}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Số giao dịch</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {filteredTransactions.length}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Mức trung bình</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {formatCurrency(averageAmount)}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tìm kiếm</label>
            <input
              type="text"
              placeholder="Nhập mô tả hoặc mã giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Loại giao dịch</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TransactionType | "all")}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400"
            >
              <option value="all">Tất cả</option>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setFilterDateRange({ start: "", end: "" });
                setFilterAmountRange({ min: 0, max: 0 });
              }}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Xóa bộ lọc
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setIsCategoryFormOpen((prev) => !prev)}
              className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              {isCategoryFormOpen ? "Ẩn form danh mục" : "Thêm danh mục"}
            </button>
          </div>
        </div>

        {isAdvancedFilterOpen && (
          <div className="mt-5 grid gap-4 rounded-3xl bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Từ ngày</label>
              <input
                type="date"
                value={filterDateRange.start}
                onChange={(e) =>
                  setFilterDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Đến ngày</label>
              <input
                type="date"
                value={filterDateRange.end}
                onChange={(e) =>
                  setFilterDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Số tiền tối thiểu</label>
              <input
                type="number"
                min={0}
                value={filterAmountRange.min || ""}
                onChange={(e) =>
                  setFilterAmountRange((prev) => ({
                    ...prev,
                    min: Number(e.target.value) || 0,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Số tiền tối đa</label>
              <input
                type="number"
                min={0}
                value={filterAmountRange.max || ""}
                onChange={(e) =>
                  setFilterAmountRange((prev) => ({
                    ...prev,
                    max: Number(e.target.value) || 0,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>
          </div>
        )}
      </section>

      {isFormOpen && (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-base font-semibold text-slate-900">
              {editingTransaction ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"}
            </h4>
            <button
              onClick={() => {
                setIsFormOpen(false);
                setEditingTransaction(null);
              }}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Đóng
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Mô tả</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
                placeholder="Nhập mô tả giao dịch"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Số tiền</label>
              <input
                type="number"
                min={0}
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: Number(e.target.value) }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
                placeholder="Nhập số tiền"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Loại</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as TransactionType,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="expense">Chi tiêu</option>
                <option value="income">Thu nhập</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Danh mục</label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ngày</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                {editingTransaction ? "Lưu thay đổi" : "Thêm giao dịch"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingTransaction(null);
                }}
                className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Hủy
              </button>
            </div>
          </form>
        </section>
      )}

      {isCategoryFormOpen && (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h4 className="mb-5 text-base font-semibold text-slate-900">Thêm danh mục mới</h4>

          <form onSubmit={handleAddCategory} className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tên danh mục</label>
              <input
                type="text"
                value={newCategoryData.name}
                onChange={(e) =>
                  setNewCategoryData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
                placeholder="Ví dụ: Học tập"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Icon</label>
              <input
                type="text"
                value={newCategoryData.icon}
                onChange={(e) =>
                  setNewCategoryData((prev) => ({ ...prev, icon: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
                placeholder="Ví dụ: 📚"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Màu</label>
              <select
                value={newCategoryData.color}
                onChange={(e) =>
                  setNewCategoryData((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="bg-slate-100 text-slate-600">Xám</option>
                <option value="bg-indigo-100 text-indigo-600">Indigo</option>
                <option value="bg-emerald-100 text-emerald-600">Xanh lá</option>
                <option value="bg-rose-100 text-rose-600">Hồng đỏ</option>
                <option value="bg-amber-100 text-amber-600">Vàng</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Lưu danh mục
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h4 className="text-base font-semibold text-slate-900">Chi tiết giao dịch</h4>
          <p className="text-sm text-slate-500">
            Trang {currentPage}/{totalPages}
          </p>
        </div>

        <div className="space-y-4">
          {paginatedTransactions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm font-medium text-slate-600">Không có giao dịch phù hợp.</p>
            </div>
          ) : (
            paginatedTransactions.map((item) => {
              const category = getCategory(item.categoryId);

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${category.color}`}
                    >
                      {category.icon}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{item.description}</p>
                      <p className="text-xs text-slate-500">
                        {item.idCode} • {item.date} • {category.name}
                      </p>
                      <p className="text-xs text-slate-400">Người tạo: {item.user.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <p
                      className={`text-sm font-semibold ${
                        item.type === "income" ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.type === "income"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {item.type === "income" ? "Thu nhập" : "Chi tiêu"}
                      </span>

                      <button
                        onClick={() => handleOpenEditForm(item)}
                        className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-300"
                      >
                        Sửa
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 text-slate-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </section>
    </div>
  );
}