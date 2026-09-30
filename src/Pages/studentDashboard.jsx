import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import SubmissionModal from "../components/SubmissionModal";
import { courses } from "../data/course";

// Helper: submitted status check
const isSubmitted = (status) =>
  status === "submitted" || status === "Submitted";

function StudentDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Get currently logged-in student
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || null;

  const CURRENT_STUDENT_ID = currentUser?.id;

  // Student ke enrolled courses
  const myCourses = courses.filter((course) =>
    course.enrolledStudents?.includes(CURRENT_STUDENT_ID)
  );

  useEffect(() => {
    const savedAssignments = localStorage.getItem("assignments");

    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  const studentAssignments = assignments
    .map((assignment) => {
      const student = assignment.students?.find(
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
    if (!selectedAssignment || !CURRENT_STUDENT_ID) {
      return;
    }

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
                submittedAt: new Date().toISOString(),
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

  const submittedCount = studentAssignments.filter((assignment) =>
    isSubmitted(assignment.status)
  ).length;

  const pendingCount = studentAssignments.length - submittedCount;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <section>
          <p className="text-sm font-medium text-blue-600">
            Student Portal
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Welcome back, {currentUser?.name || "Student"} 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Track your assignments and submission progress.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Assignments
            </p>
            <h2 className="mt-2 text-3xl font-bold text-blue-700">
              {studentAssignments.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Submitted
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              {submittedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {pendingCount}
            </h2>
          </div>
        </section>

        {/* 🆕 MY COURSES */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Courses you are enrolled in this semester.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate(`/student/assignments?course=${course.id}`)
                }
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    {course.icon}
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Enrolled
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium text-blue-600">
                    {course.code}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {course.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    View assignments and submit your work.
                  </p>
                </div>

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

        {/* ASSIGNMENTS (existing) */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              All My Assignments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View all assignments across your courses.
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
                Your assignments will appear here when the professor creates them.
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