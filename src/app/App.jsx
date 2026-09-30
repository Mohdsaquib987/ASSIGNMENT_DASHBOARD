import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import StudentDashboard from "../Pages/studentDashboard";
import StudentCourseAssignments from "../Pages/StudentCourseAssignments";
import ProfessorDashboard from "../Pages/ProfessorDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import Login from "../Pages/login";

function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
    if (user.role === "professor") {
      return <Navigate to="/professor/dashboard" replace />;
    }
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const showNavbar = location.pathname !== "/login";

  let role = "Student";
  if (user?.role === "professor") role = "Professor";

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  // Agar logged-in user /login pe aaye to redirect
  if (user && location.pathname === "/login") {
    return (
      <Navigate
        to={
          user.role === "professor"
            ? "/professor/dashboard"
            : "/student/dashboard"
        }
        replace
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {showNavbar && <Navbar role={role} onLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentCourseAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={<Navigate to="/student/dashboard" replace />}
        />

        {/* PROFESSOR */}
        <Route
          path="/professor/dashboard"
          element={
            <ProtectedRoute allowedRole="professor">
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor/assignments"
          element={
            <ProtectedRoute allowedRole="professor">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;