import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse } from '../../redux/slices/courseSlice';
import { addToast } from '../../redux/slices/uiSlice';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/common/Button';
import { PlusCircle, Trash2, Edit, Eye, Star, BookOpen } from 'lucide-react';

const MyCoursesManagePage = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      dispatch(deleteCourse(id));
      dispatch(addToast({ type: 'success', message: 'Course deleted successfully!' }));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Manage Courses
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Update lectures, modify pricing, view student feedback, or create new learning tracks.
          </p>
        </div>
        <Link to="/instructor/create-course">
          <Button icon={PlusCircle}>
            Create New Course
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="py-4 px-6">Course</th>
                <th className="py-4 px-4">Level</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Enrolled</th>
                <th className="py-4 px-4">Status</th>
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
                      className="w-14 h-9 rounded-lg object-cover shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1 max-w-sm">
                        {course.title}
                      </h4>
                      <p className="text-slate-400 text-[11px]">Updated {course.lastUpdated}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                      {course.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                    {formatCurrency(course.price)}
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {course.studentsEnrolled?.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                      Published
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/courses/${course._id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id, course.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Course"
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

export default MyCoursesManagePage;
