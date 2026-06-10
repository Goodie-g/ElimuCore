import { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Modal from './components/UI/Modal'
import StudentForm from './components/Forms/StudentForm'
import TeacherForm from './components/Forms/TeacherForm'
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
        return <Grades schoolData={schoolData} />
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
        onGoHome={() => {
          setActiveTab('dashboard')
          setSidebarOpen(false)
        }}
      />
      
      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}
        
        <main className="content-area">
          <div className="container">
            {renderPage()}
          </div>
        </main>
      </div>

      <Modal isOpen={schoolData.studentModalOpen} onClose={schoolData.closeAddStudent}>
        <h3 className="modal-title">{schoolData.editingStudent ? 'Edit Student' : 'Add Student'}</h3>
        <StudentForm
          initialValues={schoolData.editingStudent}
          isEditing={Boolean(schoolData.editingStudent)}
          onSubmit={schoolData.saveStudent}
          onCancel={schoolData.closeAddStudent}
        />
      </Modal>

      <Modal isOpen={schoolData.teacherModalOpen} onClose={schoolData.closeAddTeacher}>
        <h3 className="modal-title">{schoolData.editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h3>
        <TeacherForm
          initialValues={schoolData.editingTeacher}
          isEditing={Boolean(schoolData.editingTeacher)}
          onSubmit={schoolData.saveTeacher}
          onCancel={schoolData.closeAddTeacher}
        />
      </Modal>
    </div>
  )
}

export default App
