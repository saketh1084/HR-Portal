import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you with your job search today?",
      sender: 'bot',
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    }

    setMessages([...messages, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(input),
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes('job') || lowerInput.includes('position')) {
      return "I can help you find jobs! Try using the search feature or browse job listings. What type of role are you looking for?"
    } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      return "You can upload your resume in the Upload Resume section. Once uploaded, our system will extract your details and help match you with relevant jobs."
    } else if (lowerInput.includes('skill') || lowerInput.includes('experience')) {
      return "Make sure to add all your skills and experience in your profile. This helps recruiters find you and match you with suitable positions."
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I assist you today?"
    } else {
      return "I'm here to help with your job search. You can ask me about jobs, resumes, skills, or anything related to your career journey!"
    }
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-lg shadow-md">
      <div className="p-4 border-b bg-primary-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <FaRobot className="h-5 w-5" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-white" />
              </div>
            )}
            <div
              className={`max-w-md rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
            </div>
            {message.sender === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <FaUser className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot


