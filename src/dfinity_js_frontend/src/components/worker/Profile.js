import React, { useState } from 'react';

const Profile = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user?.profile_picture || '/images/default-profile.png');
  const [userData, setUserData] = useState({
    name: user?.fullName || '',
    skills: user?.skills || '',
    portfolio: user?.website || '',
    email: user?.email || '',
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Profile Summary</h2>
      
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
        />
        <label className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-600">
          Change Profile Picture
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleProfilePicChange}
          />
        </label>
      </div>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Name</label>
        <input 
          type="text" 
          value={userData.name} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
          readOnly
        />
      </div>

      {/* Skills Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Skills</label>
        <input 
          type="text" 
          value={userData.skills} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
          readOnly
        />
      </div>

      {/* Portfolio Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-1">Portfolio</label>
        <input 
          type="url" 
          value={userData.portfolio} 
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
          readOnly
        />
      </div>

      {/* Save Changes Button */}
      <button className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
