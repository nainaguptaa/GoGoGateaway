import React, { useState, useEffect } from 'react';
import { IoHome, IoPerson } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { useUserContext } from '@/context/userContext';
import { FaCompass } from 'react-icons/fa';
export default function BottomBar({ iconSize }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 375);
  const { currentUser, setSignPopup } = useUserContext();
  const userName = currentUser && currentUser.username;
  // console.log(currentUser);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 375);
    };

    window.addEventListener('resize', handleResize);
    // Call handleResize initially in case the initial window size is mobile
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleProfile = () => {
    if (!currentUser) {
      setSignPopup(true);
      return;
    }
    navigate(`/user/${userName}`);
  };
  const navigate = useNavigate();
  return (
    <div className="sticky left-0 right-0 flex w-full items-center justify-center gap-12 border-t-2 bg-background md:gap-16 ">
      <div
        className="h-full  py-2 sm:px-4 sm:py-4"
        onClick={() => navigate('/foryou')}
      >
        <IoHome size={iconSize} />
      </div>
      {/* <div className="  py-2 sm:px-4 sm:py-4">
        <FaCompass size={iconSize} />
      </div> */}
      <div
        className=" py-2 sm:px-4 sm:py-4"
        onClick={() => navigate('/create')}
      >
        <MdAdd size={iconSize} />
      </div>
      <div className="py-2 sm:px-4 sm:py-4" onClick={() => handleProfile()}>
        <IoPerson size={iconSize} />
      </div>
    </div>
  );
}
