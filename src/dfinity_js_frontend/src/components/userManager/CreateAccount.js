import React, { useState } from "react";
import { createUser } from "../../utils/skill-link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const CreateAccount = ({ fetchUser }) => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+254"); // Default country code
  const [userType, setUserType] = useState("");

  const isFormFilled = () => fullName && address && email && phoneNumber;

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;

    // Ensure the input starts with "+254"
    if (!input.startsWith("+254")) {
      input = "+254" + input.replace(/^(\+254)?/, "");
    }

    setPhoneNumber(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        fullName,
        address,
        email,
        phoneNumber,
        userType,
      };

      await createUser(user)
        .then((res) => {
          console.log("Registration successful:", res);
          fetchUser();
          toast.success("Registration successful!");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.log("Validation Error:", err.response.data);
            toast.error(`Registration failed: ${err.response.data.message}`);
          } else {
            console.log("Error:", err.message);
            toast.error("Something went wrong. Please try again.");
          }
        });
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.status, error.response.data);
        toast.error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        console.log("Network Error:", error.request);
        toast.error("Network error! Please check your connection.");
      } else {
        console.log("Unexpected Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create an Account on Skill-Link
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="border rounded-lg p-3 w-full"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-lg p-3 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="border rounded-lg p-3 w-full"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              className="border rounded-lg p-3 w-full"
              onChange={handlePhoneNumberChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="userType">
              User Type
            </label>
            <select
              id="userType"
              className="border rounded-lg p-3 w-full"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="Worker">Worker</option>
              <option value="Employer">Employer</option>
            </select>
          </div>

          <div className="flex justify-center mb-4">
            <button
              disabled={!isFormFilled()}
              onClick={handleSubmit}
              type="button"
              className={`w-full py-3 text-white rounded-lg ${
                isFormFilled()
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Welcome to Skill-Link, where skills meet opportunities!
          </p>
        </form>
        <ToastContainer /> {/* Toast container to display toasts */}
      </div>
    </div>
  );
};

export default CreateAccount;
