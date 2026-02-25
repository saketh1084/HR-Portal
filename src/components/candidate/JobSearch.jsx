import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaFilter, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { searchJobs, mapJobToCard } from "../../api/client";

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const params = {};
      if (searchQuery) params.keyword = searchQuery;
      if (location) params.location = location;
      if (jobType) params.employment_type = jobType;
      if (experienceLevel) params.experience_level = experienceLevel;
      if (workMode) params.employment_type = workMode || params.employment_type;
      if (salaryRange) {
        const [min, max] = salaryRange.split("-").map((x) => parseInt(x, 10));
        if (!isNaN(min)) params.salary_min = min;
        if (max && !isNaN(max)) params.salary_max = max;
      }
      const data = await searchJobs(params);
      const list = data.jobs || data.results || data || [];
      let mapped = Array.isArray(list) ? list.map((j) => mapJobToCard(j)) : [];
      if (sortBy === "date") {
        mapped = [...mapped].sort((a, b) => (b.posted || "").localeCompare(a.posted || ""));
      } else if (sortBy === "salary-high") {
        mapped = [...mapped].sort((a, b) => {
          const aNum = parseInt(String(a.salary).replace(/\D/g, ""), 10) || 0;
          const bNum = parseInt(String(b.salary).replace(/\D/g, ""), 10) || 0;
          return bNum - aNum;
        });
      } else if (sortBy === "salary-low") {
        mapped = [...mapped].sort((a, b) => {
          const aNum = parseInt(String(a.salary).replace(/\D/g, ""), 10) || 0;
          const bNum = parseInt(String(b.salary).replace(/\D/g, ""), 10) || 0;
          return aNum - bNum;
        });
      }
      setSearchResults(mapped);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const saveSearch = () => {
    const searchCriteria = {
      id: Date.now(),
      query: searchQuery,
      location,
      jobType,
      experienceLevel,
      salaryRange,
      workMode,
      createdAt: new Date().toLocaleDateString(),
    };
    setSavedSearches([...savedSearches, searchCriteria]);
    alert("Search saved successfully!");
  };

  const loadSavedSearch = (search) => {
    setSearchQuery(search.query);
    setLocation(search.location);
    setJobType(search.jobType);
    setExperienceLevel(search.experienceLevel);
    setSalaryRange(search.salaryRange);
    setWorkMode(search.workMode);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Job Search</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          <FaFilter />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by keywords, skills, job title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-70"
          >
            {searching ? "Searching..." : "Search"}
          </button>
          <button
            onClick={saveSearch}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            title="Save this search"
          >
            <FaBookmark />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="City, State or Remote"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm appearance-none"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="fresher">Fresher (0-1 years)</option>
                <option value="junior">Junior (1-3 years)</option>
                <option value="mid">Mid-level (3-5 years)</option>
                <option value="senior">Senior (5-8 years)</option>
                <option value="lead">Lead (8+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Mode
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
              >
                <option value="">Any</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                >
                  <option value="">Any Salary</option>
                  <option value="0-50">$0 - $50k</option>
                  <option value="50-80">$50k - $80k</option>
                  <option value="80-120">$80k - $120k</option>
                  <option value="120-150">$120k - $150k</option>
                  <option value="150+">$150k+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date Posted (Newest)</option>
                <option value="salary-high">Salary (High to Low)</option>
                <option value="salary-low">Salary (Low to High)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Saved Searches</h3>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((search) => (
              <button
                key={search.id}
                onClick={() => loadSavedSearch(search)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
              >
                {search.query || "Saved Search"} - {search.createdAt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-4">
        {searching ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto mb-2" />
            <p className="text-gray-500">Searching...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          searchResults.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link to={`/candidate/job/${job.id}`}>
                    <h3 className="text-xl font-semibold text-primary-600 hover:text-primary-800 mb-2">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="text-lg text-gray-600 mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
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
                    <span>{job.workMode}</span>
                    <span>Exp: {job.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;
