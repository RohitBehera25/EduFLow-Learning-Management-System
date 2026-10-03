import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/formatters';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Clock } from 'lucide-react';

const InstructorAnalyticsPage = () => {
  const { courses } = useSelector((state) => state.courses);

  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const monthlyEnrollments = [420, 680, 910, 1250, 1840, 2400];
  const maxEnroll = Math.max(...monthlyEnrollments);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Performance & Analytics
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Detailed metrics on student engagement, retention, and monthly revenue flow.
        </p>
      </div>

      {/* Monthly Enrollments Chart Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Student Growth
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Monthly Enrollments Trajectory
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4" /> +32% this quarter
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-100">
          {months.map((month, idx) => {
            const count = monthlyEnrollments[idx];
            const heightPercent = Math.round((count / maxEnroll) * 100);

            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[11px] font-bold text-slate-400 group-hover:text-brand-600 transition">
                  {count}
                </span>
                <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden flex items-end h-40">
                  <div
                    className="w-full bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-xl group-hover:brightness-110 transition-all duration-500"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course-level Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Top Revenue Generators</h3>
          <div className="space-y-3">
            {courses.slice(0, 3).map((c) => (
              <div key={c._id} className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-xl">
                <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]">
                  {c.title}
                </span>
                <span className="font-bold text-slate-900">
                  {formatCurrency((c.studentsEnrolled || 100) * (c.price || 999) * 0.7)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Student Completion & Satisfaction</h3>
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Lecture Completion Rate</span>
                <span>78%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>Quiz & Assignment Pass Rate</span>
                <span>91%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-600 mb-1">
                <span>5-Star Review Ratio</span>
                <span>86%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '86%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalyticsPage;
