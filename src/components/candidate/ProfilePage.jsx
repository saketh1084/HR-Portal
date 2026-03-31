import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaPen,
  FaPlus,
  FaCheck,
  FaEye,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaCamera,
  FaEllipsisH,
  FaUserFriends,
  FaBookmark,
  FaChevronRight,
  FaLock,
  FaStar,
  FaCertificate,
  FaTrophy,
} from "react-icons/fa";
import toast from "react-hot-toast";

// Accessibility: Add ARIA attributes and semantic HTML where possible

// Default profile data (used when no saved profile exists)
const defaultProfile = {
  fullName: "Pujitha Kamatam",
  headline: "Full Stack Developer | React | Node.js | Python",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate software developer with 4+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions. Currently exploring opportunities in full-stack development and cloud architecture.",
  email: "pujitha@email.com",
  connections: 487,
  profileViews: 142,
  searchAppearances: 38,
  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Git",
    "Tailwind CSS",
    "GraphQL",
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      duration: "Jan 2023 - Present",
      description:
        "Leading frontend development for the company's flagship SaaS product. Built a component library used by 5 teams, improving development speed by 40%.",
      logo: "T",
      current: true,
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "Jun 2021 - Dec 2022",
      description:
        "Developed and maintained multiple microservices using Node.js and React. Implemented CI/CD pipelines reducing deployment time by 60%.",
      logo: "S",
      current: false,
    },
    {
      company: "Digital Agency Co.",
      position: "Junior Web Developer",
      duration: "Aug 2019 - May 2021",
      description:
        "Built responsive websites and web applications for 20+ clients. Introduced modern frontend practices including React and Tailwind CSS.",
      logo: "D",
      current: false,
    },
  ],
  education: [
    {
      degree: "Master's",
      field: "Computer Science",
      university: "Stanford University",
      year: "2019",
      logo: "S",
    },
    {
      degree: "Bachelor's",
      field: "Information Technology",
      university: "University of California, Berkeley",
      year: "2017",
      logo: "U",
    },
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
    { name: "Meta Frontend Developer Professional Certificate", issuer: "Meta", year: "2023" },
    { name: "Google Cloud Digital Leader", issuer: "Google", year: "2023" },
  ],
  preferredJobRole: "Senior Full Stack Developer",
  preferredSalary: "$120k - $160k",
  experienceLevel: "senior",
  workMode: "hybrid",
  profileVisibility: "public",
  openToWork: true,
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(null); // which section is being edited
  const [editBio, setEditBio] = useState("");
  const [editHeadline, setEditHeadline] = useState("");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);

  // Accessibility: Use semantic HTML and ARIA roles for main sections
  // Example: <main role="main">, <section aria-labelledby="profile-heading">

  useEffect(() => {
    // Load profile from localStorage or use default
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      // Merge with defaults to fill any missing fields
      setProfile({ ...defaultProfile, ...parsed, email: user?.email || defaultProfile.email });
    } else {
      setProfile({ ...defaultProfile, email: user?.email || defaultProfile.email });
    }
  }, [user]);

  const saveProfile = (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));
    toast.success("Profile updated!");
    setEditing(null);
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const displayedSkills = showAllSkills ? profile.skills : profile.skills?.slice(0, 6);
  const displayedExp = showAllExp ? profile.experience : profile.experience?.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* ============ INTRO CARD (LinkedIn-style) ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-primary-600 via-blue-500 to-cyan-400">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-60"></div>
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
            <FaCamera className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <div className="h-36 w-36 rounded-full border-4 border-white bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {profile.fullName?.[0]?.toUpperCase() || "U"}
              </div>
              {profile.openToWork && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow">
                  OPEN TO WORK
                </div>
              )}
              <button className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-50 border">
                <FaCamera className="h-3 w-3 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Name & Details */}
          <div className="pt-20 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.fullName}
                </h1>
                <span className="text-primary-600">
                  <FaCheck className="h-4 w-4" />
                </span>
              </div>

              {/* Headline */}
              {editing === "headline" ? (
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => saveProfile({ headline: editHeadline })}
                    className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 mt-1 text-lg">{profile.headline}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {profile.location}
                </span>
                <span className="text-gray-300">|</span>
                <button className="text-primary-600 font-medium hover:underline">
                  Contact info
                </button>
                <span className="text-gray-300">|</span>
                <span className="text-primary-600 font-medium">
                  {profile.connections || 487}+ connections
                </span>
              </div>

              {/* Current Company */}
              {profile.experience?.[0] && (
                <p className="text-sm text-gray-500 mt-1">
                  <FaBriefcase className="inline mr-1 text-gray-400" />
                  {profile.experience[0].position} at {profile.experience[0].company}
                </p>
              )}
              {profile.education?.[0] && (
                <p className="text-sm text-gray-500 mt-0.5">
                  <FaGraduationCap className="inline mr-1 text-gray-400" />
                  {profile.education[0].university}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-end gap-2 ml-4">
              <button
                onClick={() => {
                  setEditing("headline");
                  setEditHeadline(profile.headline || "");
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit intro"
              >
                <FaPen className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Open to Work Banner */}
          {profile.openToWork && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900 text-sm">Open to work</p>
                <p className="text-blue-700 text-xs mt-0.5">
                  {profile.preferredJobRole || "Full Stack Developer"} roles &middot; {profile.workMode === "remote" ? "Remote" : profile.workMode === "hybrid" ? "Hybrid" : "On-site/Remote"}
                </p>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                Show details <FaChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex gap-2 mt-4">
            <button className="px-5 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors text-sm">
              Open to
            </button>
            <button className="px-5 py-2 border-2 border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors text-sm">
              Add profile section
            </button>
            <button className="px-5 py-2 border-2 border-gray-300 text-gray-600 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm">
              More
            </button>
          </div>
        </div>
      </div>

      {/* ============ ANALYTICS CARD ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Analytics</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <FaEye className="h-3 w-3" />
          <span>Private to you</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <FaUserFriends className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-900">{profile.profileViews || 142} profile views</p>
              <p className="text-sm text-gray-500">Discover who's viewed your profile.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <FaBookmark className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-900">{profile.searchAppearances || 38} search appearances</p>
              <p className="text-sm text-gray-500">See how often you appear in search.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <FaStar className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-900">12 post impressions</p>
              <p className="text-sm text-gray-500">Check out who's engaging with your posts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ ABOUT SECTION ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">About</h2>
          <button
            onClick={() => {
              setEditing("bio");
              setEditBio(profile.bio || "");
            }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaPen className="h-4 w-4" />
          </button>
        </div>
        {editing === "bio" ? (
          <div className="space-y-3">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={4}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => saveProfile({ bio: editBio })}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {profile.bio}
          </p>
        )}
      </div>

      {/* ============ EXPERIENCE SECTION ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPlus className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPen className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-0">
          {displayedExp?.map((exp, idx) => (
            <div key={idx} className={`flex gap-4 ${idx !== 0 ? "pt-5" : ""} ${idx !== displayedExp.length - 1 ? "pb-5 border-b border-gray-100" : ""}`}>
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg border">
                  {exp.logo || exp.company?.[0] || "C"}
                </div>
              </div>
              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 text-sm">{exp.company}</p>
                <p className="text-gray-500 text-sm">{exp.duration}</p>
                {exp.current && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Current
                  </span>
                )}
                {exp.description && (
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        {profile.experience?.length > 2 && (
          <button
            onClick={() => setShowAllExp(!showAllExp)}
            className="mt-4 w-full text-center text-gray-500 hover:text-gray-700 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {showAllExp
              ? "Show less"
              : `Show all ${profile.experience.length} experiences`}
          </button>
        )}
      </div>

      {/* ============ EDUCATION SECTION ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Education</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPlus className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPen className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-0">
          {profile.education?.map((edu, idx) => (
            <div key={idx} className={`flex gap-4 ${idx !== 0 ? "pt-5" : ""} ${idx !== profile.education.length - 1 ? "pb-5 border-b border-gray-100" : ""}`}>
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg border">
                  <FaGraduationCap className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{edu.university}</h3>
                <p className="text-gray-700 text-sm">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ CERTIFICATIONS & LICENSES ============ */}
      {profile.certifications?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Licenses & Certifications</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPlus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-0">
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className={`flex gap-4 ${idx !== 0 ? "pt-5" : ""} ${idx !== profile.certifications.length - 1 ? "pb-5 border-b border-gray-100" : ""}`}>
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
                    <FaCertificate className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700 text-sm">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">Issued {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ SKILLS SECTION ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPlus className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <FaPen className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {displayedSkills?.map((skill, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <FaCode className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">{skill}</span>
              </div>
              <button className="text-primary-600 text-sm font-medium hover:underline">
                Endorse
              </button>
            </div>
          ))}
        </div>
        {profile.skills?.length > 6 && (
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="mt-4 w-full text-center text-gray-500 hover:text-gray-700 text-sm font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {showAllSkills
              ? "Show less"
              : `Show all ${profile.skills.length} skills`}
          </button>
        )}
      </div>

      {/* ============ PREFERENCES CARD ============ */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Job Preferences</h2>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaLock className="h-3 w-3" />
            <span>Only visible to you</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Desired Role</p>
            <p className="font-medium text-gray-900">
              {profile.preferredJobRole || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Expected Salary</p>
            <p className="font-medium text-gray-900">
              {profile.preferredSalary || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Experience Level</p>
            <p className="font-medium text-gray-900 capitalize">
              {profile.experienceLevel || "Not specified"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Work Mode</p>
            <p className="font-medium text-gray-900 capitalize">
              {profile.workMode || "Any"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
