import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedLevel,
  setSortBy,
  resetFilters
} from '../../redux/slices/courseSlice';
import { MOCK_CATEGORIES } from '../../api/mockData';
import CourseCard from '../../components/common/CourseCard';
import Button from '../../components/common/Button';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const {
    filteredCourses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    sortBy
  } = useSelector((state) => state.courses);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Explore All Courses
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Hand-crafted masterclasses designed for real-world full stack production.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by course title, topic, or instructor..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
            />
          </div>

          {/* Level Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedLevel}
              onChange={(e) => dispatch(setSelectedLevel(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 focus:bg-white focus:border-brand-500 outline-none font-medium"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 focus:bg-white focus:border-brand-500 outline-none font-medium"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Reset */}
          <Button
            variant="ghost"
            onClick={() => dispatch(resetFilters())}
            icon={RotateCcw}
            className="text-slate-500 hover:text-slate-800"
          >
            Reset
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 no-scrollbar">
          {MOCK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => dispatch(setSelectedCategory(cat.id))}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing {filteredCourses.length} course{filteredCourses.length === 1 ? '' : 's'}</span>
        {searchQuery && (
          <span>Filtering by: <strong className="text-slate-800">"{searchQuery}"</strong></span>
        )}
      </div>

      {/* Courses Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">No matching courses found</h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Try adjusting your search terms or filters to find what you are looking for.
          </p>
          <Button variant="outline" size="sm" onClick={() => dispatch(resetFilters())}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
