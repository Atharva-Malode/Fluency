import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Blocked = () => {
    useEffect(() => {
        // Clear the bearer token cookie when component mounts
        Cookies.remove("bearerToken");
      }, []);
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-4/5 md:w-3/5 lg:w-2/5 p-6 relative">
        <h1 className="text-3xl font-bold mb-4 md:text-center text-red-600">
          Sorry!
        </h1>
        <p className="mt-2 text-xl text-gray-500 mb-2">
          We regret to inform you that you have been blocked for cheating.
          Please try logging in again after consulting with the admin.
        </p>
      </div>
    </div>
  );
};

export default Blocked;
