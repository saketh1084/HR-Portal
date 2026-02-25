import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaGoogle,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // email, otp
  const [otpSent, setOtpSent] = useState(false);
  const { login, socialLogin, otpLogin } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      const role = result.user?.role || (email.includes("admin") ? "admin" : "job_seeker");
      navigate(role === "admin" ? "/admin" : "/candidate");
    }
  };

  const handleSocialLogin = async (provider) => {
    const result = await socialLogin(provider);
    if (result.success) {
      navigate("/candidate");
    }
  };

  const handleSendOTP = () => {
    // Simulate sending OTP
    setOtpSent(true);
    alert("OTP sent to your phone: 123456 (Demo)");
  };

  const handleOTPLogin = async (e) => {
    e.preventDefault();
    const result = await otpLogin(phone, otp);
    if (result.success) {
      navigate("/candidate");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Jobs Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        {loginMethod === "email" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Demo Credentials:
            </p>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("candidate@example.com");
                  setPassword("password123");
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Fill Candidate
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@example.com");
                  setPassword("admin123");
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Fill Admin
              </button>
            </div>
            <div className="text-xs text-blue-800 space-y-1">
              <p>
                <strong>Candidate:</strong> candidate@example.com / password123
              </p>
              <p>
                <strong>Admin:</strong> admin@example.com / admin123
              </p>
            </div>
          </div>
        )}

        {loginMethod === "otp" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              OTP Demo:
            </p>
            <div className="text-xs text-blue-800">
              <p>Use any phone number (e.g., +1234567890)</p>
              <p className="mt-1">
                <strong>OTP Code:</strong>{" "}
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                  123456
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Login Method Toggle */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              setLoginMethod("email");
              setOtpSent(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              loginMethod === "email"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaEnvelope className="inline mr-2" />
            Email
          </button>
          <button
            onClick={() => {
              setLoginMethod("otp");
              setOtpSent(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              loginMethod === "otp"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaPhone className="inline mr-2" />
            OTP
          </button>
        </div>

        {/* Email Login Form */}
        {loginMethod === "email" && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* OTP Login Form */}
        {loginMethod === "otp" && (
          <form className="mt-8 space-y-6" onSubmit={handleOTPLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {otpSent && (
                <div>
                  <label htmlFor="otp" className="sr-only">
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Verify OTP
                </button>
              )}
            </div>
          </form>
        )}

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaGithub className="h-5 w-5 text-gray-900" />
            </button>
            <button
              onClick={() => handleSocialLogin("linkedin")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaLinkedin className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
