import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaChartBar,
  FaSignOutAlt,
  FaUser,
  FaUserTie,
} from 'react-icons/fa'

const AdminLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="text-2xl font-bold text-primary-600">
                JobsPortal Admin
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Switch to Candidate View */}
              <Link
                to="/candidate"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600"
                title="Switch to Candidate View"
              >
                <FaUserTie />
                <span>Candidate View</span>
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title="Logout"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/admin') || isActive('/admin/')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/jobs"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/admin/jobs')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBriefcase className="h-5 w-5" />
              <span>Manage Jobs</span>
            </Link>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/admin/users')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaUsers className="h-5 w-5" />
              <span>Manage Users</span>
            </Link>
            <Link
              to="/admin/resumes"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/admin/resumes')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaFileAlt className="h-5 w-5" />
              <span>Manage Resumes</span>
            </Link>
            <Link
              to="/admin/analytics"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/admin/analytics')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaChartBar className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout


