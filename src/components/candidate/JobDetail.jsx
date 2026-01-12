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
  FaTimes,
  FaBookmark,
  FaShare,
} from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Simulate fetching job details
    const mockJob = {
      id: parseInt(id),
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      workMode: "Hybrid",
      experience: "5-8 years",
      description: `
        We are looking for an experienced Full Stack Developer to join our dynamic team. 
        You will be responsible for developing and maintaining web applications using modern technologies.
        
        **Key Responsibilities:**
        - Design and develop scalable web applications
        - Collaborate with cross-functional teams
        - Write clean, maintainable code
        - Participate in code reviews
        - Troubleshoot and debug applications
        
        **Requirements:**
        - 5+ years of experience in full stack development
        - Strong knowledge of React, Node.js, and MongoDB
        - Experience with cloud platforms (AWS, Azure)
        - Excellent problem-solving skills
        - Strong communication skills
      `,
      requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "TypeScript", "AWS"],
      benefits: [
        "Health Insurance",
        "401(k) Matching",
        "Remote Work Options",
        "Flexible Hours",
        "Professional Development",
      ],
    };

    const mockCompany = {
      name: "Tech Corp",
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2010",
      website: "www.techcorp.com",
      rating: 4.5,
      reviews: 234,
      description:
        "Tech Corp is a leading technology company focused on innovation and excellence. We provide cutting-edge solutions to clients worldwide.",
      culture: ["Innovative", "Collaborative", "Fast-paced", "Growth-oriented"],
    };

    setJob(mockJob);
    setCompany(mockCompany);
  }, [id]);

  const handleApply = () => {
    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    const newApplication = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      status: "applied",
    };
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));
    setApplied(true);
    alert("Application submitted successfully!");
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
        className="mb-4 text-primary-600 hover:text-primary-800"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
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
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveJob}
              className={`p-2 rounded-lg ${
                saved ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaBookmark />
            </button>
            <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
              <FaShare />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`flex-1 px-6 py-3 rounded-lg font-medium ${
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
            ) : (
              "Apply Now"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <FaCheck className="text-green-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-lg bg-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                {company.name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="text-gray-600 text-sm">{company.rating} ({company.reviews})</span>
                </div>
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
            <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              View Company Profile
            </button>
          </div>

          {/* Job Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Job Summary</h3>
            <div className="space-y-3 text-sm">
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


