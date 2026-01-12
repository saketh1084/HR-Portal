import { FaBriefcase, FaUsers, FaFileAlt, FaChartLine } from 'react-icons/fa'

const AdminHome = () => {
  const stats = [
    { title: 'Total Jobs', value: '1,234', icon: FaBriefcase, color: 'bg-blue-500' },
    { title: 'Active Users', value: '5,678', icon: FaUsers, color: 'bg-green-500' },
    { title: 'Resumes', value: '3,456', icon: FaFileAlt, color: 'bg-purple-500' },
    { title: 'Applications', value: '8,901', icon: FaChartLine, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-4 rounded-lg`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New job posted: Senior Developer</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New user registered: John Doe</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Resume uploaded: Jane Smith</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome


