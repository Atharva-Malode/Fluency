import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {state} from "react";

const Quiz = () => {
  const location = useLocation();
  const { state } = location;

  const [question, setQuestion] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [warnings, setWarnings] = useState(0); // Changed to expect an integer

  const Navigate = useNavigate();

  // Function to fetch question from the API
  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/question", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question:", error);
      setErrorMessage("Failed to fetch question");
    }
  };

  // Function to fetch warnings from the API
  const fetchWarnings = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const response = await fetch("http://127.0.0.1:8000/warnings", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch warnings");
      }

      const data = await response.json();
      if (typeof data.warnings === "number") {
        setWarnings(data.warnings); // Set warnings as integer
        // console.log("Warnings:", data.warnings);
        if(data.warnings >= 5){
          Navigate("/blocked");
        }
      } else {
        throw new Error("Invalid response format for warnings");
      }
    } catch (error) {
      console.error("Error fetching warnings:", error);
      setErrorMessage("Failed to fetch warnings");
    }
  };

  useEffect(() => {
    fetchQuestion(); // Fetch warnings when component mounts
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const saveanswer = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const response = await fetch("http://127.0.0.1:8000/add_question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          question: question.question,
          answer: selectedOption,
          time_seconds: 10,
          points: score,
          correct_answer: question.answer,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save answer");
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      setErrorMessage("Failed to save answer");
    }
  };
  const handlefinishexam = async () => {
    Navigate("/finish");
  };
  const handleSubmit = async () => {
    try {
      if (selectedOption === question.answer) {
        setScore(score + 5);
      } else {
        setShowExplanation(true);
        setCurrentExplanation(question.explanation);
      }
      setSelectedOption("");
      saveanswer();
        setShowExplanation(false);
        setCurrentExplanation("");
        fetchQuestion();
        fetchWarnings();
    } catch (error) {
      console.error("Error fetching question:", error);
      setErrorMessage("Failed to fetch question");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative">
        <div className="absolute top-0 left-0 bg-transparent text-red-600 p-2">
          <p>{warnings} warnings</p>
        </div>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
          Exercise 1
        </h1>
        <div className="font-bold text-xl mb-2">Question</div>
        <p className="mt-2 text-xl text-gray-500 mb-2">{question.question}</p>
        <div className="flex flex-col space-y-2">
          {question.options &&
            question.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
          <button
            onClick={handlefinishexam}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
        <div className="mt-4">
          {showExplanation && (
            <p className="text-sm text-red-500 mb-2">{currentExplanation}</p>
          )}
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
