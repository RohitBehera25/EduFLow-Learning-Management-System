import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../../redux/slices/courseSlice';
import { addToast } from '../../redux/slices/uiSlice';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import { CheckCircle2, XCircle, Eye, Trash2, Sparkles, BookOpen } from 'lucide-react';

const ManageCoursesPage = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      dispatch(deleteCourse(id));
      dispatch(addToast({ type: 'success', message: 'Course removed by admin.' }));
    }
  };

  const handleToggleFeature = (title) => {
    dispatch(addToast({ type: 'success', message: `Featured status toggled for "${title}"` }));
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Course Catalog Approvals & Moderation
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Review curriculum quality, toggle homepage features, and inspect instructor video uploads.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="py-4 px-6">Course</th>
                <th className="py-4 px-4">Instructor</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Enrolled</th>
                <th className="py-4 px-4">Moderation</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-14 h-9 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1 max-w-sm">
                        {course.title}
                      </h4>
                      <span className="text-brand-600 font-semibold text-[10px] uppercase">
                        {course.category}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-800">{course.instructor?.name}</span>
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                    {formatCurrency(course.price)}
                  </td>

                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {course.studentsEnrolled?.toLocaleString()}
                  </td>

                  <td className="py-4 px-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Approved
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleFeature(course.title)}
                        className="p-1.5 text-amber-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition"
                        title="Feature on Homepage"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/courses/${course._id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition"
                        title="Preview Course"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id, course.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Reject / Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default ManageCoursesPage;
