// Guidelines.js
import React from "react";
import { Link } from "react-router-dom";

const guidelineData = [
  "Read each question carefully.",
  "Answer all questions within the given time (15 seconds per question).",
  "Select the correct answer.",
  "You cannot change your answers.",
  "Questions are categorized into Easy, Medium, and Hard levels.",
  "Answering an Easy question correctly earns you 1 point.",
  "For Medium questions, answering correctly within 10 seconds earns 3 points; otherwise, 2 points.",
  "For Hard questions, answering correctly within 10 seconds earns 5 points; otherwise, 4 points.",
  "The question level increases for correct answers and decreases for wrong answers.",
  "Your language preference is considered from your profile section.",
  "All the best for your exams!"
];

const Guidelines = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-3/4 md:w-2/4 lg:w-2/5 p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
          Excercise Guidelines
        </h1>
        <p className="text-base mb-6">
          Please follow these guidelines for the Excercise:
        </p>
        <ul className="list-disc pl-6 mb-6">
          {guidelineData.map((guideline, index) => (
            <li key={index} className="mb-2">
              {guideline}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Link to="/quiz" className="bg-blue-600 text-white px-4 py-2 rounded">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;




// // Guidelines.js
// import React from "react";
// import { Link } from "react-router-dom";

// const guidelineData = [
//     "Read each question carefully.",
//     "Answer all questions within the given time (15 seconds per question).",
//     "Select the correct answer.",
//     "You cannot change your answers.",
//     "Questions are categorized into Easy, Medium, and Hard levels.",
//     "Answering an Easy question correctly earns you 1 point.",
//     "For Medium questions, answering correctly within 10 seconds earns 3 points; otherwise, 2 points.",
//     "For Hard questions, answering correctly within 10 seconds earns 5 points; otherwise, 4 points.",
//     "The question level increases for correct answers and decreases for wrong answers.",
//     "Your language preference is considered from your profile section.",
//     "All the best for your exams!"
//   ];
  

// const Guidelines = () => {
//   return (
//     <div className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6">
//         <h1 className="text-3xl font-bold mb-4 md:text-center text-blue-600">
//           Quiz Guidelines
//         </h1>
//         <p className="text-base mb-6">
//           Please follow these guidelines for the quiz:
//         </p>
//         <ul className="list-disc pl-6 mb-6">
//           {guidelineData.map((guideline, index) => (
//             <li key={index} className="mb-2">
//               {guideline}
//             </li>
//           ))}
//         </ul>
//         <div className="flex justify-center">
//           <Link to="/quiz" className="bg-blue-600 text-white px-4 py-2 rounded">
//             Get Started
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Guidelines;