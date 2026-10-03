import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/common/Button';
import { PlayCircle, Award, BookOpen, Clock, Compass } from 'lucide-react';

const MyCoursesPage = () => {
  const { enrolledCourses } = useSelector((state) => state.enrollments);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Access your interactive video classes, track your milestones, and claim certificates.
          </p>
        </div>
        <Link to="/courses">
          <Button variant="outline" size="sm" icon={Compass}>
            Browse More Courses
          </Button>
        </Link>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((item) => {
            const course = item.courseDetails;
            const progress = item.progressPercent || 0;
            const isCompleted = progress === 100;

            return (
              <div
                key={item.courseId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft flex flex-col hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-100">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {isCompleted ? (
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                        <Award className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        {progress}% Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                      {course?.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                      {course?.title}
                    </h3>
                    <p className="text-xs text-slate-500">{course?.instructor?.name}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="pt-2 mt-auto space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-brand-600'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="pt-3 border-t border-slate-100">
                    <Link to={`/learn/${item.courseId}`} className="block">
                      <Button
                        variant={isCompleted ? 'outline' : 'primary'}
                        size="sm"
                        className="w-full"
                        icon={PlayCircle}
                      >
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">No enrolled courses yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You haven't enrolled in any courses yet. Browse our top-rated engineering catalog and start mastering new skills today!
          </p>
          <Link to="/courses">
            <Button size="md">Explore Courses Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
