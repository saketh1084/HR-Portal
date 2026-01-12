import { FaChartLine, FaUsers, FaBriefcase, FaFileAlt } from 'react-icons/fa'

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Applications',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: FaBriefcase,
    },
    {
      title: 'Active Candidates',
      value: '5,678',
      change: '+8%',
      trend: 'up',
      icon: FaUsers,
    },
    {
      title: 'Resumes Processed',
      value: '3,456',
      change: '+15%',
      trend: 'up',
      icon: FaFileAlt,
    },
    {
      title: 'Growth Rate',
      value: '24%',
      change: '+5%',
      trend: 'up',
      icon: FaChartLine,
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-8 w-8 text-primary-600" />
              <span
                className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Postings Trend</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Growth</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics


