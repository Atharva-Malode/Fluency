import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const fetchNextQuestion = async () => {
    try {
      const token = Cookies.get("bearerToken");
      const questionNo = questions.length > 0 ? questions.length : 1; // Adjust as needed
        //  let questionsNo = 1;
      const response = await fetch("http://127.0.0.1:8000/question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_no: questionNo,
          old_answer: selectedOption === questions[currentQuestion]?.answer,
          old_level: questions[currentQuestion]?.level || "easy",
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      setQuestions([...questions, data.message]);
      console.log(questions)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    if (currentQuestion < 10) {
      fetchNextQuestion();
      console.log(currentQuestion);
    }
  }, [currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    console.log(currentQuestion);
   
     if(currentQuestion < 9){
      moveToNextQuestion();
     }
  };

  const handleSkip = () => {
    setSelectedOption("");
    moveToNextQuestion();
  };

  // const moveToNextQuestion = () => {
  //   if (currentQuestion + 1 < questions.length) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   } else {
  //     setCurrentQuestion(-1);
  //   }
  // };
  
  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < questions.length && currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(-1);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6">
        {currentQuestion !== -1 ? (
          <>
            <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
              Quiz
            </h1>
            <h2 className="font-bold text-xl text-blue-600 mb-2">
              {questions[currentQuestion]?.question || ""}
            </h2>
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
          </>
        ) : (
          console.log("Quiz Completed")
          // <div className="text-center">
          //   <h1 className="text-3xl font-bold mb-4 text-blue-600">
          //     Quiz Completed
          //   </h1>
          //   <p className="px-6 py-4">
          //     You scored {score} out of {questions.length}
          //   </p>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;




// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";

// const Quiz = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const token = Cookies.get("bearerToken");
//         const response = await fetch("http://127.0.0.1:8000/first", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token || ''}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();
//         setQuestions([data.message]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleSubmit = () => {
//     if (selectedOption === questions[currentQuestion]?.answer) {
//       setScore(score + 1);
//     }
//     setSelectedOption("");
//     moveToNextQuestion();
//   };

//   const handleSkip = () => {
//     setSelectedOption("");
//     moveToNextQuestion();
//   };

//   const moveToNextQuestion = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       // Quiz completed
//       setCurrentQuestion(-1); // Set to -1 to display completion
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6">
//         {currentQuestion !== -1 ? (
//           <>
//             <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
//               Quiz
//             </h1>
//             <h2 className="font-bold text-xl text-blue-600 mb-2">
//               {questions[currentQuestion]?.question || ""}
//             </h2>
//             <div className="flex flex-col space-y-2">
//               {questions[currentQuestion]?.options.map((option, index) => (
//                 <label key={index} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="option"
//                     value={option}
//                     checked={selectedOption === option}
//                     onChange={() => handleOptionSelect(option)}
//                   />
//                   <span className="ml-2">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={handleSkip}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Skip
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-4 text-blue-600">
//               Quiz Completed
//             </h1>
//             <p className="px-6 py-4">
//               You scored {score} out of {questions.length}
//             </p>  
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;




// import React, { useState } from "react";

// const questions = [
//   {
//     id: 1,
//     question: "Question 1?",
//     options: ["Option A", "Option B", "Option C", "Option D"],
//     answer: "Option A",
//   },
//   {
//     id: 1,
//     question: "Question 2?",
//     options: ["Option A", "Option B", "Option C", "Option D"],
//     answer: "Option A",
//   },
//   // Add more questions similarly
// ];

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [score, setScore] = useState(0);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleSubmit = () => {
//     if (selectedOption === questions[currentQuestion].answer) {
//       setScore(score + 1);
//       {console.log(currentQuestion)}
//     }
//     setSelectedOption("");
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   const handleSkip = () => {
//     setSelectedOption("");
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6">
//         {currentQuestion < questions.length ? (
//           <>
//             <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
//               Quiz
//             </h1>
//             <h2 className="font-bold text-xl text-blue-600 mb-2">
//               {questions[currentQuestion].question}
//             </h2>
//             <div className="flex flex-col space-y-2">
//               {questions[currentQuestion].options.map((option, index) => (
//                 <label key={index} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="option"
//                     value={option}
//                     checked={selectedOption === option}
//                     onChange={() => handleOptionSelect(option)}
//                   />
//                   <span className="ml-2">{option}</span>
//                 </label>
//               ))}
//             </div>
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={handleSkip}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Skip
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
                
//                 Submit
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center">
//             <h1 className="text-3xl font-bold mb-4 text-blue-600">
//               Quiz Completed
//             </h1>
//             <p className="px-6 py-4">
//               You scored {score} out of {questions.length}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;


