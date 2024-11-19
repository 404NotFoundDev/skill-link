import React, { useEffect, useState } from "react";
import EmployerProfile from "../../components/employer/EmployerProfile";
import JobPostForm from "../../components/employer/JobPostForm";
import ApplicantList from "../../components/employer/ApplicantList";
import JobManagement from "../../components/employer/JobManagement";

const EmployerDashboard = ({ employer }) => {
  const { id, fullName, email, phoneNumber, address } = employer;

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-400 to-indigo-600 p-6">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
        {/* Welcome Note and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700 mb-4 lg:mb-0">
            Welcome, {fullName}!
          </h1>

          <div className="flex items-center space-x-4 w-full lg:w-1/2">
            <input
              type="text"
              placeholder="Search for applicants..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
            />
            <a
              href={`/employer/search?query=${searchTerm}`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Search
            </a>
          </div>
        </div>

        {/* Profile, Job Post Form, and Applicant List */}
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="flex-1 lg:w-1/3 mb-6 lg:mb-0 bg-gradient-to-br from-green-100 to-blue-200 p-4 rounded-lg shadow-md border border-green-300">
            <EmployerProfile employer={employer} />
          </div>
          <div className="flex-1 lg:w-2/3">
            <div className="bg-gradient-to-br from-indigo-50 to-yellow-100 p-4 rounded-lg shadow-md border border-yellow-200 mb-6">
              <h2 className="text-xl font-bold text-yellow-600 mb-2">
                Post a New Job
              </h2>
              <JobPostForm />
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
              <h2 className="text-xl font-bold text-indigo-700 mb-2">
                Applicant Management
              </h2>
              <ApplicantList />
            </div>
          </div>
        </div>

        {/* Job Management on the bottom row */}
        <div className="mt-6 bg-gradient-to-br from-red-100 to-yellow-200 p-4 rounded-lg shadow-md border border-red-300">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Manage Your Jobs
          </h2>
          <JobManagement />
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
