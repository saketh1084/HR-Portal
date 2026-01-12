import { useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaFileAlt, FaEnvelope } from 'react-icons/fa'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications([
      {
        id: 1,
        type: 'resume',
        message: 'Your resume has been accepted by Tech Corp',
        timestamp: '2 hours ago',
        read: false,
      },
      {
        id: 2,
        type: 'application',
        message: 'New job application status update',
        timestamp: '1 day ago',
        read: false,
      },
      {
        id: 3,
        type: 'message',
        message: 'You have a new message from a recruiter',
        timestamp: '2 days ago',
        read: true,
      },
    ])
  }, [])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'resume':
        return <FaFileAlt className="text-green-500" />
      case 'application':
        return <FaCheck className="text-blue-500" />
      case 'message':
        return <FaEnvelope className="text-purple-500" />
      default:
        return <FaEnvelope />
    }
  }

  return (
    <div className="w-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 border-b hover:bg-gray-50 ${
                !notif.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                </div>
                <div className="flex gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications


