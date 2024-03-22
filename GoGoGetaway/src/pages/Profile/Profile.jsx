import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';

const Profile = () => {
  const { currentUser, logout } = useUserContext();
  const [birthdate, setBirthdate] = useState(currentUser.birthdate);

  const handleBirthdateChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = formatBirthdate(inputValue);
    setBirthdate(formattedValue);
  };

  const formatBirthdate = (value) => {
    let formattedValue = value;

    if (formattedValue.length > 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
    }
    if (formattedValue.length > 5) {
      formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5, 9);
    }

    return formattedValue;
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 ml-4">Personal Details</h1> 
      <div className="flex">
        <h6 className="font-bold mr-10 mt-20 ml-4">Name</h6>
        <div className="flex flex-col mr-5">
          <label className="mt-20">First Name:</label>
          <input
            type="text"
            className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
            value={currentUser.firstName}
            readOnly // Setting readOnly to make it non-editable
          />
        </div>
        <div className="flex flex-col ml-5 mt-20">
          <label>Last Name:</label>
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
              value={currentUser.lastName}
              readOnly // Setting readOnly to make it non-editable
            />
          </div>
        </div>
      </div>
      <h6 className="font-bold mt-20 ml-4">Username</h6>
      <div className="flex">
        <input
          type="text"
          className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2 ml-24"
          value={currentUser.username}
          readOnly // Setting readOnly to make it non-editable
        />
      </div>
      <h6 className="font-bold mt-20 ml-4">Email</h6>
      <div className="flex">
        <input
          type="text"
          className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2 ml-24"
          value={currentUser.email}
          readOnly // Setting readOnly to make it non-editable
        />
      </div>
      <h6 className="font-bold mt-20 ml-4">Birthdate</h6> {/* Birthdate section */}
      <div className="flex">
        <input
          type="text"
          className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2 ml-24 mr-24" // Adjust styling as needed
          value={birthdate} // Set the value to the birthdate state
          onChange={handleBirthdateChange} // Handle changes to the birthdate
          maxLength={10} // Limit the maximum number of characters to 10
          placeholder="MM/DD/YYYY" // Set placeholder text
        />
      </div>
      <div className="flex justify-center mt-3"> 
        <button onClick={() => logout()} className='border border-blue-600 rounded-lg px-60 py-2 text-white bg-teal-500'>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
