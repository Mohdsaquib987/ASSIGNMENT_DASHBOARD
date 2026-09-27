import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import StudentDashboard from "../Pages/studentDashboard";
import AdminDashboard from "../Pages/AdminDashboard";

function AppContent() {
  const location = useLocation();

  const role = location.pathname === "/admin" ? "Admin" : "Student";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role={role} />

      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Navigate to="/student" />} />
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