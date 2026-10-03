# EduFlow LMS - Frontend Architecture

A modern, production-grade **Learning Management System (LMS)** frontend built with **React.js**, **Tailwind CSS**, **React Router v6 (`BrowserRouter`)**, and **Redux Toolkit (RTK)**.

---

## 🚀 Quick Start Instructions

1. Open your terminal in the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (already installed):
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚡ Role-Based Quick Switcher (RBAC)

The top navigation bar contains a **"Role Switcher"** button allowing 1-click evaluation of all 3 portals without typing credentials:
- **Student**: Aman Sharma (`student@example.com`)
- **Instructor**: Dr. Vikram Seth (`instructor@example.com`)
- **Admin**: System Admin (`admin@example.com`)

---

## 📁 Component-Wise Architecture & Routing Breakdown

### **Part 1: Redux Toolkit State Management (`src/redux/`)**
- `store.js`: Configures the global store combining all reducers.
- `slices/authSlice.js`: JWT token handling, login, registration, OTP account activation (Nodemailer simulation), and role state.
- `slices/courseSlice.js`: Course catalog, multi-criteria filtering (search, category, level, sorting), and instructor CRUD actions.
- `slices/enrollmentSlice.js`: Enrolled courses, lecture completion toggle, and progress percentage calculator.
- `slices/uiSlice.js`: Mobile drawer, global notifications/toasts.

### **Part 2: Routing & RBAC Guards (`src/routes/`)**
- `AppRoutes.jsx`: Central routing map using `react-router-dom` with layout nesting.
- `ProtectedRoute.jsx`: Redirects unauthenticated users to `/login` preserving their return location.
- `RoleRoute.jsx`: Restricts routes according to user role (`student`, `instructor`, `admin`) and redirects unauthorized users to `/unauthorized`.

### **Part 3: Layouts & Common Components (`src/components/`)**
- `layout/MainLayout.jsx`: Public layout with Navbar, Outlet, and Footer.
- `layout/DashboardLayout.jsx`: Authenticated layout with responsive Sidebar and top header.
- `common/Navbar.jsx`: Brand logo, search input, quick role switcher, notification toasts, and profile dropdown.
- `common/Sidebar.jsx`: Dynamic role-specific sidebar (Student, Instructor, Admin).
- `common/CourseCard.jsx`: Course cards with ratings, price discount badges, and enrollment status.
- `common/Button.jsx`: Reusable buttons with variants, sizes, and spinner states.
- `common/NotificationToast.jsx`: Floating toast alerts with auto-dismiss.

### **Part 4: Public Pages (`src/pages/public/`)**
- `HomePage.jsx`: Hero, metrics banner, top courses, architecture highlights.
- `CoursesPage.jsx`: Filterable catalog with search, category pills, level filters, and sorting.
- `CourseDetailsPage.jsx`: Detailed syllabus accordion, instructor bio, and instant enrollment.
- `LoginPage.jsx`: Sign in with credentials and 1-click evaluation buttons.
- `RegisterPage.jsx`: Registration with Student/Instructor role selector.
- `VerifyOtpPage.jsx`: 6-digit OTP activation screen (Nodemailer simulation).
- `UnauthorizedPage.jsx` & `NotFoundPage.jsx`: 403 and 404 pages.

### **Part 5: Student Learning Classroom (`src/pages/student/`)**
- `StudentDashboard.jsx`: Progress overview, continue learning hero card, recommended tracks.
- `MyCoursesPage.jsx`: Enrolled courses list with progress meters.
- `CoursePlayerPage.jsx`: Distraction-free classroom with HTML5 video player, lecture playlist drawer, and note-taking tabs.
- `StudentProfilePage.jsx`: Profile settings and Cloudinary media upload simulation.

### **Part 6: Instructor Studio (`src/pages/instructor/`)**
- `InstructorDashboard.jsx`: Net revenue, total students, active courses overview.
- `MyCoursesManagePage.jsx`: Manage, edit, and delete published courses.
- `CreateCoursePage.jsx`: Course creator with Cloudinary thumbnail upload and dynamic curriculum module builder.
- `InstructorAnalyticsPage.jsx`: Student enrollment charts and revenue breakdown.

### **Part 7: Super Admin Console (`src/pages/admin/`)**
- `AdminDashboard.jsx`: System telemetry and quick audit alerts.
- `ManageUsersPage.jsx`: User management table with real-time RBAC role modification and account suspension.
- `ManageCoursesPage.jsx`: Course approvals and catalog quality moderation.
