import React from 'react';
import { IoHome, IoPerson } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FaCompass } from 'react-icons/fa';
export default function BottomBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-background sticky left-0 right-0 flex w-full items-center justify-center gap-16 border-t-2 ">
      <div className="h-full  px-4 py-4" onClick={() => navigate('/foryou')}>
        <IoHome size={35} />
      </div>
      <div className=" px-4 py-4">
        <FaCompass size={35} />
      </div>
      <div className=" px-4 py-4">
        <MdAdd size={35} />
      </div>
      <div className=" px-4 py-4" onClick={() => navigate('profile')}>
        <IoPerson size={35} />
      </div>
    </div>
  );
}
