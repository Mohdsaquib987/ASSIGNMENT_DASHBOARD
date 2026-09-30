import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { courses, ALL_STUDENTS } from "../data/course";

// Helper: submitted status check (dono formats support)
const isSubmitted = (status) =>
  status === "submitted" || status === "Submitted";

// Helper: today's date in YYYY-MM-DD (for min attribute)
const todayStr = () => new Date().toISOString().split("T")[0];

function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Course ID from URL (?course=1)
  const courseIdParam = searchParams.get("course");
  const courseId = courseIdParam ? Number(courseIdParam) : null;
  const course = courses.find((c) => c.id === courseId) || null;

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("assignments");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    oneDriveLink: "",
    submissionType: "Individual",
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  // Course-wise filter
  const visibleAssignments = useMemo(() => {
    if (!courseId) return assignments;
    return assignments.filter(
      (a) => Number(a.courseId) === Number(courseId)
    );
  }, [assignments, courseId]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((c) => ({ ...c, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      oneDriveLink: "",
      submissionType: "Individual",
    });
    setEditingAssignment(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAssignment) {
      // Update existing — courseId change nahi karna
      setAssignments((current) =>
        current.map((a) =>
          a.id === editingAssignment.id ? { ...a, ...formData } : a
        )
      );
      setEditingAssignment(null);
    } else {
      // Create new — courseId save karo
      const newAssignment = {
        id: Date.now(),
        courseId: courseId || null,
        ...formData,
        students: ALL_STUDENTS.map((s) => ({
          id: s.id,
          name: s.name,
          status: "Not Submitted",
          progress: 0,
        })),
      };
      setAssignments((current) => [...current, newAssignment]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      oneDriveLink: assignment.oneDriveLink || "",
      submissionType: assignment.submissionType || "Individual",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAssignments((current) => current.filter((a) => a.id !== id));
  };

  const handleCloseForm = () => {
    resetForm();
    setShowForm(false);
  };

  // Stats
  const totalStudents =
    visibleAssignments.length > 0
      ? visibleAssignments[0].students.length
      : ALL_STUDENTS.length;

  const totalSubmissions = visibleAssignments.reduce(
    (sum, a) =>
      sum + a.students.filter((s) => isSubmitted(s.status)).length,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        {course && (
          <button
            onClick={() => navigate("/professor/dashboard")}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Courses
          </button>
        )}

        {/* Header */}
        <section className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Professor Portal
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              {course ? course.name : "All Assignments"}
            </h1>
            <p className="mt-2 text-slate-600">
              {course
                ? `Manage assignments for ${course.code} and monitor submissions.`
                : "Create assignments and monitor student submissions."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => (showForm ? handleCloseForm() : setShowForm(true))}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            {showForm ? "Close Form" : "+ Create Assignment"}
          </button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Assignments
                </p>
                <h2 className="mt-2 text-3xl font-bold text-blue-700">
                  {visibleAssignments.length}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                📚
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Students
                </p>
                <h2 className="mt-2 text-3xl font-bold text-purple-700">
                  {totalStudents}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                👨‍🎓
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Submissions
                </p>
                <h2 className="mt-2 text-3xl font-bold text-green-700">
                  {totalSubmissions}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                ✓
              </div>
            </div>
          </div>

        </section>

        {/* Form */}
        {showForm && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-bold text-slate-900">
                {editingAssignment ? "Edit Assignment" : "Create Assignment"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingAssignment
                  ? "Update the assignment details below."
                  : `Add the assignment details for ${course?.name || "this course"}.`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter assignment title"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter assignment description"
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                ></textarea>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Deadline
                  </label>
                  {/* 👇 min attribute — past date disable */}
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    min={todayStr()}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Past dates not allowed
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    OneDrive Submission Link
                  </label>
                  <input
                    type="url"
                    name="oneDriveLink"
                    value={formData.oneDriveLink}
                    onChange={handleChange}
                    placeholder="https://onedrive.live.com/..."
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Submission Type
                </label>
                <select
                  name="submissionType"
                  value={formData.submissionType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {editingAssignment ? "Update Assignment" : "Create Assignment"}
                </button>
              </div>

            </form>
          </section>
        )}

        {/* Manage Assignments */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              {course ? "Course Assignments" : "Manage Assignments"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {course
                ? `Assignments for ${course.name}.`
                : "View assignments and monitor student progress."}
            </p>
          </div>

          {visibleAssignments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No assignments yet
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {course
                  ? `Create your first assignment for ${course.name}.`
                  : "Create your first assignment to get started."}
              </p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create Assignment
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {visibleAssignments.map((assignment) => {
                const submittedCount = assignment.students.filter(
                  (s) => isSubmitted(s.status)
                ).length;
                const total = assignment.students.length;
                const progress = total
                  ? Math.round((submittedCount / total) * 100)
                  : 0;

                return (
                  <div
                    key={assignment.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="border-b border-slate-100 p-6">

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {assignment.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {assignment.description}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {assignment.submissionType || "Individual"}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-slate-400">Deadline</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {assignment.dueDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Students</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {total}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Submission</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {assignment.submissionType || "Individual"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-slate-500">
                              Submission Progress
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-800">
                              {submittedCount} / {total} submitted
                            </p>
                          </div>
                          <span className="text-sm font-bold text-blue-600">
                            {progress}%
                          </span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        <a
                          href={assignment.oneDriveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-blue-600 hover:underline"
                        >
                          Open OneDrive →
                        </a>
                        <button
                          type="button"
                          onClick={() => handleEdit(assignment)}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Edit Assignment
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(assignment.id)}
                          className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
                        >
                          Delete Assignment
                        </button>
                      </div>

                    </div>

                    <div className="bg-slate-50/70 p-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">
                          Student Progress
                        </h4>
                        <span className="text-xs text-slate-500">
                          {total} students
                        </span>
                      </div>

                      <div className="mt-5 space-y-5">
                        {assignment.students.map((student) => (
                          <div key={student.id}>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-slate-700">
                                {student.name}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  isSubmitted(student.status)
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {isSubmitted(student.status)
                                  ? "Submitted"
                                  : "Pending"}
                              </span>
                            </div>

                            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>

                            <div className="mt-1 flex justify-between">
                              <span className="text-xs text-slate-400">
                                Progress
                              </span>
                              <span className="text-xs font-semibold text-slate-600">
                                {student.progress}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;