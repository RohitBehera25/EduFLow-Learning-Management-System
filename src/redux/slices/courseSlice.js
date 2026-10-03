import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOCK_COURSES } from '../../api/mockData';

const initialState = {
  courses: MOCK_COURSES,
  filteredCourses: MOCK_COURSES,
  currentCourse: null,
  searchQuery: '',
  selectedCategory: 'all',
  selectedLevel: 'all',
  sortBy: 'popular', // 'popular' | 'rating' | 'price-asc' | 'price-desc'
  loading: false,
  error: null,
};

// Helper filter function
const applyFilters = (state) => {
  let list = [...state.courses];

  // Search query filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.instructor?.name.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (state.selectedCategory !== 'all') {
    list = list.filter((c) => c.category === state.selectedCategory);
  }

  // Level filter
  if (state.selectedLevel !== 'all') {
    list = list.filter((c) => c.level === state.selectedLevel);
  }

  // Sort
  if (state.sortBy === 'popular') {
    list.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  }

  state.filteredCourses = list;
};

// Async Thunk: Fetch Single Course by ID
export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { getState, rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 300));
      const { courses } = getState().courses;
      const found = courses.find((c) => c._id === courseId || c.slug === courseId);
      if (!found) {
        return rejectWithValue('Course not found.');
      }
      return found;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
      applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedLevel = 'all';
      state.sortBy = 'popular';
      state.filteredCourses = state.courses;
    },
    // Instructor Create Course Action
    addCourse: (state, action) => {
      const newCourse = {
        _id: `course_${Date.now()}`,
        studentsEnrolled: 0,
        rating: 5.0,
        reviewsCount: 1,
        status: 'published',
        lastUpdated: 'Just now',
        curriculum: [],
        ...action.payload,
      };
      state.courses.unshift(newCourse);
      applyFilters(state);
    },
    // Instructor Update Course Action
    updateCourse: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.courses.findIndex((c) => c._id === id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...updatedData };
        if (state.currentCourse?._id === id) {
          state.currentCourse = { ...state.currentCourse, ...updatedData };
        }
        applyFilters(state);
      }
    },
    // Instructor Delete Course Action
    deleteCourse: (state, action) => {
      const id = action.payload;
      state.courses = state.courses.filter((c) => c._id !== id);
      applyFilters(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedLevel,
  setSortBy,
  resetFilters,
  addCourse,
  updateCourse,
  deleteCourse
} = courseSlice.actions;

export default courseSlice.reducer;
