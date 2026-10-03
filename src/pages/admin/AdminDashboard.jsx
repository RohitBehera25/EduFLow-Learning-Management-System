import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';
import { Users, BookOpen, ShieldCheck, Activity, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button';

const AdminDashboard = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Super Admin Console
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          System telemetry, user access control, and course moderation center.
        </p>
      </div>

      {/* Platform Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform Users</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            18,450
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">+140 registered today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {courses.length}
          </div>
          <span className="text-[11px] text-slate-400">All reviewed & approved</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Gross Platform GMV</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {formatCurrency(2480000)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">Processed via JWT & Razorpay</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">System API Health</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            99.98%
          </div>
          <span className="text-[11px] text-slate-400">Cloudinary & Nodemailer Online</span>
        </div>
      </div>

      {/* Moderation Alert Card */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm">2 New Instructor Verifications Pending</h4>
            <p className="text-xs text-amber-700">Review submitted curriculum and Nodemailer identity confirmation.</p>
          </div>
        </div>
        <Link to="/admin/users">
          <Button variant="outline" size="sm" className="bg-white border-amber-300 text-amber-900">
            Review Instructors
          </Button>
        </Link>
      </div>

      {/* Quick Navigation to Admin sub-pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">User Directory & RBAC</h3>
            <Link to="/admin/users" className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage granular roles (student, instructor, admin), revoke access tokens, or ban fraudulent accounts.
          </p>
          <Link to="/admin/users" className="block pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Open User Access Manager
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Course Quality Moderation</h3>
            <Link to="/admin/courses" className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verify lecture video streaming bandwidth, Cloudinary CDN resolution, and curriculum guidelines.
          </p>
          <Link to="/admin/courses" className="block pt-2">
            <Button variant="outline" size="sm" className="w-full">
              Open Course Approvals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
