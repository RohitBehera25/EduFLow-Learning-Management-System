import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, Trophy, Clock, CheckCircle2, PlayCircle, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../components/common/Button';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { enrolledCourses } = useSelector((state) => state.enrollments);
  const { courses } = useSelector((state) => state.courses);

  const activeCourseEnrollment = enrolledCourses[0] || null;
  const completedCoursesCount = enrolledCourses.filter((c) => c.progressPercent === 100).length;

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl shadow-brand-600/10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Learning Track Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-brand-100 text-xs sm:text-sm leading-relaxed">
            You're making great progress! Continue where you left off or explore new full-stack modules.
          </p>
        </div>

        <Link to="/courses">
          <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 font-bold shrink-0">
            Browse New Courses
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {enrolledCourses.length}
          </div>
          <span className="text-[11px] text-slate-400">Lifetime access</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Completed Tracks</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {completedCoursesCount}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">100% finished</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Learning Hours</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            34.5 hrs
          </div>
          <span className="text-[11px] text-purple-600 font-medium">This month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Certificates</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {completedCoursesCount > 0 ? completedCoursesCount : 1}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Verified credentials</span>
        </div>
      </div>

      {/* Continue Learning Active Course */}
      {activeCourseEnrollment && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-brand-600" />
              Continue Learning
            </h2>
            <Link
              to="/student/my-courses"
              className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
            >
              All my courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <img
              src={activeCourseEnrollment.courseDetails?.thumbnail}
              alt="Course"
              className="w-full md:w-48 aspect-video rounded-xl object-cover shadow-sm"
            />
            <div className="flex-1 space-y-3 w-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 px-2 py-0.5 rounded">
                  {activeCourseEnrollment.courseDetails?.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  {activeCourseEnrollment.courseDetails?.title}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Overall Progress</span>
                  <span>{activeCourseEnrollment.progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                    style={{ width: `${activeCourseEnrollment.progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">
                  {activeCourseEnrollment.completedLectures?.length || 0} lectures completed
                </span>
                <Link to={`/learn/${activeCourseEnrollment.courseId}`}>
                  <Button size="sm" icon={PlayCircle}>
                    Resume Classroom
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Next Courses */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(1, 4).map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 overflow-hidden space-y-1">
                <span className="text-[10px] font-bold text-brand-600 uppercase">
                  {course.level}
                </span>
                <h4 className="font-bold text-slate-900 text-xs truncate">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-500">{course.instructor?.name}</p>
                <Link
                  to={`/courses/${course._id}`}
                  className="inline-block text-xs font-bold text-brand-600 hover:underline pt-1"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
