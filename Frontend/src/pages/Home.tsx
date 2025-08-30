import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { username, logout } = useAuthStore();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Basicall A NoteTaking App
          </h1>
          <p className="text-gray-600 leading-relaxed">
            This project was created for evaluation and learning during my internship at{" "}
            <span className="font-semibold text-indigo-600">Arbyte Solutions, Kathmandu</span>,{" "}
            during August 2025.
          </p>
        </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
          {(username && token) ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Welcome back, {username}! 👋
                </h2>
                <p className="text-green-600 mb-4">
                  You are successfully logged in to the system.
                </p>
                <button 
                  onClick={handleLogOut}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Get Started
                </h2>
                <p className="text-blue-600 mb-6">
                  Please sign up or log in to access the full features of this application.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link to="/signup">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                      Sign Up
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technologies Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Technologies & Features Implemented
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Frontend Technologies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 border-b border-indigo-200 pb-2">
                Frontend
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">React:</span> TanStack Query, React Hook Form with Zod validation
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">State Management:</span> Zustand for efficient state handling
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Language:</span> TypeScript for type safety
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 border-b border-indigo-200 pb-2">
                Backend
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Server:</span> Express.js with Node.js
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Database:</span> MongoDB with Mongoose ODM
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Email Service:</span> Nodemailer for password reset functionality
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Features */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600 border-b border-indigo-200 pb-2">
              Security & Advanced Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Authentication</span>
                </div>
                <p className="text-sm text-gray-600">JWT Access & Refresh Tokens for secure implementation</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Authorization</span>
                </div>
                <p className="text-sm text-gray-600">Role-based access control (Admin and User)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Password Recovery</span>
                </div>
                <p className="text-sm text-gray-600">Forgot password feature with JWT-based email verification</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Documentation</span>
                </div>
                <p className="text-sm text-gray-600">Complete API documentation using Swagger</p>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600 border-b border-indigo-200 pb-2">
              Deployment & DevOps
            </h3>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium">Containerization:</span> Dockerized for consistent deployment across environments
                </div>
              </div>
              <div className="flex items-start space-x-3 mt-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium">Hosting:</span> Deployed on Vercel (frontend) and Render (backend)
                  <span className="text-sm text-amber-600 block mt-1">
                    * Note: Free tier hosting may result in slower response times
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>During internship at Arbyte Solutions • August 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Home;