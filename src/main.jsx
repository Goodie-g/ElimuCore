import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Dashboard from './pages/Dashboard'
import Teachers from './pages/Teachers'
import Students from './pages/Students'
import Grades from './pages/Grades'
import Attendance from './pages/Attendance'
import './index.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/table.css'
import './styles/dashboard.css'
import './styles/attendance.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'teachers', element: <Teachers /> },
      { path: 'students', element: <Students /> },
      { path: 'grades', element: <Grades /> },
      { path: 'attendance', element: <Attendance /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
