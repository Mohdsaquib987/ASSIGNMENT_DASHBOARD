# 📚 Assignment Dashboard

A modern, role-based assignment management system built with **React + Vite + Tailwind CSS**. Students can track and submit assignments, while professors can create, manage, and monitor submissions across multiple courses.

---

## 🎯 Overview

The Assignment Dashboard provides two distinct role-based experiences:

- **👨‍🎓 Student Portal** — View enrolled courses, track assignments, submit work, and monitor progress
- **👨‍🏫 Professor Portal** — Manage courses, create/edit assignments, and track student submissions with analytics

All data persists in `localStorage` (mock backend) to demonstrate a complete frontend flow without server dependency.

---

## ✨ Features

### Student Flow
- 🔐 Role-based login with validation
- 📖 Enrolled courses dashboard
- 📝 Course-wise assignment listing
- ⏰ Due date tracking with "days left" and "overdue" indicators
- ✅ Submission acknowledgment with timestamp
- 📊 Progress visualization (bars + badges + stats)
- 🚫 Auto-disabled submit button after deadline

### Professor Flow
- 🔐 Role-based login with redirect
- 🎓 Courses grid with per-course stats
- ➕ Create assignments (title, description, deadline, OneDrive link, submission type)
- ✏️ Edit and delete assignments
- 📈 Real-time submission analytics per student
- 🗂️ Course-wise assignment filtering
- 🛡️ Past-date validation on deadline field

### Common
- 🎨 Clean, modern UI with Tailwind CSS v4
- 🧭 Protected routes with role validation
- 💾 Persistent state via `localStorage`
- 📱 Fully responsive (mobile + tablet + desktop)

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM v6 |
| **State** | React Hooks (`useState`, `useEffect`, `useMemo`) |
| **Storage** | Browser `localStorage` (mock API) |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mohdsaquib987/ASSIGNMENT_DASHBOARD.git

# 2. Navigate into the project
cd ASSIGNMENT_DASHBOARD

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
