import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaBuilding,
  FaStar,
  FaCheck,
  FaBookmark,
  FaShare,
  FaLaptopCode,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { getJob, getApplications, applyToJob, getCompany, mapJobToCard } from "../../api/client";

// Category tag color for job detail
const categoryTagColors = {
  Frontend: "bg-blue-100 text-blue-700 border border-blue-200",
  Backend: "bg-green-100 text-green-700 border border-green-200",
  "Full Stack": "bg-purple-100 text-purple-700 border border-purple-200",
  Cybersecurity: "bg-red-100 text-red-700 border border-red-200",
  "Data Engineer": "bg-amber-100 text-amber-700 border border-amber-200",
};

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;
    getJob(id)
      .then((raw) => {
        const card = mapJobToCard(raw, raw.company_id || "Company");
        setJob({ ...card, requiredSkills: raw.skills_required || [], benefits: [] });
        if (raw.company_id) {
          return getCompany(raw.company_id).then((co) => {
            setCompany(co ? {
              name: co.name || "Company",
              size: co.size || "N/A",
              industry: co.industry || "N/A",
              founded: co.founded || "N/A",
              website: co.website || "N/A",
              rating: 0,
              reviews: 0,
              description: co.description || "",
              culture: [],
            } : null);
          });
        }
        setCompany(null);
      })
      .catch(() => {
        setJob({
          id,
          title: "Job Not Found",
          company: "Unknown",
          location: "N/A",
          type: "N/A",
          salary: "N/A",
          posted: "N/A",
          workMode: "N/A",
          experience: "N/A",
          category: "N/A",
          description: "This job could not be found.",
          requiredSkills: [],
          benefits: [],
        });
        setCompany(null);
      });
  }, [id]);

  useEffect(() => {
    if (!user?.id || !id) return;
    getApplications(user.id)
      .then((r) => {
        const list = r.applications || r || [];
        setApplied(list.some((a) => a.job_id === id));
      })
      .catch(() => {});
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSaved(savedJobs.some((j) => String(j.id) === String(id)));
  }, [user?.id, id]);

  const handleApply = async () => {
    if (!job || applied || applying) return;
    setApplying(true);
    try {
      await applyToJob(id, "");
      setApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    if (saved) {
      const updated = savedJobs.filter((j) => j.id !== job.id);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setSaved(false);
    } else {
      savedJobs.push({ id: job.id, ...job, savedAt: new Date().toISOString() });
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setSaved(true);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary-600 hover:text-primary-800 font-medium"
      >
        &larr; Back to Jobs
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              {job.category && job.category !== "N/A" && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    categoryTagColors[job.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {job.category}
                </span>
              )}
            </div>
            <p className="text-xl text-gray-600 mb-4">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaBriefcase />
                {job.type}
              </span>
              <span className="flex items-center gap-1">
                <FaDollarSign />
                {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <FaClock />
                {job.posted}
              </span>
              <span className="flex items-center gap-1">
                <FaLaptopCode />
                {job.workMode}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveJob}
              className={`p-2 rounded-lg transition-colors ${
                saved ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaBookmark />
            </button>
            <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              <FaShare />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleApply}
            disabled={applied || applying}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              applied
                ? "bg-green-600 text-white"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            {applied ? (
              <>
                <FaCheck className="inline mr-2" />
                Applied
              </>
            ) : applying ? (
              "Applying..."
            ) : (
              "Apply Now"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <FaCheck className="text-green-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          {company && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 rounded-lg bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  {company.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  {company.rating > 0 && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="text-gray-600 text-sm">
                        {company.rating} ({company.reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <FaBuilding className="inline mr-2" />
                  {company.size}
                </p>
                <p>Industry: {company.industry}</p>
                <p>Founded: {company.founded}</p>
                <p className="pt-2">{company.description}</p>
              </div>
              {company.culture && company.culture.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Culture</p>
                  <div className="flex flex-wrap gap-1.5">
                    {company.culture.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                View Company Profile
              </button>
            </div>
          )}

          {/* Job Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Job Summary</h3>
            <div className="space-y-3 text-sm">
              {job.category && job.category !== "N/A" && (
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium">{job.category}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500">Experience:</span>
                <span className="ml-2 font-medium">{job.experience}</span>
              </div>
              <div>
                <span className="text-gray-500">Work Mode:</span>
                <span className="ml-2 font-medium">{job.workMode}</span>
              </div>
              <div>
                <span className="text-gray-500">Job Type:</span>
                <span className="ml-2 font-medium">{job.type}</span>
              </div>
              <div>
                <span className="text-gray-500">Salary:</span>
                <span className="ml-2 font-medium">{job.salary}</span>
              </div>
              <div>
                <span className="text-gray-500">Posted:</span>
                <span className="ml-2 font-medium">{job.posted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
