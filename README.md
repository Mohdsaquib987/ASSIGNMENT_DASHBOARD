# Assignment & Review Dashboard

A responsive React-based Assignment & Review Dashboard built as a Frontend Intern technical assignment.

The application provides separate dashboards for Students and Admins/Professors. Students can view assignments and confirm submissions, while Admins can create, edit, delete, and monitor assignments and student submission progress.

## Features

### Student Dashboard

- View assigned assignments
- View assignment description and due date
- Track submission progress
- Confirm assignment submission
- Double-verification before submitting
- Submission status updates automatically
- Responsive student dashboard

### Admin Dashboard

- Create new assignments
- Edit existing assignments
- Delete assignments
- Add assignment description and due date
- Attach Google Drive assignment links
- View total assignments
- View total students
- View total submissions
- Monitor individual student submission status
- View individual student progress
- Responsive admin dashboard

## Tech Stack

- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- React Router
- Vite
- LocalStorage

## Project Structure

```text
src/
├── app/
│   ├── App.jsx
│   └── App.css
│
├── components/
│   ├── AssignmentCard.jsx
│   ├── Navbar.jsx
│   └── SubmissionModal.jsx
│
├── Pages/
│   ├── AdminDashboard.jsx
│   └── studentDashboard.jsx
│
├── data/
│   └── assignments.js
│
├── assets/
│
├── index.css
└── main.jsx
