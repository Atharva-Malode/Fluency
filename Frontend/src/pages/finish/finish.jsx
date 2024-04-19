import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Finish = () => {
     const [Data, setData] = useState(null);
     const navigate = useNavigate();

     useEffect(() => {
        const token = Cookies.get('bearerToken');

        if (!token) {
          navigate('/auth/login');
          return;
        }

        const fetchData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/user_data',{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
            }});
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData.data[0]); // Assuming data is an array and you want the first element
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
          <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative">
            <h1 className="text-xl font-bold mb-4 md:text-center text-red-600">
             Exam completed !
            </h1>
            {Data?.warnings < 5 ? (
              <p className="mt-2 text-xl text-gray-500 mb-2">
                You have completed your exam succesfully to know the standings please headover to the 
                leaderboard tab. Your total score is {Data?.total_points} points.
              </p>
            ) : (
              <p className="mt-2 text-xl text-gray-500 mb-2">
                We regret to inform you that you have been blocked for cheating.
                Please try logging in again after consulting with the admin.
              </p>
            )}
          </div>
        </div>
      );
}

export default Finish;

// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const Finish = () => {
//      const [Data,setData] = useState(null);
    
//      useEffect(() => {
//         const token = Cookies.get('bearerToken');

//         if (!token) {
//           navigate('/auth/login');
//           return;
//         }
//         const fetchData = async () => {
//           try {
//             const response = await fetch('http://127.0.0.1:8000/user_data',{
//                 method: 'GET',
//                 headers: {
//                   'Accept': 'application/json',
//                   'Authorization': `Bearer ${token}`,
//             }});
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
//             const jsonData = await response.json();
//             setData(jsonData);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);

//     return (
//         <div className="h-screen flex justify-center items-center bg-gray-100">
//           <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative">
//             <h1 className="text-xl font-bold mb-4 md:text-center text-red-600">
//              Exam completed !
//             </h1>
//             {Data.warnings < 5 ? (
//               <p className="mt-2 text-xl text-gray-500 mb-2">
//                 Your score is {Data.total_points}.
//               </p>
//             ) : (
//               <p className="mt-2 text-xl text-gray-500 mb-2">
//                 We regret to inform you that you have been blocked for cheating.
//                 Please try logging in again after consulting with the admin.
//               </p>
//             )}
//           </div>
//         </div>
//       );
// }

// export default Finish;