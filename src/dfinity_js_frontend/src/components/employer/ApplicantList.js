
import React,{ useState } from 'react';

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([
    { name: "Alice Johnson", status: "Applied" },
    { name: "Bob Smith", status: "Reviewed" },
    { name: "Alice Johnson", status: "Applied" },
    { name: "Bob Smith", status: "Reviewed" },
    
    // ...more applicants
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index].status = newStatus;
    setApplicants(updatedApplicants);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Applicant Management</h2>
      <ul>
        {applicants.map((applicant, index) => (
          <li key={index} className="border-b py-2 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{applicant.name}</h3>
              <p>Status: {applicant.status}</p>
            </div>
            <select
              value={applicant.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
              className="p-1 border rounded"
            >
              <option value="Applied">Applied</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantList;
