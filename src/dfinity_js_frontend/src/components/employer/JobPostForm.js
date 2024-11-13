
import React,{ useState } from 'react';

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handlePostJob = (e) => {
    e.preventDefault();
    // Add logic to post job to backend or display in console for now
    console.log({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handlePostJob} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
        Post Job
      </button>
    </form>
  );
};

export default JobPostForm;
