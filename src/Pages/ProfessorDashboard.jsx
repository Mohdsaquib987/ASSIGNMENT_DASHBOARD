import { useNavigate } from "react-router-dom";
import { courses, ALL_STUDENTS } from "../data/course";   // 👈 ALL_STUDENTS bhi import

function ProfessorDashboard() {
  const navigate = useNavigate();

  const assignments = JSON.parse(
    localStorage.getItem("assignments") || "[]"
  );

  // 👇 FIX: unique students count (pehle courses.reduce se 9 aa raha tha)
  const totalStudents = ALL_STUDENTS.length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <section>
          <p className="text-sm font-medium text-blue-600">
            Professor Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Professor Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your courses and assignments.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Courses You Teach
            </p>
            <h2 className="mt-2 text-3xl font-bold text-blue-700">
              {courses.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Students
            </p>
            <h2 className="mt-2 text-3xl font-bold text-purple-700">
              {totalStudents}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Assignments
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {assignments.length}
            </h2>
          </div>

        </section>

        {/* Courses */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a course to manage its assignments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate(`/professor/assignments?course=${course.id}`)
                }
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                {/* Course Header */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    {course.icon}
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>

                {/* Course Info */}
                <div className="mt-5">
                  <p className="text-xs font-medium text-blue-600">
                    {course.code}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {course.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Manage assignments and monitor student submissions.
                  </p>
                </div>

                {/* Course Stats */}
                <div className="mt-5 flex items-center gap-8 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">Students</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {course.students}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Assignments</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {
                        assignments.filter(
                          (a) => a.courseId === course.id
                        ).length
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-5 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700">
                  Open Course →
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

export default ProfessorDashboard;