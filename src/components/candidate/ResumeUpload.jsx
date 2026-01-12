import { useState } from 'react'
import { FaUpload, FaFilePdf, FaCheck, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'

const ResumeUpload = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [extractedData, setExtractedData] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' ||
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile)
        setUploaded(false)
        setExtractedData(null)
      } else {
        toast.error('Please upload a PDF or Word document')
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    setUploading(true)

    // Simulate file upload and extraction
    setTimeout(() => {
      // Mock extracted data
      const mockExtractedData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234-567-8900',
        skills: ['React', 'Node.js', 'JavaScript', 'Python', 'MongoDB'],
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Developer',
            duration: '2020 - Present',
          },
          {
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            duration: '2018 - 2020',
          },
        ],
        education: [
          {
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            university: 'University of Technology',
            year: '2018',
          },
        ],
      }

      setExtractedData(mockExtractedData)
      setUploaded(true)
      setUploading(false)
      toast.success('Resume uploaded and processed successfully!')
    }, 2000)
  }

  const handleAccept = () => {
    // Save extracted data to profile
    localStorage.setItem('resumeData', JSON.stringify(extractedData))
    toast.success('Resume details accepted and saved to your profile!')
  }

  const handleReject = () => {
    setExtractedData(null)
    setUploaded(false)
    setFile(null)
    toast('Resume rejected. You can upload a new one.')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Resume</h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors">
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {file ? file.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-gray-500">
              PDF, DOC, or DOCX (MAX. 10MB)
            </p>
          </label>
        </div>

        {file && (
          <div className="mt-6 flex items-center gap-4">
            <FaFilePdf className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : 'Upload & Extract'}
            </button>
          </div>
        )}

        {/* Extracted Data Display */}
        {extractedData && (
          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Extracted Resume Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Name:</strong> {extractedData.name}</p>
                  <p><strong>Email:</strong> {extractedData.email}</p>
                  <p><strong>Phone:</strong> {extractedData.phone}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {extractedData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
                <div className="space-y-3">
                  {extractedData.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{exp.position}</p>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
                <div className="space-y-3">
                  {extractedData.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{edu.degree} in {edu.field}</p>
                      <p className="text-gray-600">{edu.university}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAccept}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FaCheck />
                  Accept & Save
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <FaTimes />
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeUpload


