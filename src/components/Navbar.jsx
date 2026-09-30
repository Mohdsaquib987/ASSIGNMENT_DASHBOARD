import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
  return (
    <nav className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            A
          </div>

          <span className="text-lg font-bold text-slate-900">
            Assignment Dashboard
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {role === "Professor" ? "Professor" : "Student"}
            </p>

            <p className="text-xs text-slate-500">
              {role}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {role === "Professor" ? "P" : "S"}
          </div>

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
