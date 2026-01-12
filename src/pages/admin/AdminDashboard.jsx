import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import AdminHome from '../../components/admin/AdminHome'
import ManageJobs from '../../components/admin/ManageJobs'
import ManageUsers from '../../components/admin/ManageUsers'
import ManageResumes from '../../components/admin/ManageResumes'
import Analytics from '../../components/admin/Analytics'

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/jobs" element={<ManageJobs />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/resumes" element={<ManageResumes />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminDashboard


