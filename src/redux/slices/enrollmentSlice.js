import { createSlice } from '@reduxjs/toolkit';
import { MOCK_ENROLLED_COURSES } from '../../api/mockData';

// Load stored enrollments or initialize with mock data
const storedEnrollments = localStorage.getItem('lms_enrollments')
  ? JSON.parse(localStorage.getItem('lms_enrollments'))
  : MOCK_ENROLLED_COURSES;

const initialState = {
  enrolledCourses: storedEnrollments,
  activeLecture: null,
};

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    // Enroll in a new course
    enrollCourse: (state, action) => {
      const course = action.payload;
      const alreadyEnrolled = state.enrolledCourses.some(
        (item) => item.courseId === course._id
      );

      if (!alreadyEnrolled) {
        const firstLectureId = course.curriculum?.[0]?.lectures?.[0]?.lectureId || null;
        const newEnrollment = {
          courseId: course._id,
          enrolledAt: new Date().toISOString().split('T')[0],
          progressPercent: 0,
          completedLectures: [],
          lastWatchedLectureId: firstLectureId,
          courseDetails: course,
        };
        state.enrolledCourses.unshift(newEnrollment);
        localStorage.setItem('lms_enrollments', JSON.stringify(state.enrolledCourses));
      }
    },

    // Mark a lecture as completed and recalculate course progress percentage
    toggleLectureComplete: (state, action) => {
      const { courseId, lectureId, totalLectures } = action.payload;
      const enrollment = state.enrolledCourses.find((e) => e.courseId === courseId);

      if (enrollment) {
        const index = enrollment.completedLectures.indexOf(lectureId);
        if (index > -1) {
          // If already completed, uncheck
          enrollment.completedLectures.splice(index, 1);
        } else {
          // Mark completed
          enrollment.completedLectures.push(lectureId);
        }

        // Calculate new progress percentage
        if (totalLectures > 0) {
          enrollment.progressPercent = Math.round(
            (enrollment.completedLectures.length / totalLectures) * 100
          );
        }

        enrollment.lastWatchedLectureId = lectureId;
        localStorage.setItem('lms_enrollments', JSON.stringify(state.enrolledCourses));
      }
    },

    setActiveLecture: (state, action) => {
      state.activeLecture = action.payload;
    }
  }
});

export const { enrollCourse, toggleLectureComplete, setActiveLecture } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
