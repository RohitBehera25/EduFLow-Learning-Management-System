import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Public Pages
import HomePage from '../pages/public/HomePage';
import CoursesPage from '../pages/public/CoursesPage';
import CourseDetailsPage from '../pages/public/CourseDetailsPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import VerifyOtpPage from '../pages/public/VerifyOtpPage';
import UnauthorizedPage from '../pages/public/UnauthorizedPage';
import NotFoundPage from '../pages/public/NotFoundPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import MyCoursesPage from '../pages/student/MyCoursesPage';
import CoursePlayerPage from '../pages/student/CoursePlayerPage';
import StudentProfilePage from '../pages/student/StudentProfilePage';

// Instructor Pages
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import MyCoursesManagePage from '../pages/instructor/MyCoursesManagePage';
import CreateCoursePage from '../pages/instructor/CreateCoursePage';
import InstructorAnalyticsPage from '../pages/instructor/InstructorAnalyticsPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageCoursesPage from '../pages/admin/ManageCoursesPage';

/**
 * AppRoutes Component
 * Central router configuration handling public views, role-based dashboards,
 * and distraction-free classroom player routes.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================================================
          PUBLIC ROUTES (Wrapped in MainLayout: Navbar + Footer)
         ======================================================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyOtpPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* ========================================================
          DISTRACTION-FREE LEARNING CLASSROOM PLAYER
          (Protected - only authenticated students who enrolled)
         ======================================================== */}
      <Route
        path="/learn/:courseId"
        element={
          <ProtectedRoute>
            <CoursePlayerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:courseId/lecture/:lectureId"
        element={
          <ProtectedRoute>
            <CoursePlayerPage />
          </ProtectedRoute>
        }
      />

      {/* ========================================================
          STUDENT PROTECTED ROUTES (DashboardLayout)
         ======================================================== */}
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['student']}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
      </Route>

      {/* ========================================================
          INSTRUCTOR PROTECTED ROUTES (DashboardLayout)
         ======================================================== */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['instructor']}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/instructor/dashboard" replace />} />
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="courses" element={<MyCoursesManagePage />} />
        <Route path="create-course" element={<CreateCoursePage />} />
        <Route path="analytics" element={<InstructorAnalyticsPage />} />
      </Route>

      {/* ========================================================
          ADMIN PROTECTED ROUTES (DashboardLayout)
         ======================================================== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="courses" element={<ManageCoursesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
