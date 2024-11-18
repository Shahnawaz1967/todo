import React from "react";
import { MdWorkOutline } from "react-icons/md";
import { LuListTodo, LuGithub } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/project-page");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="landing-page h-[85vh] flex flex-col items-center justify-between p-6 bg-gray-100">
        {/* Hero Section */}
        <div className="hero flex flex-col items-center text-center py-16">
          <h1 className="text-4xl text-custom-blue font-bold mb-4">
            Focus Forward & Maintain Discipline
          </h1>
          <p className="text-lg mb-6 text-gray-500">
            Organize your work, keep track of tasks, and connect effortlessly.
          </p>
          <button
            onClick={handleGetStarted}
            className="text-lg font-semibold px-6 py-2 shadow hover:bg-emerald-950 hover:text-white transition bg-emerald-600 rounded-lg text-black"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="features hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full max-w-5xl">
          {/* Feature 1 */}
          <div className="feature-card flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <MdWorkOutline className="text-5xl text-indigo-500 mb-4 bg-gray-200 p-3 rounded-full border-2 border-indigo-500" />
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Efficient Project Management
            </h3>
            <p className="text-gray-600">
              Simplify your workflow and keep your projects organized with ease.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <LuGithub className="text-5xl text-green-500 mb-4 bg-gray-200 p-3 rounded-full border-2 border-green-500" />
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              GitHub Integration
            </h3>
            <p className="text-gray-600">
              Easily sync your tasks and export them to GitHub for seamless
              collaboration.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <LuListTodo className="text-5xl text-purple-500 mb-4 bg-gray-200 p-3 rounded-full border-2 border-purple-500" />
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Stay on Top of Your Tasks
            </h3>
            <p className="text-gray-600">
              Keep track of every task effortlessly with intuitive to-do tools.
            </p>
          </div>
        </div>

        {/* For smaller screens, show only icons */}
        <div className="flex md:hidden justify-between gap-6 mt-4">
          <MdWorkOutline className="text-5xl text-blue-600 bg-white p-2 border-2 rounded-full border-gray-200" />
          <LuListTodo className="text-5xl text-green-500 bg-white p-2 border-2 rounded-full border-gray-200" />
          <LuGithub className="text-5xl text-purple-500 bg-white p-2 border-2 rounded-full border-gray-200" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-sm text-center mt-5 text-gray-600 mb-3 md:mb-0">
         Todos-Web-App © {new Date().getFullYear()}. All rights reserved. Helping you organize and track your goals.
      </div>

    </>
  );
}

export default Home;
