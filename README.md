#  Job Application Tracker

This is a **React-based Job Application Tracker** that helps users manage their job hunt progress. The app allows adding, editing, viewing, and deleting job application entries with clear UI and categorized statuses.

---

## Features

- Clean UI with TailwindCSS
- Sidebar navigation
- Add/Edit/Delete job entries
- Status tracking: Applied, Interviewed, Offered, etc.
- Reusable components and modals
- Summary dashboard with icons
- Responsive design (desktop optimized)

---

##  Tech Stack

- React
- Tailwind CSS
- React Icons
- React Router DOM
- Fetch API

---

## Installation

```bash
# 1. Clone this repository
git clone https://github.com/Xenrui/job-tracker.git

# 2. Navigate into the project directory
cd job-tracker

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

Before running the app, create or update the src/config.js file with your backend API base URL. Example:
```

## Configuration

Before running the app, create or update the src/config.js file with your backend API base URL. <br/>
Example:
```bash
const API_BASE_URL = "http://localhost/job-tracker-backend"; // Change this to your backend URL
export default API_BASE_URL;
