import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import SubmissionModal from "../components/SubmissionModal";
import { courses } from "../data/course";

const isSubmitted = (status) =>
  status === "submitted" || status === "Submitted";

function StudentCourseAssignments() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courseId = Number(searchParams.get("course"));
  const course = courses.find((c) => c.id === courseId);

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || null;
  const CURRENT_STUDENT_ID = currentUser?.id;

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("assignments");
    setAssignments(saved ? JSON.parse(saved) : []);
  }, []);

  // Sirf is course ke assignments, jisme student enrolled hai
  const courseAssignments = assignments
    .filter((a) => a.courseId === courseId)
    .map((a) => {
      const student = a.students?.find(
        (s) => s.id === CURRENT_STUDENT_ID
      );
      if (!student) return null;
      return {
        ...a,
        status: student.status,
        progress: student.progress,
      };
    })
    .filter(Boolean);

  const handleSubmission = () => {
    if (!selectedAssignment || !CURRENT_STUDENT_ID) return;

    const updated = assignments.map((a) => {
      if (a.id !== selectedAssignment.id) return a;
      return {
        ...a,
        students: a.students.map((s) =>
          s.id === CURRENT_STUDENT_ID
            ? {
                ...s,
                status: "Submitted",
                progress: 100,
                submittedAt: new Date().toISOString(),
              }
            : s
        ),
      };
    });

    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));
    setSelectedAssignment(null);
  };

  const submittedCount = courseAssignments.filter((a) =>
    isSubmitted(a.status)
  ).length;

  const pendingCount = courseAssignments.length - submittedCount;

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Course not found
          </h1>
          <button
            onClick={() => navigate("/student/dashboard")}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Courses
        </button>

        {/* Header */}
        <section className="mt-4">
          <p className="text-xs font-semibold text-blue-600">
            {course.code}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {course.name}
          </h1>
          <p className="mt-2 text-slate-600">
            View and submit assignments for this course.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Assignments
            </p>
            <h2 className="mt-2 text-3xl font-bold text-blue-700">
              {courseAssignments.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Submitted</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {submittedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {pendingCount}
            </h2>
          </div>
        </section>

        {/* Assignments */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Assignments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Submit your work before the deadline.
            </p>
          </div>

          {courseAssignments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No assignments yet
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Assignments will appear here when the professor creates them.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {courseAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onSubmit={setSelectedAssignment}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Modal */}
      {selectedAssignment && (
        <SubmissionModal
          onClose={() => setSelectedAssignment(null)}
          onConfirm={handleSubmission}
        />
      )}
    </main>
  );
}

export default StudentCourseAssignments;