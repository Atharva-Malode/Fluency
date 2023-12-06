import React, { useState } from "react";
import { Link } from "react-router-dom";


const guidelineData = [
  "Read each question carefully.",
  "Answer all questions.",
  "Select the correct answer.",
  "You cannot change your answers once submitted.",
  "Questions are categorized into Easy, Medium, and Hard levels.",
  "Answering an Easy question correctly earns you 1 point.",
  "For Medium questions, a correct answer earns 3 points; otherwise, 2 points.",
  "For Hard questions, a correct answer earns 5 points; otherwise, 4 points.",
  "The question level increases for correct answers and decreases for wrong answers.",
  "Your language preference is considered from your profile section.",
  "Check your standings on the leaderboard section.",
  "All the best for your exams!"
];

const Guidelines = () => {
  const [language, setLanguage] = useState("english");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-3/4 md:w-2/4 lg:w-2/5 p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
          Exercise Guidelines
        </h1>
        <p className="text-base mb-6">
          Please follow these guidelines for the Exercise:
        </p>
        <ul className="list-disc pl-6 mb-6">
          {guidelineData.map((guideline, index) => (
            <li key={index} className="mb-2">
              {guideline}
            </li>
          ))}
        </ul>
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
          <Link
            to={{ pathname: "/quiz", state: { language } }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
