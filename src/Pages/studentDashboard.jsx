import { useEffect, useState } from "react";
import AssignmentCard from "../components/AssignmentCard";
import SubmissionModal from "../components/SubmissionModal";

const CURRENT_STUDENT_ID = 1;

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const savedAssignments = localStorage.getItem("assignments");

    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  const studentAssignments = assignments
    .map((assignment) => {
      const student = assignment.students.find(
        (student) => student.id === CURRENT_STUDENT_ID
      );

      if (!student) {
        return null;
      }

      return {
        ...assignment,
        status: student.status,
        progress: student.progress,
      };
    })
    .filter(Boolean);

  const handleSubmission = () => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id !== selectedAssignment.id) {
        return assignment;
      }

      return {
        ...assignment,
        students: assignment.students.map((student) =>
          student.id === CURRENT_STUDENT_ID
            ? {
                ...student,
                status: "Submitted",
                progress: 100,
              }
            : student
        ),
      };
    });

    setAssignments(updatedAssignments);

    localStorage.setItem(
      "assignments",
      JSON.stringify(updatedAssignments)
    );

    setSelectedAssignment(null);
  };

  const submittedCount = studentAssignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length;

  const pendingCount =
    studentAssignments.length - submittedCount;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <section>
          <p className="text-sm font-medium text-blue-600">
            Student Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Welcome back, Student 1 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Track your assignments and submission progress.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Assignments
            </p>

            <h2 className="mt-2 text-3xl font-bold text-blue-700">
              {studentAssignments.length}
            </h2>
          </div>

          {/* Submitted */}
          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Submitted
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {submittedCount}
            </h2>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {pendingCount}
            </h2>
          </div>

        </section>

        {/* Assignments */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My Assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your assignments and track your submission progress.
            </p>
          </div>

          {studentAssignments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No assignments yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Your assignments will appear here when the admin creates them.
              </p>

            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">

              {studentAssignments.map((assignment) => (
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

      {/* Submission Modal */}
      {selectedAssignment && (
        <SubmissionModal
          onClose={() => setSelectedAssignment(null)}
          onConfirm={handleSubmission}
        />
      )}

    </main>
  );
}

export default StudentDashboard;