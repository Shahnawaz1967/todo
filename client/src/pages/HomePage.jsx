import React from "react";
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
      <div className="landing-page min-h-screen flex flex-col items-center justify-between p-6 bg-gray-100">
        {/* Hero Section */}
        <div className="hero flex flex-col items-center text-center py-16">
          <h1 className="text-4xl text-custom-blue font-bold mb-6">
            Organize your work, keep track of tasks, and connect effortlessly.
          </h1>
          <button
            onClick={handleGetStarted}
            className="text-lg font-semibold px-6 py-2 shadow hover:bg-emerald-950 hover:text-white transition bg-emerald-600 rounded-lg text-black"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="features grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full max-w-7xl">
          {/* Feature Cards */}
          <div className="feature-card flex flex-col items-center text-center p-10 bg-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Plan Your Day
            </h3>
            <p className="text-gray-600 text-base">
              Set daily goals and prioritize tasks to maximize productivity.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center text-center p-10 bg-green-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Organize Tasks
            </h3>
            <p className="text-gray-600 text-base">
              Group tasks into categories and create a system that works for you.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center text-center p-10 bg-purple-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Collaborate Seamlessly
            </h3>
            <p className="text-gray-600 text-base">
              Share tasks and projects with teammates for better collaboration.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center text-center p-10 bg-yellow-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Track Progress
            </h3>
            <p className="text-gray-600 text-base">
              Monitor task completion and stay on top of deadlines effortlessly.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center text-center p-10 bg-red-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Set Reminders
            </h3>
            <p className="text-gray-600 text-base">
              Never miss a task with timely notifications and alerts.
            </p>
          </div>

          <div className="feature-card flex flex-col items-center text-center p-10 bg-teal-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Achieve Goals
            </h3>
            <p className="text-gray-600 text-base">
              Break down big goals into smaller tasks and celebrate achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-sm text-center mt-5 text-gray-600 mb-3 md:mb-0">
        Todos-Web-App © All rights reserved. Helping
        you organize and track your goals.
      </div>
    </>
  );
}

export default Home;
