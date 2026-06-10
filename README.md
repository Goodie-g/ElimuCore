# ElimuCore 📚

**A Modern School Management System for Educational Excellence**

ElimuCore is a comprehensive, web-based school management platform designed to streamline administrative tasks, facilitate teacher-student interactions, and provide data-driven insights into academic performance. Built with cutting-edge web technologies, ElimuCore offers an intuitive interface for managing students, teachers, grades, and dashboard analytics.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Usage Guide](#usage-guide)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 🎓 Core Functionality

- **Dashboard Analytics**: Real-time overview of school metrics including total students, teachers, and performance statistics
- **Student Management**: Comprehensive student directory with add, view, edit, and delete capabilities
- **Teacher Management**: Teacher profiles and administrative information management
- **Grade Tracking**: Detailed grade management system with subject-wise tracking and performance analytics
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices
- **Fast Performance**: Optimized with Vite for lightning-fast development and production builds

### 🛠️ Administrative Features

- **Modal-based Forms**: Clean, intuitive modal dialogs for adding students and teachers
- **Search Functionality**: Quickly find students and teachers through search capabilities
- **Sidebar Navigation**: Easy navigation between different sections of the application
- **Statistics Cards**: Visual representation of key performance indicators
- **Table Actions**: Context-specific actions for managing data entries

---

## Tech Stack

### Frontend
- **React 19.2.6** - UI library for building interactive user interfaces
- **React Router DOM 7.15.1** - Client-side routing for navigation
- **Vite 8.0.12** - Ultra-fast build tool and development server
- **Tailwind CSS 4.3.0** - Utility-first CSS framework for styling
- **React Icons 5.6.0** - Comprehensive icon library for UI elements

### Development Tools
- **ESLint 10.3.0** - Code quality and consistency checking
- **JavaScript (ES Module)** - Modern JavaScript with module support

---

## Project Structure

```
ElimuCore/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx          # Top navigation bar with menu
│   │   │   └── Sidebar.jsx         # Sidebar navigation component
│   │   ├── Forms/
│   │   │   ├── StudentForm.jsx     # Student data entry form
│   │   │   └── TeacherForm.jsx     # Teacher data entry form
│   │   ├── UI/
│   │   │   └── Modal.jsx           # Reusable modal component
│   │   ├── Header.jsx              # Page header component
│   │   ├── SearchBar.jsx           # Search functionality
│   │   ├── StatsCard.jsx           # Statistics display card
│   │   └── TableActions.jsx        # Table row action buttons
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard with analytics
│   │   ├── Students.jsx            # Student management page
│   │   ├── Teachers.jsx            # Teacher management page
│   │   └── Grades.jsx              # Grade management and tracking
│   ├── hooks/
│   │   └── useSchoolData.js        # Custom hook for school data management
│   ├── data/                        # Data files and constants
│   ├── styles/                      # Global and component styles
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Application-wide styles
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint rules
├── package.json                     # Project dependencies
└── README.md                        # This file
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Goodie-g/ElimuCore.git
   cd ElimuCore
   ```

2. **Navigate to the project directory**
   ```bash
   cd ElimuCore
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - The application will typically run at `http://localhost:5173`
   - Vite's HMR (Hot Module Replacement) will automatically refresh changes

---

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot module replacement (HMR). Changes to your code will automatically reflect in the browser without a full page reload.

### `npm run build`
Creates an optimized production build. The build is minified and ready for deployment.

### `npm run preview`
Locally preview the production build. Useful for testing before deployment.

### `npm run lint`
Runs ESLint to check code quality and identify potential issues. Helps maintain code consistency across the project.

---

## Usage Guide

### Adding a Student
1. Click the **"Add Student"** button in the navigation bar
2. Fill in the student information in the modal form
3. Click **Submit** to add the student to the system

### Adding a Teacher
1. Click the **"Add Teacher"** button in the navigation bar
2. Fill in the teacher information in the modal form
3. Click **Submit** to add the teacher to the system

### Navigating the Application
- Use the **Sidebar** to switch between different pages (Dashboard, Students, Teachers, Grades)
- Use the **Navbar** menu button to toggle the sidebar on mobile devices
- Click the **Home** icon to return to the Dashboard

### Viewing Grades
- Navigate to the **Grades** page using the sidebar
- View grade information organized by subject and student
- Perform actions like editing or deleting grades using table action buttons

---

## Components Overview

### Layout Components
- **Navbar**: Main navigation bar with app branding, menu toggle, and action buttons
- **Sidebar**: Vertical navigation menu with links to different sections

### UI Components
- **Modal**: Reusable modal dialog for forms and confirmations
- **Header**: Page header with title and description
- **StatsCard**: Card component for displaying key statistics
- **SearchBar**: Input component for searching students/teachers
- **TableActions**: Action buttons for table rows (edit, delete, etc.)

### Form Components
- **StudentForm**: Validates and submits student data
- **TeacherForm**: Validates and submits teacher data

---

## Pages Overview

### Dashboard
The landing page displaying:
- Overall school statistics
- Student and teacher counts
- Academic performance summaries
- Quick access to recent activities

### Students
Complete student management interface:
- List of all students
- Add/edit/delete student information
- Search and filter capabilities
- Student details and performance tracking

### Teachers
Teacher management interface:
- Directory of all teaching staff
- Add/edit/delete teacher profiles
- Contact information
- Subject assignments

### Grades
Grade tracking and management system:
- Subject-wise grade organization
- Student performance metrics
- Grade entry and modification
- Performance analytics and reports

---

## Architecture

### Data Flow
1. **App.jsx** manages the main application state and routing
2. **useSchoolData()** custom hook handles all school data management
3. **Components** receive props and dispatch actions back to the hook
4. **Pages** compose multiple components to create full views

### State Management
ElimuCore uses React hooks for state management:
- `useState` for local component state
- `useSchoolData` custom hook for global school data
- Modal states for form dialogs

### Styling
- **Tailwind CSS** for utility-based styling
- **CSS Modules** for component-specific styles
- Responsive design using Tailwind breakpoints

---

## Contributing

We welcome contributions to ElimuCore! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style and structure
- Ensure all tests pass before submitting a PR
- Add meaningful commit messages
- Document any new features or significant changes
- Keep PRs focused on a single feature or fix

---

## License

This project is open source and available under the MIT License. See the LICENSE file for more details.

---

## Support & Contact

For questions, bug reports, or feature requests, please:
- Open an issue on the GitHub repository
- Contact the development team at [contact information]

---

## Roadmap

Future enhancements planned for ElimuCore:

- [ ] User authentication and role-based access control
- [ ] Database integration for persistent data storage
- [ ] Advanced reporting and analytics features
- [ ] Parent/Guardian portal for grade tracking
- [ ] Attendance management system
- [ ] Fee management module
- [ ] Mobile application
- [ ] API for third-party integrations
- [ ] Multi-language support

---

## Acknowledgments

- React and Vite communities for excellent tools
- Tailwind CSS for beautiful styling utilities
- React Router for seamless navigation
- All contributors and testers who help improve ElimuCore

---

**Happy Managing! 🎓** 

Built with ❤️ for educational institutions everywhere.
