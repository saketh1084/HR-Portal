import { useState, useEffect } from "react";
import { FaCheckCircle, FaEye, FaUserCheck, FaTimesCircle, FaClock, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getApplications, getJob } from "../../api/client";

const ApplicationTracking = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user?.id) {
      setApplications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getApplications(user.id)
      .then(async (res) => {
        const list = res.applications || res || [];
        const withTitles = await Promise.all(
          list.map(async (app) => {
            try {
              const job = await getJob(app.job_id);
              return {
                id: app.id,
                jobId: app.job_id,
                jobTitle: job?.title || "Job",
                company: "Company",
                appliedAt: app.applied_at,
                lastUpdated: app.updated_at || app.applied_at,
                status: app.status,
              };
            } catch {
              return {
                id: app.id,
                jobId: app.job_id,
                jobTitle: "Job",
                company: "—",
                appliedAt: app.applied_at,
                lastUpdated: app.updated_at || app.applied_at,
                status: app.status,
              };
            }
          })
        );
        setApplications(withTitles);
      })
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "applied":
        return <FaClock className="text-blue-500" />;
      case "viewed":
      case "interview":
        return <FaEye className="text-purple-500" />;
      case "shortlisted":
      case "offered":
        return <FaUserCheck className="text-green-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaCheckCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "viewed":
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "shortlisted":
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredApplications =
    filter === "all"
      ? applications
      : filter === "viewed"
        ? applications.filter((app) => app.status === "viewed" || app.status === "interview")
        : filter === "shortlisted"
          ? applications.filter((app) => app.status === "shortlisted" || app.status === "offered")
          : applications.filter((app) => app.status === filter);

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    viewed: applications.filter((a) => a.status === "viewed" || a.status === "interview").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted" || a.status === "offered").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const withdrawApplication = (id) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      // API does not have withdraw endpoint; we only update local state
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Application Tracking</h1>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
          <div className="text-sm text-blue-600">Applied</div>
        </div>
        <div className="bg-purple-50 rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.viewed}</div>
          <div className="text-sm text-purple-600">Viewed</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
          <div className="text-sm text-green-600">Shortlisted</div>
        </div>
        <div className="bg-red-50 rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-red-600">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("applied")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "applied"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Applied ({stats.applied})
          </button>
          <button
            onClick={() => setFilter("viewed")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "viewed"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Viewed ({stats.viewed})
          </button>
          <button
            onClick={() => setFilter("shortlisted")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "shortlisted"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Shortlisted ({stats.shortlisted})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaFileAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No applications found for this filter.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(application.status)}
                    <Link
                      to={`/candidate/job/${application.jobId}`}
                      className="text-xl font-semibold text-primary-600 hover:text-primary-800"
                    >
                      {application.jobTitle}
                    </Link>
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{application.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Applied: {formatDate(application.appliedAt)}</span>
                    <span>Last Updated: {formatDate(application.lastUpdated)}</span>
                  </div>
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/candidate/job/${application.jobId}`}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center text-sm"
                  >
                    View Job
                  </Link>
                  {application.status !== "rejected" && (
                    <button
                      onClick={() => withdrawApplication(application.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationTracking;


