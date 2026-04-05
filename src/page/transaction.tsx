import { useState, useMemo, useEffect } from "react";

// ==================== KIỂU DỮ LIỆU ====================
type TransactionType = "income" | "expense";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Transaction {
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
}

// Danh mục có sẵn
const CATEGORIES: Category[] = [
  { id: "cat1", name: "Ăn uống", icon: "🍱", color: "bg-orange-100 text-orange-600" },
  { id: "cat2", name: "Di chuyển", icon: "🚗", color: "bg-blue-100 text-blue-600" },
  { id: "cat3", name: "Mua sắm", icon: "🛍️", color: "bg-pink-100 text-pink-600" },
  { id: "cat4", name: "Giải trí", icon: "🎬", color: "bg-purple-100 text-purple-600" },
  { id: "cat5", name: "Lương", icon: "💰", color: "bg-green-100 text-green-600" },
  { id: "cat6", name: "Khác", icon: "📦", color: "bg-slate-100 text-slate-600" },
];

// Dữ liệu mẫu ban đầu
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    idCode: "TR-2024-001",
    description: "Ăn trưa với đồng nghiệp",
    amount: 50000,
    type: "expense",
    categoryId: "cat1",
    date: "2024-03-20",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "2",
    idCode: "TR-2024-002",
    description: "Đổ xăng xe máy",
    amount: 100000,
    type: "expense",
    categoryId: "cat2",
    date: "2024-03-19",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "3",
    idCode: "TR-2024-003",
    description: "Lương tháng 3",
    amount: 15000000,
    type: "income",
    categoryId: "cat5",
    date: "2024-03-15",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "4",
    idCode: "TR-2024-004",
    description: "Mua sắm quần áo",
    amount: 300000,
    type: "expense",
    categoryId: "cat3",
    date: "2024-03-18",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "5",
    idCode: "TR-2024-005",
    description: "Xem phim rạp",
    amount: 120000,
    type: "expense",
    categoryId: "cat4",
    date: "2024-03-17",
    user: { name: "Hải", avatar: "H" },
  },
  {
    id: "6",
    idCode: "TR-2024-006",
    description: "Làm thêm freelance",
    amount: 2000000,
    type: "income",
    categoryId: "cat6",
    date: "2024-03-16",
    user: { name: "Hải", avatar: "H" },
  },
];

