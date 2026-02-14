import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  FaMapMarkerAlt,
  FaEye,
  FaUserFriends,
  FaBookmark,
  FaBriefcase,
} from "react-icons/fa";

const CandidateLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Load profile for sidebar card
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Default mini profile
      setProfile({
        fullName: "Pujitha Kamatam",
        headline: "Full Stack Developer | React | Node.js",
        location: "San Francisco, CA",
        connections: 487,
        profileViews: 142,
        openToWork: true,
      });
    }
  }, [location]); // re-read when navigating (in case profile was edited)

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <Link
                to="/candidate"
                className="text-2xl font-bold text-primary-600"
              >
                JobsPortal
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, companies..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                  onClick={() => navigate("/candidate/search")}
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-1">
              {/* Home */}
              <Link
                to="/candidate"
                className={`flex flex-col items-center px-3 py-1 text-xs ${
                  isActive("/candidate") || isActive("/candidate/")
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaHome className="h-5 w-5 mb-0.5" />
                <span>Home</span>
              </Link>

              {/* My Network */}
              <Link
                to="/candidate/profile"
                className={`flex flex-col items-center px-3 py-1 text-xs ${
                  isActive("/candidate/profile")
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaUser className="h-5 w-5 mb-0.5" />
                <span>Me</span>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex flex-col items-center px-3 py-1 text-xs text-gray-500 hover:text-gray-700 relative"
                >
                  <FaBell className="h-5 w-5 mb-0.5" />
                  <span>Alerts</span>
                  <span className="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 text-sm text-gray-600">
                      <p className="font-medium text-gray-900 mb-2">Notifications</p>
                      <p className="text-gray-500">Click on Notifications in sidebar to see all.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Chatbot */}
              <Link
                to="/candidate/chatbot"
                className="flex flex-col items-center px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
              >
                <FaRobot className="h-5 w-5 mb-0.5" />
                <span>AI</span>
              </Link>

              {/* Admin Switch */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex flex-col items-center px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                  title="Switch to Admin View"
                >
                  <FaUserShield className="h-5 w-5 mb-0.5" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Divider */}
              <div className="h-8 w-px bg-gray-200 mx-2"></div>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold">
                  {profile?.fullName?.[0]?.toUpperCase() ||
                    user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto flex gap-5 px-4 sm:px-6 lg:px-8 py-5">
        {/* ========== LEFT SIDEBAR ========== */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-4">
            {/* Mini LinkedIn Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Mini Cover */}
              <div className="h-16 bg-gradient-to-r from-primary-600 via-blue-500 to-cyan-400 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60"></div>
              </div>

              {/* Avatar & Info */}
              <div className="relative px-4 pb-4">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Link to="/candidate/profile">
                    <div className="h-16 w-16 rounded-full border-3 border-white bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                      {profile?.fullName?.[0]?.toUpperCase() ||
                        user?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  </Link>
                </div>
                <div className="pt-10 text-center">
                  <Link
                    to="/candidate/profile"
                    className="font-semibold text-gray-900 hover:underline hover:text-primary-600 transition-colors"
                  >
                    {profile?.fullName || user?.email || "User"}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {profile?.headline || "Add a headline"}
                  </p>
                  {profile?.location && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                      <FaMapMarkerAlt className="h-2.5 w-2.5" />
                      {profile.location}
                    </p>
                  )}
                </div>

                {/* Stats Row */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to="/candidate/profile"
                    className="flex justify-between items-center text-xs hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded transition-colors"
                  >
                    <span className="text-gray-500">Profile viewers</span>
                    <span className="font-semibold text-primary-600">
                      {profile?.profileViews || 142}
                    </span>
                  </Link>
                  <Link
                    to="/candidate/profile"
                    className="flex justify-between items-center text-xs hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded transition-colors"
                  >
                    <span className="text-gray-500">Connections</span>
                    <span className="font-semibold text-primary-600">
                      {profile?.connections || 487}
                    </span>
                  </Link>
                </div>

                {/* Open to Work */}
                {profile?.openToWork && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Open to work</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="p-2 space-y-0.5">
                <Link
                  to="/candidate"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate") || isActive("/candidate/")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaHome className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/candidate/profile"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/profile")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaUser className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/candidate/search"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/search")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaSearch className="h-4 w-4" />
                  <span>Search Jobs</span>
                </Link>
                <Link
                  to="/candidate/applications"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/applications")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaFileAlt className="h-4 w-4" />
                  <span>My Applications</span>
                </Link>
                <Link
                  to="/candidate/notifications"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/notifications")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaBell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
                <Link
                  to="/candidate/chatbot"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/chatbot")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaRobot className="h-4 w-4" />
                  <span>AI Assistant</span>
                </Link>
                <Link
                  to="/candidate/upload-resume"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive("/candidate/upload-resume")
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaUpload className="h-4 w-4" />
                  <span>Upload Resume</span>
                </Link>
              </nav>
            </div>

            {/* Saved Items Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-600 cursor-pointer transition-colors">
                <FaBookmark className="h-4 w-4" />
                <span className="font-medium">My saved jobs</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default CandidateLayout;
