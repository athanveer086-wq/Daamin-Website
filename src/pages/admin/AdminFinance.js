import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, DollarSign, TrendingUp, TrendingDown, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { financeAPI } from '../../utils/api';

const AdminFinance = () => {
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  
  const [expenseForm, setExpenseForm] = useState({
    category: 'Raw Materials',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [investmentForm, setInvestmentForm] = useState({
    partner_name: 'Dr. Mashuk',
    amount: '',
    percentage: 40,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    loadFinanceData();
  }, []);

  const loadFinanceData = async () => {
    try {
      const [summaryRes, expensesRes, investmentsRes] = await Promise.all([
        financeAPI.getSummary(),
        financeAPI.getExpenses(),
        financeAPI.getInvestments()
      ]);
      setSummary(summaryRes.data);
      setExpenses(expensesRes.data);
      setInvestments(investmentsRes.data);
    } catch (error) {
      console.error('Error loading finance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await financeAPI.createExpense({...expenseForm, amount: parseFloat(expenseForm.amount)});
      setShowExpenseForm(false);
      setExpenseForm({ category: 'Raw Materials', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      loadFinanceData();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    }
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();
    try {
      await financeAPI.createInvestment({
        ...investmentForm,
        amount: parseFloat(investmentForm.amount),
        percentage: parseFloat(investmentForm.percentage)
      });
      setShowInvestmentForm(false);
      setInvestmentForm({ partner_name: 'Dr. Mashuk', amount: '', percentage: 40, date: new Date().toISOString().split('T')[0], notes: '' });
      loadFinanceData();
    } catch (error) {
      console.error('Error adding investment:', error);
      alert('Error adding investment');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await financeAPI.deleteExpense(id);
      loadFinanceData();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const expenseCategories = [
    'Raw Materials', 'Packaging', 'Shipping', 'Marketing', 
    'Utilities', 'Rent', 'Salaries', 'Miscellaneous'
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://customer-assets.emergentagent.com/job_d1961303-b363-4517-8113-f162e002c467/artifacts/0nl9slqz_image.png" alt="Logo" className="h-12 w-auto object-contain" style={{ maxWidth: '180px' }} />
            <div>
              <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.full_name}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto">
            <Link to="/admin" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Dashboard</Link>
            <Link to="/admin/bookings" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Bookings</Link>
            <Link to="/admin/products" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Products</Link>
            <Link to="/admin/orders" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Orders</Link>
            <Link to="/admin/finance" className="py-4 border-b-2 border-primary text-primary font-medium whitespace-nowrap">Finance</Link>
            <Link to="/admin/blog" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Blog</Link>
            <Link to="/admin/settings" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">Settings</Link>
            <Link to="/" className="py-4 text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">View Website</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Finance Dashboard</h2>

        {loading ? (
          <div className="text-center py-16"><p>Loading financial data...</p></div>
        ) : (
          <>
            {/* Financial Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
                  <TrendingUp className="text-green-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-primary">₹{summary?.total_revenue?.toLocaleString() || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">From Orders (Auto)</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Total Expenses</h3>
                  <TrendingDown className="text-red-600" size={20} />
                </div>
                <p className="text-3xl font-bold text-red-600">₹{summary?.total_expenses?.toLocaleString() || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Manual Entries</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Net Profit</h3>
                  <DollarSign className={summary?.net_profit >= 0 ? "text-green-600" : "text-red-600"} size={20} />
                </div>
                <p className={`text-3xl font-bold ${summary?.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{summary?.net_profit?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Revenue - Expenses</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Total Investment</h3>
                  <DollarSign className="text-primary" size={20} />
                </div>
                <p className="text-3xl font-bold text-primary">₹{summary?.total_investment?.toLocaleString() || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Capital Invested</p>
              </div>
            </div>

            {/* Partner Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Partner Profit Distribution</h3>
              <p className="text-sm text-muted-foreground mb-4">Net Profit: ₹{summary?.net_profit?.toLocaleString() || 0}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {summary?.partner_distribution && Object.entries(summary.partner_distribution).map(([name, data]) => (
                  <div key={name} className="bg-secondary/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <p className="text-2xl font-bold text-primary">₹{data.amount?.toLocaleString() || 0}</p>
                    <p className="text-xs text-muted-foreground">({data.percentage}% share)</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Expenses Section */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary">Expenses</h3>
                  <button
                    onClick={() => setShowExpenseForm(!showExpenseForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90"
                  >
                    <Plus size={16} /> Add Expense
                  </button>
                </div>

                {showExpenseForm && (
                  <form onSubmit={handleAddExpense} className="mb-4 p-4 bg-secondary/20 rounded-lg space-y-3">
                    <select value={expenseForm.category} onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm">
                      {expenseCategories.map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                    <input type="number" placeholder="Amount" value={expenseForm.amount} onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})} required className="w-full px-3 py-2 border rounded-md text-sm" />
                    <input type="text" placeholder="Description" value={expenseForm.description} onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})} required className="w-full px-3 py-2 border rounded-md text-sm" />
                    <input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})} required className="w-full px-3 py-2 border rounded-md text-sm" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-primary text-white px-4 py-2 rounded-full text-sm">Add</button>
                      <button type="button" onClick={() => setShowExpenseForm(false)} className="flex-1 border px-4 py-2 rounded-full text-sm">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {expenses.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No expenses recorded yet</p>
                  ) : (
                    expenses.map(expense => (
                      <div key={expense.id} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{expense.description}</p>
                          <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-red-600">₹{expense.amount?.toLocaleString()}</span>
                          <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Investments Section */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary">Investments</h3>
                  <button
                    onClick={() => setShowInvestmentForm(!showInvestmentForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90"
                  >
                    <Plus size={16} /> Add Investment
                  </button>
                </div>

                {showInvestmentForm && (
                  <form onSubmit={handleAddInvestment} className="mb-4 p-4 bg-secondary/20 rounded-lg space-y-3">
                    <select value={investmentForm.partner_name} onChange={(e) => {
                      const percentages = {'Dr. Mashuk': 40, 'Dr. Ayeesha': 40, 'Thanveer': 20};
                      setInvestmentForm({...investmentForm, partner_name: e.target.value, percentage: percentages[e.target.value]});
                    }} className="w-full px-3 py-2 border rounded-md text-sm">
                      <option>Dr. Mashuk</option>
                      <option>Dr. Ayeesha</option>
                      <option>Thanveer</option>
                    </select>
                    <input type="number" placeholder="Amount" value={investmentForm.amount} onChange={(e) => setInvestmentForm({...investmentForm, amount: e.target.value})} required className="w-full px-3 py-2 border rounded-md text-sm" />
                    <input type="number" placeholder="Percentage" value={investmentForm.percentage} readOnly className="w-full px-3 py-2 border rounded-md text-sm bg-gray-100" />
                    <input type="date" value={investmentForm.date} onChange={(e) => setInvestmentForm({...investmentForm, date: e.target.value})} required className="w-full px-3 py-2 border rounded-md text-sm" />
                    <input type="text" placeholder="Notes (optional)" value={investmentForm.notes} onChange={(e) => setInvestmentForm({...investmentForm, notes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 bg-primary text-white px-4 py-2 rounded-full text-sm">Add</button>
                      <button type="button" onClick={() => setShowInvestmentForm(false)} className="flex-1 border px-4 py-2 rounded-full text-sm">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {investments.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">No investments recorded yet</p>
                  ) : (
                    investments.map(investment => (
                      <div key={investment.id} className="p-3 bg-secondary/10 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{investment.partner_name}</p>
                          <span className="font-bold text-primary">₹{investment.amount?.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{investment.percentage}% • {investment.date}</p>
                        {investment.notes && <p className="text-xs text-muted-foreground mt-1">{investment.notes}</p>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminFinance;
