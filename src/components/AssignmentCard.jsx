function AssignmentCard({ assignment, onSubmit }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        {assignment.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {assignment.description}
                    </p>
                </div>

                {/* Status */}
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${assignment.status === "submitted"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                >
                    {assignment.status === "submitted" ? "Submitted" : "Pending"}
                </span>
            </div>

            {/* Due Date */}
            <div className="mt-5">
                <p className="text-sm text-slate-500">
                    Due Date
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                    {assignment.dueDate}
                </p>
            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                        Progress
                    </span>

                    <span className="font-medium text-slate-700">
                        {assignment.progress}%
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${assignment.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Button */}
            {assignment.status !== "submitted" && (
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