// ==================== COMPONENT CHÍNH ====================
export default function Transactions() {
  // State quản lý dữ liệu
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");

  // State Bộ lọc nâng cao
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState({ start: "", end: "" });
  const [filterAmountRange, setFilterAmountRange] = useState({ min: 0, max: 0 });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State cho form danh mục mới
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    icon: "📦",
    color: "bg-slate-100 text-slate-600",
  });

  // State cho form giao dịch
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    type: "expense" as TransactionType,
    categoryId: CATEGORIES[0].id,
    date: new Date().toISOString().split("T")[0],
  });

  // Mô phỏng loading ban đầu
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset trang khi bộ lọc thay đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  // Helper: hiển thị toast
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Helper: định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  // Lấy thông tin danh mục theo id
  const getCategory = (id: string) => categories.find((c) => c.id === id) || categories[categories.length - 1];

  // Tính tổng thu, chi, số dư
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

  // Lọc giao dịch theo nhiều điều kiện
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || t.type === typeFilter;
        
        // Lọc theo ngày
        const matchesStartDate = !filterDateRange.start || new Date(t.date) >= new Date(filterDateRange.start);
        const matchesEndDate = !filterDateRange.end || new Date(t.date) <= new Date(filterDateRange.end);
        
        // Lọc theo số tiền
        const matchesMinAmount = !filterAmountRange.min || t.amount >= filterAmountRange.min;
        const matchesMaxAmount = !filterAmountRange.max || t.amount <= filterAmountRange.max;

        return matchesSearch && matchesType && matchesStartDate && matchesEndDate && matchesMinAmount && matchesMaxAmount;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, typeFilter, filterDateRange, filterAmountRange]);

  // Phân trang
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Mở form thêm mới
  const handleOpenAddForm = () => {
    setEditingTransaction(null);
    setFormData({
      description: "",
      amount: 0,
      type: "expense",
      categoryId: CATEGORIES[0].id,
      date: new Date().toISOString().split("T")[0],
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mở form chỉnh sửa
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

  // Xóa giao dịch
  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
      showToast("Đã xóa giao dịch", "success");
    }
  };

  // Lưu (thêm mới hoặc cập nhật)
  const handleSubmit = (e: React.FormEvent) => {
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
      // Cập nhật
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id
            ? { ...t, ...formData }
            : t
        )
      );
      showToast("Đã cập nhật giao dịch", "success");
    } else {
      // Thêm mới
      const newTransaction: Transaction = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        idCode: `TR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        user: { name: "Hải", avatar: "H" },
      };
      setTransactions([newTransaction, ...transactions]);
      showToast("Đã thêm giao dịch mới", "success");
    }
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  // Thêm danh mục mới
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryData.name.trim()) return;
    const newCat: Category = {
      id: "cat-" + Math.random().toString(36).substr(2, 5),
      ...newCategoryData,
    };
    setCategories([...categories, newCat]);
    setFormData({ ...formData, categoryId: newCat.id });
    setIsCategoryFormOpen(false);
    setNewCategoryData({ name: "", icon: "📦", color: "bg-slate-100 text-slate-600" });
    showToast("Đã thêm danh mục mới", "success");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ========== N1DCK-23: BỐ CỤC & THẺ TỔNG QUAN ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500">Tổng thu nhập</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(summary.income)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500">Tổng chi tiêu</p>
            <p className="text-2xl font-bold text-rose-500 mt-1">{formatCurrency(summary.expense)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500">Số dư</p>
            <p className={`text-2xl font-bold mt-1 ${summary.income - summary.expense >= 0 ? "text-indigo-600" : "text-rose-600"}`}>
              {formatCurrency(summary.income - summary.expense)}
            </p>
          </div>
        </div>

        {/* Header + Nút thêm */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Quản lý giao dịch</h1>
          {!isFormOpen && (
            <button
              onClick={handleOpenAddForm}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span> Thêm giao dịch
            </button>
          )}
        </div>

        {/* ========== N1DCK-25: FORM THÊM / SỬA (INLINE) ========== */}
        {isFormOpen && (
          <div className="bg-white rounded-2xl shadow-md border-2 border-indigo-100 p-5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                {editingTransaction ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Mô tả</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  placeholder="Ví dụ: Mua sắm, lương, ..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Số tiền (₫)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Ngày</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Loại</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                >
                  <option value="expense">💸 Chi tiêu</option>
                  <option value="income">💰 Thu nhập</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Danh mục</label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsCategoryFormOpen(true)}
                    className="bg-slate-100 text-slate-600 px-3 rounded-xl hover:bg-slate-200 transition text-xl"
                    title="Thêm danh mục mới"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition shadow"
                >
                  {editingTransaction ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========== N1DCK-26: BỘ LỌC & TÌM KIẾM ========== */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm theo mô tả..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["all", "expense", "income"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    typeFilter === type
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type === "all" ? "Tất cả" : type === "expense" ? "Chi tiêu" : "Thu nhập"}
                </button>
              ))}
              <button
                onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                className={`p-2 rounded-xl border transition ${
                  isAdvancedFilterOpen ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-slate-200 text-slate-400"
                }`}
                title="Bộ lọc nâng cao"
              >
                ⚙️
              </button>
            </div>
          </div>

          {/* Form Bộ lọc nâng cao */}
          {isAdvancedFilterOpen && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 animate-in fade-in zoom-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Từ ngày</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    value={filterDateRange.start}
                    onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Đến ngày</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    value={filterDateRange.end}
                    onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tiền tối thiểu</label>
                  <input
                    type="number"
                    placeholder="0 ₫"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    value={filterAmountRange.min || ""}
                    onChange={(e) => setFilterAmountRange({ ...filterAmountRange, min: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tiền tối đa</label>
                  <input
                    type="number"
                    placeholder="Không giới hạn"
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    value={filterAmountRange.max || ""}
                    onChange={(e) => setFilterAmountRange({ ...filterAmountRange, max: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setFilterDateRange({ start: "", end: "" });
                    setFilterAmountRange({ min: 0, max: 0 });
                  }}
                  className="text-sm font-semibold text-rose-500 hover:underline"
                >
                  Xóa bộ lọc nâng cao
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========== N1DCK-24: DANH SÁCH GIAO DỊCH ========== */}
        {/* ========== N1DCK-27: TRẠNG THÁI LOADING & EMPTY ========== */}
        <div className="space-y-3">
          {isLoading ? (
            // Skeleton loading
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                  </div>
                  <div className="h-6 w-24 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))
          ) : filteredTransactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <span className="text-6xl opacity-30">📭</span>
              <p className="text-xl font-semibold text-slate-700 mt-4">Không có giao dịch nào</p>
              <p className="text-slate-500 mt-1">Hãy thêm giao dịch đầu tiên hoặc thay đổi bộ lọc</p>
            </div>
          ) : (
            <>
              {paginatedTransactions.map((transaction) => {
                const category = getCategory(transaction.categoryId);
                return (
                  <div
                    key={transaction.id}
                    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-100 relative overflow-hidden"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${transaction.type === "expense" ? "bg-rose-400" : "bg-emerald-400"}`}></div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${category.color}`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{transaction.description}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full">📄 {transaction.idCode}</span>
                            <span>📅 {new Date(transaction.date).toLocaleDateString("vi-VN")}</span>
                            <span>{category.icon} {category.name}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className={`text-lg font-black ${transaction.type === "expense" ? "text-rose-500" : "text-emerald-600"}`}>
                          {transaction.type === "expense" ? "-" : "+"} {formatCurrency(transaction.amount)}
                        </span>
                        <div className="flex items-center gap-2 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition">
                          <button
                            onClick={() => handleOpenEditForm(transaction)}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-indigo-600"
                            title="Sửa"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rose-600"
                            title="Xóa"
                          >
                            🗑️
                          </button>
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">
                            {transaction.user.avatar}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                  >
                    ← Trước
                  </button>
                  <span className="text-sm text-slate-600">
                    Trang {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ========== TOAST NOTIFICATION ========== */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className={`flex items-center gap-3 rounded-2xl px-5 py-3 shadow-xl text-white font-semibold ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            <span>{toast.type === "success" ? "✅" : "❌"}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ========== FORM THÊM NHANH DANH MỤC ========== */}
      {isCategoryFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm animate-in zoom-in fade-in duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Thêm danh mục mới</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tên danh mục</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ví dụ: Du lịch, Sức khỏe..."
                  value={newCategoryData.name}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 text-center text-2xl"
                  value={newCategoryData.icon}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, icon: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryFormOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-lg"
                >
                  Thêm ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}