import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useSelector } from 'react-redux';

const CourseCard = ({ course }) => {
  const { enrolledCourses } = useSelector((state) => state.enrollments);
  const isEnrolled = enrolledCourses.some((item) => item.courseId === course._id);

  // Calculate total lectures
  const totalLectures = course.curriculum?.reduce(
    (acc, sec) => acc + (sec.lectures?.length || 0),
    0
  ) || 12;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <Link to={`/courses/${course._id}`} className="relative aspect-video overflow-hidden bg-slate-100 block">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {course.level}
          </span>
          {course.discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {course.discountPercent}% OFF
            </span>
          )}
        </div>
        {isEnrolled && (
          <div className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
            <CheckCircle className="w-3.5 h-3.5" /> Enrolled
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
          <div className="flex items-center text-amber-500 font-semibold gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
          <span>•</span>
          <span>({course.reviewsCount?.toLocaleString()} reviews)</span>
          <span>•</span>
          <span className="text-slate-600 font-medium">{course.studentsEnrolled?.toLocaleString()} students</span>
        </div>

        {/* Title */}
        <Link to={`/courses/${course._id}`} className="group-hover:text-brand-600 transition-colors">
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2">
            {course.title}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
          {course.subtitle}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 mt-auto">
          <img
            src={course.instructor?.avatar}
            alt={course.instructor?.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-200"
          />
          <div className="text-xs">
            <p className="font-medium text-slate-800 line-clamp-1">{course.instructor?.name}</p>
            <p className="text-slate-400 text-[10px] line-clamp-1">{course.instructor?.headline}</p>
          </div>
        </div>

        {/* Meta Stats & Price */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {totalLectures} lectures
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            {course.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(course.originalPrice)}
              </span>
            )}
            <span className="text-base font-extrabold text-slate-900">
              {formatCurrency(course.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
