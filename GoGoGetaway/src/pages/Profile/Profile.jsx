// import React, { useState } from 'react';
// import { useUserContext } from '../../context/userContext';


// const Profile = () => {
//   const { currentUser, logout } = useUserContext();
//   const [firstName, setFirstName] = useState(currentUser.firstName);
//   const [lastName, setLastName] = useState(currentUser.lastName);

//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//   };

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//   };

//   return (
//     <div>
//       <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 h-96 flex flex-col justify-start">
//         <div className="flex">
//           <h6 className="font-bold mr-5">Name</h6>
//           <div className="flex flex-col mr-4">
//             <label className="mr-2">First Name:</label>
//             <input
//               type="text"
//               className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
//               value={firstName}
//               onChange={handleFirstNameChange}
//             />
//           </div>
//           <div className="flex flex-col mr-2">
//             <label>Last Name:</label>
//             <input
//               type="text"
//               className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
//               value={lastName}
//               onChange={handleLastNameChange}
//             />
//           <div>
//           <button className="border border-gray-700 rounded-lg px-5 py-1 h-7 ml-30">Edit</button>
//           </div>
//           </div>
//           <h6 className="font-bold mt-3">User Name</h6>
//           <div className="flex">
//             {currentUser.username}
//           </div>
//         </div>
//         <button onClick={() => logout()} className='border border-red-600 rounded-lg px-3 py-1 h-7 flex justify-center'>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';

const Profile = () => {
  const { currentUser, logout } = useUserContext();
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-100 h-96 flex flex-col justify-start">
        <div className="flex">
          <h6 className="font-bold mr-14">Name</h6>
          <div className="flex flex-col mr-5">
            <label className="mr-2">First Name:</label>
            <input
              type="text"
              className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label>Last Name:</label>
            <div className="flex items-center"> {/* Wrap both last name input and edit button */}
              <input
                type="text"
                className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <button className="border border-gray-700 rounded-lg px-5 py-0 h-7 ml-5 mb-2">Edit</button> {/* Adjust ml-2 for spacing */}
            </div>
          </div>
        </div>
        <h6 className="font-bold mt-3 ">User Name</h6>
        <div className="flex ">
          {/* {currentUser.username} */}
          <input
                type="text"
                className="border border-gray-700 rounded-lg px-3 py-1 h-7 mb-2 ml-24"
                value={currentUser.username}
                onChange={handleLastNameChange}
              />
        </div>
        <button onClick={() => logout()} className='border border-red-600 rounded-lg px-3 py-1 h-7 flex justify-center'>Logout</button>
      </div>
    </div>
  );
};

export default Profile;


