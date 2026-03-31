import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute: Restricts access based on authentication and admin role
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();

  // Show loading spinner while auth state is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect non-admins if admin access required
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/candidate" replace />;
  }

  // Render children if access granted
  return children;
};

export default ProtectedRoute;

