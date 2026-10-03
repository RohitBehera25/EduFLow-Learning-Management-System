import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { enrollCourse } from '../../redux/slices/enrollmentSlice';
import { addToast } from '../../redux/slices/uiSlice';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Globe,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Lock,
  ArrowRight,
  Share2
} from 'lucide-react';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);
  const { enrolledCourses } = useSelector((state) => state.enrollments);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Find course
  const course = courses.find((c) => c._id === id || c.slug === id) || courses[0];
  const isEnrolled = enrolledCourses.some((item) => item.courseId === course?._id);

  // Open/close curriculum section accordion states
  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      dispatch(addToast({ type: 'info', message: 'Please login to enroll in this course.' }));
      navigate('/login', { state: { from: `/courses/${course._id}` } });
      return;
    }

    dispatch(enrollCourse(course));
    dispatch(addToast({ type: 'success', message: `Enrolled successfully in ${course.title}!` }));
    navigate(`/learn/${course._id}`);
  };

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <Link to="/courses" className="text-brand-600 underline mt-4 block">Back to courses</Link>
      </div>
    );
  }

  const totalLectures = course.curriculum?.reduce(
    (acc, sec) => acc + (sec.lectures?.length || 0),
    0
  ) || 12;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Banner Header */}
      <div className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Cols: Main Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Level: {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {course.subtitle}
              </p>

              {/* Rating and Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({course.reviewsCount} ratings)
                  </span>
                </div>
                <span>•</span>
                <span>{course.studentsEnrolled?.toLocaleString()} students enrolled</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> {course.language}
                </span>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor?.avatar}
                  alt={course.instructor?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-brand-400"
                />
                <div className="text-xs">
                  <span className="text-slate-400">Created by</span>
                  <p className="font-bold text-white text-sm">{course.instructor?.name}</p>
                </div>
              </div>
            </div>

            {/* Right Column on Desktop: Sticky Purchase Preview Box */}
            <div className="lg:col-span-1">
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 sticky top-24 space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-inner bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                      <PlayCircle className="w-8 h-8 fill-brand-600 text-white" />
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    {formatCurrency(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatCurrency(course.originalPrice)}
                    </span>
                  )}
                  {course.discountPercent && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      {course.discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Action button */}
                {isEnrolled ? (
                  <Link to={`/learn/${course._id}`} className="block">
                    <Button variant="success" size="lg" className="w-full shadow-lg" icon={PlayCircle}>
                      Go to Classroom
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleEnroll}
                    className="w-full shadow-lg shadow-brand-600/20"
                    icon={ArrowRight}
                  >
                    Enroll Now (Instant Access)
                  </Button>
                )}

                <p className="text-center text-xs text-slate-500 font-medium">
                  30-Day Money-Back Guarantee • Lifetime Access
                </p>

                {/* Course Includes Perks */}
                <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-700">
                  <p className="font-bold text-slate-900">This course includes:</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>48+ hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{totalLectures} downloadable modules & code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>Full lifetime access on mobile and desktop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* What you will learn */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900">What you will learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {course.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.curriculum?.length || 0} sections • {totalLectures} lectures
                  </p>
                </div>
              </div>

              {/* Sections list */}
              <div className="space-y-3 pt-2">
                {course.curriculum?.map((section, secIdx) => {
                  const isOpen = !!openSections[secIdx];
                  return (
                    <div
                      key={section.sectionId || secIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(secIdx)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition text-left"
                      >
                        <span className="font-bold text-slate-800 text-sm">
                          {section.title}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{section.lectures?.length} lectures</span>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {section.lectures?.map((lecture) => (
                            <div
                              key={lecture.lectureId}
                              className="p-3.5 flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:bg-slate-50/60 transition"
                            >
                              <div className="flex items-center gap-3">
                                {lecture.isPreview ? (
                                  <PlayCircle className="w-4 h-4 text-brand-600 shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <span className="font-medium text-slate-800">{lecture.title}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400">
                                {lecture.isPreview && (
                                  <span className="text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded text-[11px]">
                                    Preview
                                  </span>
                                )}
                                <span>{lecture.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Your Instructor</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={course.instructor?.avatar}
                  alt={course.instructor?.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-base">{course.instructor?.name}</h3>
                  <p className="text-xs text-brand-600 font-semibold">{course.instructor?.headline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {course.instructor?.bio || "Experienced technical educator and industry software engineer committed to guiding developers through modern software architecture."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
