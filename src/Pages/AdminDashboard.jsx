import { useEffect, useState } from "react";

function AdminDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);

    const [assignments, setAssignments] = useState(() => {
        const savedAssignments = localStorage.getItem("assignments");

        return savedAssignments
            ? JSON.parse(savedAssignments)
            : [];
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        driveLink: "",
    });

    useEffect(() => {
        localStorage.setItem(
            "assignments",
            JSON.stringify(assignments)
        );
    }, [assignments]);

    // Handle form input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    // Create / Update Assignment
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update existing assignment
        if (editingAssignment) {
            const updatedAssignments = assignments.map(
                (assignment) =>
                    assignment.id === editingAssignment.id
                        ? {
                            ...assignment,
                            title: formData.title,
                            description: formData.description,
                            dueDate: formData.dueDate,
                            driveLink: formData.driveLink,
                        }
                        : assignment
            );

            setAssignments(updatedAssignments);
            setEditingAssignment(null);
        }

        // Create new assignment
        else {
            const newAssignment = {
                id: Date.now(),
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                driveLink: formData.driveLink,

                students: [
                    {
                        id: 1,
                        name: "Student 1",
                        status: "Not Submitted",
                        progress: 0,
                    },
                    {
                        id: 2,
                        name: "Student 2",
                        status: "Not Submitted",
                        progress: 0,
                    },
                    {
                        id: 3,
                        name: "Student 3",
                        status: "Not Submitted",
                        progress: 0,
                    },
                ],
            };

            setAssignments((current) => [
                ...current,
                newAssignment,
            ]);
        }

        // Reset form
        setFormData({
            title: "",
            description: "",
            dueDate: "",
            driveLink: "",
        });

        setShowForm(false);
    };

    // Delete Assignment
    const handleDelete = (assignmentId) => {
        const updatedAssignments = assignments.filter(
            (assignment) => assignment.id !== assignmentId
        );

        setAssignments(updatedAssignments);

        localStorage.setItem(
            "assignments",
            JSON.stringify(updatedAssignments)
        );
    };

    // Edit Assignment
    const handleEdit = (assignment) => {
        setEditingAssignment(assignment);

        setFormData({
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            driveLink: assignment.driveLink,
        });

        setShowForm(true);
    };

    // Close form
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingAssignment(null);

        setFormData({
            title: "",
            description: "",
            dueDate: "",
            driveLink: "",
        });
    };

    // Total students
    const totalStudents =
        assignments.length > 0
            ? assignments[0].students.length
            : 0;

    // Total submissions
    const totalSubmissions = assignments.reduce(
        (total, assignment) => {
            return (
                total +
                assignment.students.filter(
                    (student) =>
                        student.status === "Submitted"
                ).length
            );
        },
        0
    );

    return (
        <main className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            Administration
                        </p>

                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            Admin Dashboard
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Create assignments and track student submissions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (showForm) {
                                handleCloseForm();
                            } else {
                                setShowForm(true);
                            }
                        }}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        {showForm
                            ? "Close Form"
                            : "+ Create Assignment"}
                    </button>

                </section>

                {/* Stats */}
                <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Total Assignments */}
                    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Total Assignments
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-blue-700">
                                    {assignments.length}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                📚
                            </div>

                        </div>

                    </div>

                    {/* Total Students */}
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

                    {/* Submissions */}
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

                {/* Create / Edit Assignment Form */}
                {showForm && (
                    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="border-b border-slate-100 pb-5">

                            <h2 className="text-xl font-bold text-slate-900">
                                {editingAssignment
                                    ? "Edit Assignment"
                                    : "Create Assignment"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {editingAssignment
                                    ? "Update the assignment details below."
                                    : "Add the assignment details below."}
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-5"
                        >

                            {/* Title */}
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

                            {/* Description */}
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

                            {/* Date and Link */}
                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Due Date */}
                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Due Date
                                    </label>

                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                {/* Drive Link */}
                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Google Drive Link
                                    </label>

                                    <input
                                        type="url"
                                        name="driveLink"
                                        value={formData.driveLink}
                                        onChange={handleChange}
                                        placeholder="https://drive.google.com/..."
                                        required
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Buttons */}
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
                                    {editingAssignment
                                        ? "Update Assignment"
                                        : "Create Assignment"}
                                </button>

                            </div>

                        </form>

                    </section>
                )}

                {/* Manage Assignments */}
                <section className="mt-10">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold text-slate-900">
                            Manage Assignments
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View assignments and monitor student progress.
                        </p>

                    </div>

                    {/* No Assignments */}
                    {assignments.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                                📚
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                No assignments yet
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Create your first assignment to get started.
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

                            {assignments.map((assignment) => (

                                <div
                                    key={assignment.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                                >

                                    {/* Card Header */}
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
                                                Active
                                            </span>

                                        </div>

                                        {/* Assignment Details */}
                                        <div className="mt-5 flex flex-wrap gap-4">

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Due Date
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                                    {assignment.dueDate}
                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Students
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                                    {assignment.students.length}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Assignment Actions */}
                                        <div className="mt-5 flex flex-wrap items-center gap-4">

                                            <a
                                                href={assignment.driveLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-semibold text-blue-600 hover:underline"
                                            >
                                                Open Assignment →
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(assignment)
                                                }
                                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                Edit Assignment
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(assignment.id)
                                                }
                                                className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
                                            >
                                                Delete Assignment
                                            </button>

                                        </div>

                                    </div>

                                    {/* Student Progress */}
                                    <div className="bg-slate-50/70 p-6">

                                        <div className="flex items-center justify-between">

                                            <h4 className="text-sm font-bold text-slate-900">
                                                Student Progress
                                            </h4>

                                            <span className="text-xs text-slate-500">
                                                {assignment.students.length} students
                                            </span>

                                        </div>

                                        <div className="mt-5 space-y-5">

                                            {assignment.students.map(
                                                (student) => (

                                                    <div key={student.id}>

                                                        <div className="flex items-center justify-between gap-3">

                                                            <span className="text-sm font-semibold text-slate-700">
                                                                {student.name}
                                                            </span>

                                                            <span
                                                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                    student.status ===
                                                                    "Submitted"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-orange-100 text-orange-700"
                                                                }`}
                                                            >
                                                                {student.status}
                                                            </span>

                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">

                                                            <div
                                                                className="h-full rounded-full bg-blue-600 transition-all"
                                                                style={{
                                                                    width: `${student.progress}%`,
                                                                }}
                                                            ></div>

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

                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}

export default AdminDashboard;