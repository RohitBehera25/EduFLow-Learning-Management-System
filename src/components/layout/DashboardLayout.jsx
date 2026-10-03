import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/uiSlice';
import Sidebar from '../common/Sidebar';
import NotificationToast from '../common/NotificationToast';
import { Menu, Bell, Search, ExternalLink } from 'lucide-react';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dashboard Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </span>
              <h2 className="text-sm font-bold text-slate-800 capitalize">
                {role} Console
              </h2>
            </div>
          </div>

          {/* Quick links & Notifications */}
          <div className="flex items-center gap-3">
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-brand-600 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition"
            >
              <span>Explore Courses</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="hidden md:inline-block text-xs font-semibold text-slate-700">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <NotificationToast />
    </div>
  );
};

export default DashboardLayout;
