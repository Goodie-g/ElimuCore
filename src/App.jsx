import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Modal from './components/UI/Modal'
import Toasts from './components/UI/Toasts'
import StudentForm from './components/Forms/StudentForm'
import TeacherForm from './components/Forms/TeacherForm'
import { useSchoolData } from './hooks/useSchoolData'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const schoolData = useSchoolData()

  return (
    <div className="app">
      <Navbar
        onMenuClick={() => setSidebarOpen((s) => !s)}
        onAddStudent={schoolData.openAddStudent}
        onAddTeacher={schoolData.openAddTeacher}
      />

      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onReset={schoolData.resetData} />
        {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

        <main className="content-area">
          <div className="container">
            <Outlet context={schoolData} />
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

      <Toasts toasts={schoolData.toasts} onDismiss={schoolData.dismissToast} />
    </div>
  )
}

export default App
