import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, quickLoginAs } from '../../redux/slices/authSlice';
import { setSearchQuery } from '../../redux/slices/courseSlice';
import { addToast } from '../../redux/slices/uiSlice';
import Button from './Button';
import {
  GraduationCap,
  Search,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, role } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.courses);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery || '');

  const profileRef = useRef(null);
  const demoRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (demoRef.current && !demoRef.current.contains(e.target)) {
        setDemoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    if (location.pathname !== '/courses') {
      navigate('/courses');
    }
  };

  const handleQuickLogin = (targetRole) => {
    dispatch(quickLoginAs(targetRole));
    setDemoDropdownOpen(false);
    dispatch(
      addToast({
        type: 'success',
        message: `Switched session to ${targetRole.toUpperCase()} mode!`,
      })
    );
    navigate(`/${targetRole}/dashboard`);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileDropdownOpen(false);
    dispatch(addToast({ type: 'info', message: 'Logged out successfully.' }));
    navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'instructor') return '/instructor/dashboard';
    return '/student/dashboard';
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-brand-600 transition">
              Edu<span className="text-brand-600">Flow</span>
            </span>
            <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
              LMS
            </span>
          </div>
        </Link>

        {/* Global Search Bar (hidden on small mobile) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md items-center relative"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search courses, skills, instructors..."
            className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
          />
        </form>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            to="/courses"
            className="hover:text-brand-600 transition"
          >
            Explore Catalog
          </Link>
          {role !== 'instructor' && role !== 'admin' && (
            <Link
              to="/register?role=instructor"
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Teach on EduFlow
            </Link>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher (Crucial for Reviewers/Demonstration) */}
          <div className="relative" ref={demoRef}>
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg transition"
              title="Fast switch between student, instructor and admin roles"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Role Switcher</span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {demoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Test Fast Roles (RBAC)
                </div>
                <button
                  onClick={() => handleQuickLogin('student')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <span className="font-medium">Student Persona</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Student</span>
                </button>
                <button
                  onClick={() => handleQuickLogin('instructor')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <span className="font-medium">Instructor Persona</span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Instructor</span>
                </button>
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  <span className="font-medium">Admin Persona</span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* If Authenticated: Show Dashboard Button & Avatar */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link to={getDashboardLink()} className="hidden sm:flex">
                <Button variant="outline" size="sm" icon={LayoutDashboard}>
                  Dashboard
                </Button>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500/30 transition"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-slide-up">
                    <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                      <p className="font-bold text-slate-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                        Role: {role}
                      </span>
                    </div>

                    <div className="space-y-0.5 text-xs text-slate-700">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        Role Dashboard
                      </Link>

                      {role === 'student' && (
                        <Link
                          to="/student/my-courses"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
                        >
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          My Enrolled Courses
                        </Link>
                      )}

                      {role === 'instructor' && (
                        <Link
                          to="/instructor/create-course"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
                        >
                          <PlusCircle className="w-4 h-4 text-slate-500" />
                          Create New Course
                        </Link>
                      )}

                      {role === 'admin' && (
                        <Link
                          to="/admin/users"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-slate-500" />
                          User & Permissions Management
                        </Link>
                      )}

                      <Link
                        to="/student/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 font-medium transition"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        Account Profile
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unauthenticated Auth Buttons */
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search courses..."
              className="w-full bg-slate-100 text-sm pl-9 pr-3 py-2 rounded-xl outline-none"
            />
          </form>

          <div className="space-y-1 text-sm font-medium">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Explore Catalog
            </Link>
            <Link
              to="/register?role=instructor"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-indigo-600"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
