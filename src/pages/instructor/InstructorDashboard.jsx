import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import {
  DollarSign,
  Users,
  BookOpen,
  Star,
  PlusCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  // Instructor's courses
  const myCourses = courses.slice(0, 3);
  const totalStudents = myCourses.reduce((acc, c) => acc + (c.studentsEnrolled || 0), 0);
  const estimatedRevenue = myCourses.reduce((acc, c) => acc + ((c.studentsEnrolled || 0) * (c.price || 0) * 0.7), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & CTA Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Instructor Console
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Monitor course performance, analyze student enrollments, and upload new lectures.
          </p>
        </div>
        <Link to="/instructor/create-course">
          <Button icon={PlusCircle} className="shadow-lg shadow-brand-600/20">
            Create New Course
          </Button>
        </Link>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Net Lifetime Earnings</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {formatCurrency(estimatedRevenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {totalStudents.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Across all active tracks</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {myCourses.length}
          </div>
          <span className="text-[11px] text-purple-600 font-medium">Published & Live</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Instructor Rating</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            4.9 / 5.0
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Top 1% Mentor</span>
        </div>
      </div>

      {/* Courses Overview Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Your Active Published Courses</h2>
          <Link
            to="/instructor/courses"
            className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
          >
            Manage courses <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Course</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Students</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myCourses.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 flex items-center gap-3">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-12 h-8 rounded-lg object-cover"
                    />
                    <span className="font-bold text-slate-800 line-clamp-1 max-w-xs">
                      {c.title}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">{formatCurrency(c.price)}</td>
                  <td className="py-3.5 text-slate-600">{c.studentsEnrolled?.toLocaleString()}</td>
                  <td className="py-3.5 font-bold text-amber-500">★ {c.rating.toFixed(1)}</td>
                  <td className="py-3.5 text-right">
                    <Link
                      to={`/courses/${c._id}`}
                      className="text-brand-600 font-semibold hover:underline"
                    >
                      Preview
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
