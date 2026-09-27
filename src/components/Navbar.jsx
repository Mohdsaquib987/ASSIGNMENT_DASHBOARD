import { Link } from "react-router-dom";

function Navbar({ role }) {
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

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/student"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Student
          </Link>

          <Link
            to="/admin"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Admin
          </Link>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Mohd Saquib
            </p>

            <p className="text-xs text-slate-500">
              {role}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            MS
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;