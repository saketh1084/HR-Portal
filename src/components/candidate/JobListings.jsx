import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaCode,
  FaServer,
  FaLayerGroup,
  FaShieldAlt,
  FaDatabase,
  FaThLarge,
  FaLaptopCode,
  FaFilter,
  FaBolt,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaRocket,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getJobs, getApplications, applyToJob, mapJobToCard } from "../../api/client";
import { categories } from "../../data/jobs";

// Map icon names to actual icon components
const iconMap = {
  FaThLarge: FaThLarge,
  FaCode: FaCode,
  FaServer: FaServer,
  FaLayerGroup: FaLayerGroup,
  FaShieldAlt: FaShieldAlt,
  FaDatabase: FaDatabase,
};

// Color styles for each category
const colorStyles = {
  gray: {
    active: "bg-gray-800 text-white shadow-lg shadow-gray-300",
    inactive: "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50",
    badge: "bg-gray-200 text-gray-700",
    activeBadge: "bg-gray-600 text-white",
  },
  blue: {
    active: "bg-blue-600 text-white shadow-lg shadow-blue-200",
    inactive: "bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    activeBadge: "bg-blue-500 text-white",
  },
  green: {
    active: "bg-green-600 text-white shadow-lg shadow-green-200",
    inactive: "bg-white text-green-700 border-2 border-green-200 hover:border-green-400 hover:bg-green-50",
    badge: "bg-green-100 text-green-700",
    activeBadge: "bg-green-500 text-white",
  },
  purple: {
    active: "bg-purple-600 text-white shadow-lg shadow-purple-200",
    inactive: "bg-white text-purple-700 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
    activeBadge: "bg-purple-500 text-white",
  },
  red: {
    active: "bg-red-600 text-white shadow-lg shadow-red-200",
    inactive: "bg-white text-red-700 border-2 border-red-200 hover:border-red-400 hover:bg-red-50",
    badge: "bg-red-100 text-red-700",
    activeBadge: "bg-red-500 text-white",
  },
  yellow: {
    active: "bg-amber-600 text-white shadow-lg shadow-amber-200",
    inactive: "bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    activeBadge: "bg-amber-500 text-white",
  },
};

// Category tag color for job cards
const categoryTagColors = {
  Frontend: "bg-blue-100 text-blue-700 border border-blue-200",
  Backend: "bg-green-100 text-green-700 border border-green-200",
  "Full Stack": "bg-purple-100 text-purple-700 border border-purple-200",
  Cybersecurity: "bg-red-100 text-red-700 border border-red-200",
  "Data Engineer": "bg-amber-100 text-amber-700 border border-amber-200",
};

