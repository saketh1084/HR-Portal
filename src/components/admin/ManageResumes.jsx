import { useState } from 'react'
import { FaFilePdf, FaCheck, FaTimes, FaDownload } from 'react-icons/fa'

const ManageResumes = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      fileName: 'john_doe_resume.pdf',
      uploadedAt: '2024-01-15',
      status: 'pending',
      extracted: true,
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      fileName: 'jane_smith_cv.pdf',
      uploadedAt: '2024-01-20',
      status: 'accepted',
      extracted: true,
    },
    {
      id: 3,
      candidateName: 'Bob Johnson',
      fileName: 'bob_resume.docx',
      uploadedAt: '2024-02-01',
      status: 'rejected',
      extracted: false,
    },
  ])

  const updateStatus = (id, newStatus) => {
    setResumes(
      resumes.map((resume) =>
        resume.id === id ? { ...resume, status: newStatus } : resume
      )
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Resumes</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Extracted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resumes.map((resume) => (
              <tr key={resume.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {resume.candidateName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    {resume.fileName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {resume.uploadedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      resume.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : resume.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {resume.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      resume.extracted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {resume.extracted ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(resume.id, 'accepted')}
                      className="text-green-600 hover:text-green-900"
                      title="Accept"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => updateStatus(resume.id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="text-primary-600 hover:text-primary-900"
                      title="Download"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageResumes


