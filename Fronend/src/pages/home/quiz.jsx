import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Quiz = ({language}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState("easy");
  const [answer, setAnswer] = useState("false");
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");

  const fetchNextQuestion = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const questionNo = questions.length + 1;
      console.log(language)
      const requestData = {
        question_no: questionNo,
        old_answer: answer,
        old_level: level,
        language: language || "english",
      };
      
      const response = await fetch("http://127.0.0.1:8000/question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setQuestions([...questions, data.message]);
      setLevel(data.message.level);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "Warning: Please log in again if quiz is not completed"
      );
    }
  };

  const submitUserAnswer = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const currentQuestionData = questions[currentQuestion];

      const response = await fetch("http://127.0.0.1:8000/add_question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          question: currentQuestionData?.question || "",
          answer: selectedOption || "",
          points: score,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      // Handle success or any further actions here
    } catch (error) {
      console.error("Error submitting answer:", error);
      setErrorMessage(
        "Warning: Please log in again to get the total marks on Leaderboard"
      );
    }
  };

  useEffect(() => {
    if (currentQuestion < 11) {
      fetchNextQuestion();
    }
  }, [currentQuestion]);

  const getLevelColor = (level) => {
    switch (level) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-blue-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const currentQuestionData = questions[currentQuestion];
    const { answer, level, explanation } = currentQuestionData;
    if (selectedOption === answer) {
      let pointsToAdd = 0;
      switch (level) {
        case "easy":
          pointsToAdd = 1;
          break;
        case "medium":
          pointsToAdd = 3;
          break;
        case "hard":
          pointsToAdd = 5;
          break;
        default:
          pointsToAdd = 0;
      }
      setAnswer("true");
      setScore(score + pointsToAdd);
    } else {
      setAnswer("false");
      setShowExplanation(true);
      setCurrentExplanation(explanation);
      // setTimeout(moveToNextQuestion, 5000);
    }
    setSelectedOption("");
    submitUserAnswer();
    moveToNextQuestion();
  };

  const handleSkip = () => {
    setSelectedOption("");
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(-1);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative">
        {currentQuestion !== -1 ? (
          <>
            <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
              Exercise 1
            </h1>
            <div className="flex justify-between">
              <h2 className="font-bold text-xl">
                Question {currentQuestion + 1}
              </h2>
              <p
                className={`self-end ${getLevelColor(
                  questions[currentQuestion]?.level
                )}`}
              >
                {questions[currentQuestion]?.level}
              </p>
            </div>
            <p className="mt-2 text-xl text-gray-500 mb-2">
              {questions[currentQuestion]?.question || ""}
            </p>
            <div className="flex flex-col space-y-2">
              {questions[currentQuestion]?.options.map((option, index) => (
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
                onClick={handleSkip}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
            <div className="mt-4">
              {showExplanation && (
                <p className="text-sm text-red-500 mb-2">
                  {currentExplanation}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">
              Quiz Completed
            </h1>
            <p className="px-6 py-4">
              You scored {score} Points, check the Leaderboard
            </p>
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
