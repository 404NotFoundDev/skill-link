
import React,{ useState } from 'react';

const JobManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const jobs = [
    { title: "Front-End Developer", status: "Open", postedDate: "2024-01-01" },
    { title: "Graphic Designer", status: "Closed", postedDate: "2024-01-10" },
    // ...more jobs
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || job.status === filterStatus)
  );

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Job Postings</h2>
      
      {/* Search and Filter */}
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full lg:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Job List */}
      <ul>
        {filteredJobs.map((job, index) => (
          <li key={index} className="border-b py-2">
            <h3 className="font-semibold">{job.title}</h3>
            <p>Status: {job.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobManagement;
