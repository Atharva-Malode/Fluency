import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const guidelineData = [
  "Read each question carefully.",
  "The answer for the previous question will be displayed below the next question.",
  "Questions are categorized into Easy, Medium, and Hard levels.",
  "Answering questions correctly earns you points based on the difficulty level: 1 point for Easy questions, 3 points for Medium questions, and 5 points for Hard questions.",
  "The question level increases for correct answers and decreases for wrong answers.",
  "Your language preference is considered from your profile section.",
  "Check your standings on the leaderboard section.",
  "Make sure to log in to get highlighted on the leaderboard.",
  "The proficiency level will be judged based on the accumulated points.",
  "Initially, multiple exercise attempts are allowed, but it will be limited to one later.",
  "All the best for your exams!",
  "New exercises will be available each week.",
];

const Guidelines = () => {
  const [language, setLanguage] = useState("english");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if bearer token exists in cookies
    const token = Cookies.get("bearerToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  
  const handleGetStarted = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const response = await fetch("http://127.0.0.1:8000/start_exam", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        console.log("Exam started successfully");
        // Proceed with navigation or any other action
      } else {
        console.error("Failed to start exam:", response.statusText);
        // Handle error accordingly
      }
    } catch (error) {
      console.error("An error occurred while starting exam:", error);
      // Handle error accordingly
    }
  };
  
  const handleRedirectToLogin = () => {
    navigate("/auth/login"); // Redirect to login page using useNavigate
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-3/4 md:w-2/4 lg:w-2/5 p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
          Exercise Guidelines
        </h1>
        <div className="overflow-y-auto max-h-72 mb-6">
          <ul className="list-disc pl-6">
            {guidelineData.map((guideline, index) => (
              <li key={index} className="mb-2">
                {guideline}
              </li>
            ))}
          </ul>
        </div>
        {!isAuthenticated ? (
          <div className="text-red-600 mb-4">
            Please log in to start the Exam
            <button
              onClick={handleRedirectToLogin}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Redirect to Login
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <label htmlFor="languageSelect" className="mr-2">
                Language:
              </label>
              <select
                id="languageSelect"
                value={language}
                onChange={handleLanguageChange}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
            <div className="flex-shrink-0">
              <Link
                to={{ pathname: "/quiz", state: { language: language } }}
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Start Exam
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guidelines;
