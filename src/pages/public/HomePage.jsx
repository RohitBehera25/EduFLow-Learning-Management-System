import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/common/CourseCard';
import Button from '../../components/common/Button';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  PlayCircle,
  GraduationCap,
  Users,
  Award
} from 'lucide-react';

const HomePage = () => {
  const { courses } = useSelector((state) => state.courses);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/80 px-4 py-1.5 rounded-full text-xs font-semibold text-brand-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Next-Gen Fullstack Learning Management Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Master Modern Engineering With{' '}
              <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                World-Class Mentors
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Accelerate your engineering career with industry-tailored MERN projects, interactive lecture streaming, verified certification, and role-based learning tracks.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/courses">
                <Button size="lg" icon={ArrowRight} className="shadow-lg shadow-brand-600/20">
                  Explore All Courses
                </Button>
              </Link>
              <Link to="/register?role=instructor">
                <Button variant="outline" size="lg" icon={GraduationCap}>
                  Become an Instructor
                </Button>
              </Link>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto text-left">
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-soft">
                <div className="text-2xl font-black text-slate-900">50,000+</div>
                <div className="text-xs text-slate-500 font-medium">Active Students</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-soft">
                <div className="text-2xl font-black text-slate-900">120+</div>
                <div className="text-xs text-slate-500 font-medium">Hands-On Projects</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-soft">
                <div className="text-2xl font-black text-slate-900">4.9 / 5.0</div>
                <div className="text-xs text-slate-500 font-medium">Student Satisfaction</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-soft">
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-medium">Career Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Top Rated Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Industry Courses
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Comprehensive roadmaps built with production architecture standards.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              View All Catalog
            </Button>
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>

      {/* Why Choose EduFlow LMS Feature Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Production Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              Engineered For Scalable Learning
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Everything built with MERN stack best practices: JWT security, Cloudinary streaming, and granular RBAC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Interactive Video Player</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seamless lecture playlist, video player resume state, lecture completion checkmarks, and instant progress tracking.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Multi-Role RBAC</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Dedicated dashboards for Students, Instructors, and System Administrators with protected routing guards.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Redux Toolkit Synchronized</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Real-time global state management across courses, enrollments, user authentication, and persistent storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-800 rounded-3xl p-8 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Earn & Teach
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              Become an Instructor Today
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed">
              Create and publish your own curriculum. Reach thousands of eager developers, track student engagement, and earn continuous royalties.
            </p>
          </div>
          <Link to="/register?role=instructor">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold shrink-0"
            >
              Start Teaching Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
