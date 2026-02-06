import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Users, Package, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Users },
    { to: '/admin/users', label: 'Manage Users', icon: Users },
    { to: '/admin/products', label: 'Manage Products', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#05060B] text-[#F4F6FF]">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#00F0FF] text-[#05060B] rounded-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-40 inset-y-0 left-0 w-64 bg-[#0B0E1A] border-r border-[rgba(0,240,255,0.2)] transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-[rgba(0,240,255,0.2)]">
          <h1 className="text-2xl font-bold text-[#00F0FF]">Admin Panel</h1>
          <p className="text-[#A7B0C8] text-sm">AGA Tech Studios</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#11152B] transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#00F0FF]" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-[rgba(0,240,255,0.2)]">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-[#11152B] transition-colors text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="p-4 border-b border-[rgba(0,240,255,0.2)] lg:hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <button
              className="p-2 text-[#A7B0C8] hover:text-[#00F0FF]"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;