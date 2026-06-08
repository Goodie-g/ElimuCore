import React, { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Teachers from './pages/Teachers'
import Students from './pages/Students'
import Grades from './pages/Grades'
import { useSchoolData } from './hooks/useSchoolData'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const schoolData = useSchoolData()

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard schoolData={schoolData} />
      case 'teachers':
        return <Teachers schoolData={schoolData} />
      case 'students':
        return <Students schoolData={schoolData} />
      case 'grades':
        return <Grades />
      default:
        return <Dashboard schoolData={schoolData} />
    }
  }

  return (
    <div className="app">
      <Navbar 
        activeTab={activeTab} 
        onMenuClick={() => setSidebarOpen((s) => !s)}
        onAddStudent={schoolData.openAddStudent}
        onAddTeacher={schoolData.openAddTeacher}
      />
      
      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div className="backdrop" onClick={() => setSidebarOpen(false)} />
        )}
        
        <main className="content-area">
          <div className="container">
            {renderPage()}
          </div>
        </main>
      </div>

      
    </div>
  )
}

export default App