// ============ AUTO APPLY CONFIRMATION MODAL ============
const AutoApplyModal = ({ job, profile, onConfirm, onCancel }) => {
  const [applying, setApplying] = useState(false);
  const [done, setDone] = useState(false);

  const handleConfirm = () => {
    setApplying(true);
    // Simulate brief processing
    setTimeout(() => {
      setApplying(false);
      setDone(true);
      setTimeout(() => {
        onConfirm();
      }, 800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <FaBolt className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Auto Apply</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Job Info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500">Applying to</p>
          <h4 className="font-semibold text-gray-900 text-lg">{job.title}</h4>
          <p className="text-gray-600">{job.company} &middot; {job.location}</p>
        </div>

        {/* Auto-filled Info */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Information from your profile
          </p>

          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <FaUser className="text-green-600 h-4 w-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-600 font-medium">Full Name</p>
                <p className="text-gray-900 font-medium truncate">{profile.fullName}</p>
              </div>
              <FaCheck className="text-green-500 h-3.5 w-3.5 flex-shrink-0" />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <FaEnvelope className="text-green-600 h-4 w-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-600 font-medium">Email</p>
                <p className="text-gray-900 font-medium truncate">{profile.email || "user@email.com"}</p>
              </div>
              <FaCheck className="text-green-500 h-3.5 w-3.5 flex-shrink-0" />
            </div>

            {/* Phone */}
            {profile.phone && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <FaUser className="text-green-600 h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-green-600 font-medium">Phone</p>
                  <p className="text-gray-900 font-medium truncate">{profile.phone}</p>
                </div>
                <FaCheck className="text-green-500 h-3.5 w-3.5 flex-shrink-0" />
              </div>
            )}

            {/* Resume / Experience */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <FaFileAlt className="text-green-600 h-4 w-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-600 font-medium">Resume & Experience</p>
                <p className="text-gray-900 font-medium truncate">
                  {profile.experience?.length > 0
                    ? `${profile.experience[0].position} at ${profile.experience[0].company}`
                    : profile.experienceLevel
                    ? `${profile.experienceLevel} level`
                    : "Profile data attached"}
                </p>
              </div>
              <FaCheck className="text-green-500 h-3.5 w-3.5 flex-shrink-0" />
            </div>

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3 mb-2">
                  <FaCode className="text-green-600 h-4 w-4 flex-shrink-0" />
                  <p className="text-xs text-green-600 font-medium">Skills</p>
                </div>
                <div className="flex flex-wrap gap-1.5 ml-7">
                  {profile.skills.slice(0, 6).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 6 && (
                    <span className="px-2 py-0.5 text-green-600 text-xs font-medium">
                      +{profile.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={applying || done}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={applying || done}
            className={`flex-1 px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              done
                ? "bg-green-600 text-white"
                : applying
                ? "bg-primary-500 text-white"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            {done ? (
              <>
                <FaCheck className="h-4 w-4" />
                Applied Successfully!
              </>
            ) : applying ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting Application...
              </>
            ) : (
              <>
                <FaRocket className="h-4 w-4" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ NO PROFILE WARNING MODAL ============
const NoProfileModal = ({ onClose, onGoToProfile }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
      <div className="px-6 py-8 text-center">
        <div className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <FaExclamationTriangle className="h-8 w-8 text-amber-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Required</h3>
        <p className="text-gray-600 mb-6">
          To use Auto Apply, you need to complete your profile first. 
          Your profile information will be used to auto-fill applications.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Later
          </button>
          <Link
            to="/candidate/profile"
            onClick={onGoToProfile}
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
          >
            Complete Profile
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// Filter jobs by category (match title or skills to category label)
const filterJobsByCategory = (jobsList, categoryId) => {
  if (!categoryId || categoryId === "all") return jobsList;
  const label = categories.find((c) => c.id === categoryId)?.label || "";
  if (!label) return jobsList;
  const lower = label.toLowerCase();
  return jobsList.filter(
    (j) =>
      (j.title && j.title.toLowerCase().includes(lower)) ||
      (j.skills && j.skills.some((s) => String(s).toLowerCase().includes(lower)))
  );
};

const getJobCountByCategory = (jobsList, categoryId) => {
  return filterJobsByCategory(jobsList, categoryId).length;
};

// ============ MAIN COMPONENT ============
const JobListings = () => {
  const { user } = useAuth();
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applyingJob, setApplyingJob] = useState(null);
  const [showNoProfile, setShowNoProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  // Load jobs and applications from API
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      getJobs(0, 100).then((r) => (cancelled ? [] : (r.jobs || r) || [])),
      user?.id ? getApplications(user.id).then((r) => (cancelled ? [] : r.applications || [])) : Promise.resolve([]),
    ])
      .then(([jobList, applications]) => {
        if (cancelled) return;
        const mapped = (Array.isArray(jobList) ? jobList : []).map((j) => mapJobToCard(j));
        setAllJobs(mapped);
        const appliedIds = new Set((applications || []).map((a) => a.job_id));
        setAppliedJobs(appliedIds);
      })
      .catch(() => {
        if (!cancelled) setAllJobs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user?.id]);

  useEffect(() => {
    setJobs(filterJobsByCategory(allJobs, activeCategory));
  }, [activeCategory, allJobs]);

  // Load profile and auto-apply preference from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile(null);
      }
    } else {
      setProfile({
        fullName: user?.email?.split("@")[0] || "User",
        headline: "",
        email: user?.email || "",
        phone: "",
        location: "",
        skills: [],
        experience: [],
        experienceLevel: "",
      });
    }
    const saved = localStorage.getItem("autoApplyEnabled");
    if (saved === "true") setAutoApplyEnabled(true);
  }, [user?.email]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const toggleAutoApply = () => {
    if (!autoApplyEnabled) {
      // Turning ON: check if profile exists
      if (!profile || !profile.fullName) {
        setShowNoProfile(true);
        return;
      }
      setAutoApplyEnabled(true);
      localStorage.setItem("autoApplyEnabled", "true");
      toast.success("Auto Apply enabled! Click Quick Apply to instantly apply.", {
        icon: "⚡",
        duration: 3000,
      });
    } else {
      setAutoApplyEnabled(false);
      localStorage.setItem("autoApplyEnabled", "false");
      toast("Auto Apply disabled", { icon: "🔒" });
    }
  };

  const handleQuickApply = (job) => {
    if (appliedJobs.has(job.id)) {
      toast("Already applied to this job!", { icon: "ℹ️" });
      return;
    }
    if (autoApplyEnabled && profile?.fullName) {
      setApplyingJob(job);
    } else if (autoApplyEnabled) {
      setShowNoProfile(true);
    } else {
      toast("Enable Auto Apply to instantly apply with your profile!", {
        icon: "💡",
        duration: 3000,
      });
    }
  };

  const confirmAutoApply = async () => {
    if (!applyingJob) return;
    const coverLetter = profile?.headline
      ? `I am ${profile.fullName}. ${profile.headline}`
      : "";
    try {
      await applyToJob(applyingJob.id, coverLetter);
      setAppliedJobs((prev) => new Set([...prev, applyingJob.id]));
      toast.success(`Applied to ${applyingJob.title} at ${applyingJob.company}!`, {
        duration: 4000,
      });
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to submit application");
    }
    setApplyingJob(null);
  };

  return (
    <div>
      {/* ============ AUTO APPLY BANNER ============ */}
      <div
        className={`mb-6 rounded-2xl p-5 transition-all duration-300 ${
          autoApplyEnabled
            ? "bg-gradient-to-r from-primary-600 via-blue-600 to-cyan-500 shadow-lg shadow-primary-200"
            : "bg-white border-2 border-dashed border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                autoApplyEnabled
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FaBolt className={`h-6 w-6 ${autoApplyEnabled ? "animate-pulse" : ""}`} />
            </div>
            <div>
              <h3
                className={`text-lg font-bold ${
                  autoApplyEnabled ? "text-white" : "text-gray-900"
                }`}
              >
                Auto Apply
              </h3>
              <p
                className={`text-sm ${
                  autoApplyEnabled ? "text-white/80" : "text-gray-500"
                }`}
              >
                {autoApplyEnabled
                  ? "Enabled — Click Quick Apply to instantly apply using your profile & resume"
                  : "Enable to apply instantly with your profile info — no forms to fill!"}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleAutoApply}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              autoApplyEnabled
                ? "bg-white text-primary-600 hover:bg-white/90 shadow-md"
                : "bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-200"
            }`}
          >
            {autoApplyEnabled ? (
              <>
                <FaToggleOn className="h-5 w-5" />
                <span>ON</span>
              </>
            ) : (
              <>
                <FaToggleOff className="h-5 w-5" />
                <span>Enable</span>
              </>
            )}
          </button>
        </div>

        {/* Auto Apply active info bar */}
        {autoApplyEnabled && profile && (
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <FaUser className="h-3 w-3" />
              {profile.fullName}
            </span>
            <span className="flex items-center gap-1.5">
              <FaEnvelope className="h-3 w-3" />
              {profile.email || "user@email.com"}
            </span>
            <span className="flex items-center gap-1.5">
              <FaFileAlt className="h-3 w-3" />
              Resume attached
            </span>
            <span className="flex items-center gap-1.5">
              <FaCode className="h-3 w-3" />
              {profile.skills?.length || 0} skills
            </span>
          </div>
        )}
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explore Job Opportunities
        </h1>
        <p className="text-gray-500 text-lg">
          Browse jobs by category — click a button to filter instantly
        </p>
      </div>

      {/* Category Buttons */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-gray-400" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Filter by Category
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = iconMap[cat.icon];
            const style = colorStyles[cat.color];
            const jobCount = getJobCountByCategory(allJobs, cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-xl font-medium 
                  transition-all duration-200 transform
                  ${isActive ? style.active + " scale-105" : style.inactive}
                `}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{cat.label}</span>
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? style.activeBadge : style.badge
                  }`}
                >
                  {jobCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">{jobs.length}</span>{" "}
          {activeCategory === "all" ? "" : activeCategory + " "}
          job{jobs.length !== 1 ? "s" : ""}
        </p>
        {activeCategory !== "all" && (
          <button
            onClick={() => setActiveCategory("all")}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium underline underline-offset-2"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        /* Job Cards */
        <div className="grid gap-5">
          {jobs.map((job) => {
            const isApplied = appliedJobs.has(job.id);

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Job Title & Category Tag */}
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categoryTagColors[job.category]
                        }`}
                      >
                        {job.category}
                      </span>
                    </div>

                    {/* Company */}
                    <p className="text-lg text-gray-600 mb-3">{job.company}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBriefcase className="text-gray-400" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaDollarSign className="text-gray-400" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-gray-400" />
                        {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaLaptopCode className="text-gray-400" />
                        {job.workMode}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-6 flex flex-col gap-2 flex-shrink-0">
                    <Link
                      to={`/candidate/job/${job.id}`}
                      className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center font-medium transition-colors"
                    >
                      View Details
                    </Link>

                    {/* Quick Apply / Auto Apply Button */}
                    {isApplied ? (
                      <button
                        disabled
                        className="px-6 py-2.5 bg-green-100 text-green-700 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default"
                      >
                        <FaCheck className="h-3.5 w-3.5" />
                        Applied
                      </button>
                    ) : autoApplyEnabled ? (
                      <button
                        onClick={() => handleQuickApply(job)}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 font-medium transition-all flex items-center justify-center gap-2 shadow-sm shadow-amber-200"
                      >
                        <FaBolt className="h-3.5 w-3.5" />
                        Quick Apply
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickApply(job)}
                        className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                      >
                        Quick Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {jobs.length === 0 && !loading && (
            <div className="text-center py-16">
              <FaLaptopCode className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No jobs found
              </h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      )}

      {/* Auto Apply Confirmation Modal */}
      {applyingJob && profile && (
        <AutoApplyModal
          job={applyingJob}
          profile={profile}
          onConfirm={confirmAutoApply}
          onCancel={() => setApplyingJob(null)}
        />
      )}

      {/* No Profile Warning Modal */}
      {showNoProfile && (
        <NoProfileModal
          onClose={() => setShowNoProfile(false)}
          onGoToProfile={() => setShowNoProfile(false)}
        />
      )}
    </div>
  );
};

export default JobListings;
