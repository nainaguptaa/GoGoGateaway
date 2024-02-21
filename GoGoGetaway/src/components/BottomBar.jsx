import React from 'react';
import { IoHome, IoPerson } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaCompass } from 'react-icons/fa';
export default function BottomBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-background fixed relative left-0 right-0 flex w-full items-center justify-evenly border-t-2 ">
      <div className="px-4 py-3" onClick={() => navigate('/foryou')}>
        <IoHome size={25} />
      </div>
      <div className="px-4">
        <FaCompass size={25} />
      </div>
      <div className=" px-4">
        <MdAdd size={25} />
      </div>
      <div className="px-4" onClick={() => navigate('profile')}>
        <IoPerson size={25} />
      </div>
    </div>
  );
}
