import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Unauthorized</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default Unauthorized;
