import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";

const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching jobs
    setTimeout(() => {
      setJobs([
        {
          id: 1,
          title: 'Senior Full Stack Developer',
          company: 'Tech Corp',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$120k - $150k',
          posted: '2 days ago',
          description: "We are looking for an experienced full stack developer...",
          workMode: "Hybrid",
          experience: "5-8 years",
          skills: ["React", "Node.js", "MongoDB"],
        },
        {
          id: 2,
          title: 'React Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          type: 'Full-time',
          salary: '$90k - $120k',
          posted: '5 days ago',
          description: "Join our team to build amazing React applications...",
          workMode: "Remote",
          experience: "2-5 years",
          skills: ["React", "JavaScript", "TypeScript"],
        },
        {
          id: 3,
          title: 'Frontend Engineer',
          company: 'Design Co',
          location: 'New York, NY',
          type: 'Contract',
          salary: '$80k - $100k',
          posted: '1 week ago',
          description: "Looking for a talented frontend engineer...",
          workMode: "On-site",
          experience: "3-5 years",
          skills: ["Vue.js", "CSS", "HTML"],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Listings</h1>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h2>
                <p className="text-lg text-gray-600 mb-3">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
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
                <p className="text-gray-700 mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <Link
                  to={`/candidate/job/${job.id}`}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center"
                >
                  View Details
                </Link>
                <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Quick Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobListings

