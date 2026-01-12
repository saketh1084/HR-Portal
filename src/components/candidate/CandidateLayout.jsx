import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  FaSearch,
  FaBell,
  FaRobot,
  FaUpload,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
  FaFileAlt,
} from "react-icons/fa";

const CandidateLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)

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
              <Link to="/candidate" className="text-2xl font-bold text-primary-600">
                JobsPortal
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, profiles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => navigate('/candidate/search')}
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-primary-600"
                >
                  <FaBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <Notifications />
                  </div>
                )}
              </div>

              {/* Chatbot */}
              <Link
                to="/candidate/chatbot"
                className="p-2 text-gray-600 hover:text-primary-600"
              >
                <FaRobot className="h-5 w-5" />
              </Link>

              {/* Upload Resume */}
              <Link
                to="/candidate/upload-resume"
                className="p-2 text-gray-600 hover:text-primary-600"
              >
                <FaUpload className="h-5 w-5" />
              </Link>

              {/* Admin Switch */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="p-2 text-gray-600 hover:text-primary-600"
                  title="Switch to Admin View"
                >
                  <FaUserShield className="h-5 w-5" />
                </Link>
              )}

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
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

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/candidate"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/candidate') || isActive('/candidate/')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/candidate/search"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/candidate/search')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaSearch className="h-5 w-5" />
              <span>Search</span>
            </Link>
            <Link
              to="/candidate/notifications"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/candidate/notifications')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaBell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
            <Link
              to="/candidate/chatbot"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive('/candidate/chatbot')
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaRobot className="h-5 w-5" />
              <span>AI Assistant</span>
            </Link>
            <Link
              to="/candidate/applications"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive("/candidate/applications")
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaFileAlt className="h-5 w-5" />
              <span>My Applications</span>
            </Link>
            <Link
              to="/candidate/upload-resume"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive("/candidate/upload-resume")
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaUpload className="h-5 w-5" />
              <span>Upload Resume</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default CandidateLayout

