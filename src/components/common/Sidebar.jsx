import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { toggleSidebar } from '../../redux/slices/uiSlice';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  BarChart3,
  Users,
  CheckSquare,
  Compass,
  UserCheck,
  LogOut,
  X,
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Student Links
  const studentLinks = [
    { name: 'My Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Enrolled Courses', path: '/student/my-courses', icon: BookOpen },
    { name: 'Explore Catalog', path: '/courses', icon: Compass },
    { name: 'Account Profile', path: '/student/profile', icon: UserCheck },
  ];

  // Instructor Links
  const instructorLinks = [
    { name: 'Instructor Dashboard', path: '/instructor/dashboard', icon: LayoutDashboard },
    { name: 'Manage Courses', path: '/instructor/courses', icon: BookOpen },
    { name: 'Create Course', path: '/instructor/create-course', icon: PlusCircle },
    { name: 'Revenue & Analytics', path: '/instructor/analytics', icon: BarChart3 },
    { name: 'Public Catalog', path: '/courses', icon: Compass },
  ];

  // Admin Links
  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Course Approvals', path: '/admin/courses', icon: CheckSquare },
    { name: 'Public Catalog', path: '/courses', icon: Compass },
  ];

  const links =
    role === 'admin'
      ? adminLinks
      : role === 'instructor'
      ? instructorLinks
      : studentLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto border-r border-slate-800`}
      >
        {/* Header / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-black text-white text-lg tracking-tight">
              Edu<span className="text-brand-400">Flow</span>
            </span>
          </NavLink>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Role Tag */}
        <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-500/50"
            />
            <div className="overflow-hidden">
              <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                {role} Portal
              </span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => dispatch(toggleSidebar())}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Sign out */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
