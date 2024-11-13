import React, { useState, useEffect } from 'react';

const EmployerProfile = ({ employer }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (employer) {
      setFullName(employer.fullName || "");
      setEmail(employer.email || "");
      setPhoneNumber(employer.phoneNumber || "");
      setLocation(employer.address || "");
    }
  }, [employer]);

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSaveChanges = () => {
    // Here you can handle the save functionality, such as sending updated data to the server
    console.log({
      fullName,
      email,
      phoneNumber,
      location,
      company,
      website,
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Employer Profile</h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleProfilePicChange} 
          className="text-sm" 
        />
      </div>

      {/* Employer Information */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input 
          type="text" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Company</label>
        <input 
          type="text" 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input 
          type="tel" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Website</label>
        <input 
          type="url" 
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded" 
        />
      </div>

      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EmployerProfile;
