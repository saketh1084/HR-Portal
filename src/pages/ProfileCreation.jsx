import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const ProfileCreation = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    currentSkill: '',
    preferredJobRole: '',
    preferredSalary: '',
    experienceLevel: '',
    workMode: 'any', // remote, hybrid, onsite, any
    currentExp: {
      company: '',
      position: '',
      duration: '',
      description: '',
    },
    currentEdu: {
      degree: '',
      field: '',
      university: '',
      year: '',
    },
    profileVisibility: 'public', // public, private
    hideFromEmployer: false,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleExpChange = (e) => {
    setFormData({
      ...formData,
      currentExp: { ...formData.currentExp, [e.target.name]: e.target.value },
    })
  }

  const addSkill = () => {
    if (formData.currentSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: '',
      })
    }
  }

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    })
  }

  const addExperience = () => {
    if (formData.currentExp.company && formData.currentExp.position) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { ...formData.currentExp }],
        currentExp: { company: '', position: '', duration: '', description: '' },
      })
    }
  }

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Save profile to localStorage or API
    localStorage.setItem('userProfile', JSON.stringify(formData))
    toast.success('Profile created successfully!')
    navigate(user?.role === 'admin' ? '/admin' : '/candidate')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Create Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentSkill}
                  onChange={(e) =>
                    setFormData({ ...formData, currentSkill: e.target.value })
                  }
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <div className="space-y-3 border p-4 rounded-md">
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentExp.company}
                  onChange={handleExpChange}
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentExp.position}
                  onChange={handleExpChange}
                />
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., 2020-2022)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentExp.duration}
                  onChange={handleExpChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  rows="2"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentExp.description}
                  onChange={handleExpChange}
                />
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Add Experience
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {formData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-medium">{exp.position} at {exp.company}</h4>
                      <p className="text-sm text-gray-600">{exp.duration}</p>
                      <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <div className="space-y-3 border p-4 rounded-md">
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentEdu.degree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentEdu: { ...formData.currentEdu, degree: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  name="field"
                  placeholder="Field of Study"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentEdu.field}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentEdu: { ...formData.currentEdu, field: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  name="university"
                  placeholder="University/College"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentEdu.university}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentEdu: { ...formData.currentEdu, university: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year (e.g., 2020)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.currentEdu.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentEdu: { ...formData.currentEdu, year: e.target.value },
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    if (formData.currentEdu.degree && formData.currentEdu.field) {
                      setFormData({
                        ...formData,
                        education: [...formData.education, { ...formData.currentEdu }],
                        currentEdu: { degree: '', field: '', university: '', year: '' },
                      });
                    }
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Add Education
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-gray-600">{edu.university}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          education: formData.education.filter((_, i) => i !== index),
                        });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Job Role
                </label>
                <input
                  type="text"
                  name="preferredJobRole"
                  placeholder="e.g., Full Stack Developer"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.preferredJobRole}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Salary (Annual)
                </label>
                <input
                  type="text"
                  name="preferredSalary"
                  placeholder="e.g., $80k - $120k"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.preferredSalary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="fresher">Fresher (0-1 years)</option>
                  <option value="junior">Junior (1-3 years)</option>
                  <option value="mid">Mid-level (3-5 years)</option>
                  <option value="senior">Senior (5-8 years)</option>
                  <option value="lead">Lead (8+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Work Mode
                </label>
                <select
                  name="workMode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                  value={formData.workMode}
                  onChange={handleChange}
                >
                  <option value="any">Any</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    name="profileVisibility"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                    value={formData.profileVisibility}
                    onChange={handleChange}
                  >
                    <option value="public">Public - Visible to all recruiters</option>
                    <option value="private">Private - Only visible when you apply</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hideFromEmployer"
                    name="hideFromEmployer"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={formData.hideFromEmployer}
                    onChange={(e) =>
                      setFormData({ ...formData, hideFromEmployer: e.target.checked })
                    }
                  />
                  <label htmlFor="hideFromEmployer" className="ml-2 block text-sm text-gray-700">
                    Hide my profile from current employer
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileCreation

