import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the cookie
    Cookies.remove('bearerToken'); // Replace 'bearerToken' with your actual cookie name

    // Redirect to login page
    navigate('/auth/login');
  };

  const userData = {
    // Replace with your user data structure
    "_id": {
      "$oid": "656dad656f282ade104f6104"
    },
    "username": "user1",
    "password": "$2b$12$NseUWmMllfyNuU5UzKuDL.w1M4xe47oajRoo7iMWA9aafrDj4dcum",
    "questions": [
      {
        "question": "is he a right guy ?",
        "answer": "no",
        "time_taken": "2 sec",
        "points": 10
      },
      {
        "question": "something went wrong ?",
        "answer": "hello",
        "time_taken": "10 seconds",
        "points": 10
      }
    ],
    "total_points": 20
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 text-center mb-4">
        <div className="mb-4">
          <img
            src="profile_avtar.png"
            alt="Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <span className="text-xl font-bold">{userData.username}</span>
        </div>
        <div className="text-left">
          <p>
            Username: <strong>{userData.username}</strong>
          </p>
          <p>
            Total Points: <strong>{userData.total_points}</strong>
          </p>
          <h2 className="text-lg font-semibold mt-6">Question History</h2>
          <div className="max-h-40 overflow-y-auto mt-4">
            {Array.isArray(userData.questions) && userData.questions.length > 0 ? (
              userData.questions.map((question, index) => (
                <div key={index} className="border-b border-gray-300 py-2">
                  <p>
                    Question: <strong>{question.question}</strong>
                  </p>
                  <p>
                    Answer: <strong>{question.answer}</strong>
                  </p>
                  <p>
                    Time Taken: <strong>{question.time_taken}</strong>
                  </p>
                  <p>
                    Points: <strong>{question.points}</strong>
                  </p>
                </div>
              ))
            ) : (
              <p>No question history available</p>
            )}
          </div>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default MyProfile;