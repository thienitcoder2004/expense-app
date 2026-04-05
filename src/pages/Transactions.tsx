const sampleTransactions = [
  { date: "24/10/2023", merchant: "Apple Store", category: "Electronics", amount: "- $1,299.00", status: "Expense" },
  { date: "23/10/2023", merchant: "Delta Airlines", category: "Travel", amount: "- $642.50", status: "Expense" },
  { date: "22/10/2023", merchant: "Stripe Payout", category: "Income", amount: "+ $4,200.00", status: "Income" },
  { date: "21/10/2023", merchant: "Blue Bottle Coffee", category: "Dining", amount: "- $12.40", status: "Expense" },
];

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
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Giao dịch</h3>
            <p className="mt-2 text-sm text-slate-500">Danh sách giao dịch gần đây của bạn.</p>
          </div>
          <button className="self-start rounded-3xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 md:self-auto">
            Thêm giao dịch
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng thu nhập</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$18,650</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Tổng chi</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$6,478</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Số giao dịch</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">24</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Mức trung bình</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">$275</p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm">
        <h4 className="text-base font-semibold text-slate-900">Chi tiết giao dịch</h4>
        <div className="mt-5 space-y-4">
          {sampleTransactions.map((item) => (
            <div key={item.merchant} className="flex flex-col gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{item.merchant}</p>
                <p className="text-xs text-slate-500">{item.date} • {item.category}</p>
              </div>
              <div className="flex flex-col items-start gap-2 text-right md:items-end">
                <p className={`text-sm font-semibold ${item.status === "Income" ? "text-emerald-600" : "text-slate-900"}`}>{item.amount}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Income" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}