import React from 'react';

const JobApplicationTracker = () => {
  const applications = [
    { title: "Front-End Developer", status: "Pending" },
    { title: "Graphic Designer", status: "Accepted" },
  ];

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Job Application Tracker</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Job Title</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{app.title}</td>
              <td className="px-4 py-2 border-b">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationTracker;
