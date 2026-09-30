import { courses } from "../data/course";

// Helper: submitted status check
const isSubmitted = (status) =>
  status === "submitted" || status === "Submitted";

// Helper: due date check
const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// Helper: days left
const getDaysLeft = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diff;
};

function AssignmentCard({ assignment, onSubmit }) {
  const submitted = isSubmitted(assignment.status);
  const overdue = isOverdue(assignment.dueDate);
  const daysLeft = getDaysLeft(assignment.dueDate);
  const course = courses.find((c) => c.id === assignment.courseId);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {course && (
            <p className="text-xs font-semibold text-blue-600 mb-1">
              {course.code} · {course.name}
            </p>
          )}

          <h3 className="text-lg font-semibold text-slate-900">
            {assignment.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {assignment.description}
          </p>
        </div>

        {/* Status Badge */}
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            submitted
              ? "bg-green-100 text-green-700"
              : overdue
              ? "bg-red-100 text-red-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {submitted ? "Submitted" : overdue ? "Overdue" : "Pending"}
        </span>
      </div>

      {/* Due Date + Type */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Due Date</p>
          <p
            className={`mt-1 text-sm font-medium ${
              overdue && !submitted ? "text-red-600" : "text-slate-800"
            }`}
          >
            {assignment.dueDate}
          </p>

          {/* Days left / Overdue text */}
          {!submitted && daysLeft !== null && (
            <p
              className={`mt-0.5 text-xs font-medium ${
                overdue ? "text-red-600" : "text-blue-600"
              }`}
            >
              {overdue
                ? `⏰ Deadline passed ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? "s" : ""} ago`
                : daysLeft === 0
                ? "⏰ Due today!"
                : `⏰ ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">Type</p>
          <span className="mt-1 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {assignment.submissionType || "Individual"}
          </span>
        </div>
      </div>

      {/* OneDrive Link */}
      {assignment.oneDriveLink && (
        <div className="mt-4">
          <a
            href={assignment.oneDriveLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Open OneDrive Link →
          </a>
        </div>
      )}

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">Progress</span>
          <span className="font-medium text-slate-700">
            {assignment.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${assignment.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Button — 3 states */}
      {submitted ? (
        <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700">
          ✅ Submitted
        </div>
      ) : overdue ? (
        <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          ❌ Time Over — Deadline Passed
        </div>
      ) : (
        <button
          onClick={() => onSubmit(assignment)}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Yes, I have submitted
        </button>
      )}

    </div>
  );
}

export default AssignmentCard;