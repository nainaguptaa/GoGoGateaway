import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaEarthAsia, FaFloppyDisk, FaPhone } from 'react-icons/fa6';
import { GiPalmTree } from 'react-icons/gi';
import Signup from '@/pages/Auth/Signup';
import { useUserContext } from '@/context/userContext';
export default function SignUpReminder({ setPopup }) {
  const { signPopup, setSignPopup } = useUserContext();
  // Effect to run once on mount and cleanup on unmount
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const why = [
    {
      icon: <FaEarthAsia size={35} />,
      title: 'Personalized Travel Suggestions',
      description:
        'Tailor your travel feed. Discover itineraries that match your travel dreams and preferences.',
    },
    {
      icon: <FaFloppyDisk size={35} />,
      title: 'Save and Customize Itineraries',
      description:
        'Your travels, your way. Easily save drafts, make changes, and plan your trip with flexibility.',
    },
    {
      icon: <GiPalmTree size={45} />,
      title: 'Get Exclusive Community Tips',
      description:
        'Tap into the knowledge of our travel community. Get insider tips and tricks to enhance your itineraries.',
    },
    {
      icon: <FaPhone size={45} />,
      title: '24/7 Support',
      description:
        'We’re here for you, around the clock. Get assistance whenever you need it, wherever your travels take you.',
    },
  ];
  if (signPopup) {
    return (
      <>
        <div className="text-lg">
          <Signup />
        </div>
      </>
    );
  }
  return (
    <div className="absolute top-0 z-40 flex h-screen w-full items-center justify-center bg-black/80 backdrop-blur">
      <div className="absolute right-10 top-10">
        <IoMdClose
          size={35}
          onClick={() => setPopup((prev) => !prev)}
          className="ease cursor-pointer transition duration-100 hover:brightness-125"
        />
      </div>
      <div className=" flex w-4/5 items-center gap-8 p-5">
        <div className="flex flex-col gap-2">
          <div className="text-primary text-4xl font-bold">
            Hold on a second...
          </div>
          <div className="text-2xl font-light">
            To keep your travel plans safe, sign up with us! It only takes a
            minute to join our community.
          </div>
          <button
            onClick={() => setSignPopup((prev) => !prev)}
            className="ease mt-3 w-1/3 rounded-xl bg-cyan-400 px-3 py-2 text-xl text-white transition duration-200 hover:brightness-110"
          >
            Sign Up Now
          </button>
        </div>
        <div className="border-background flex flex-col gap-4 rounded-xl border-2 bg-gray-700/30 p-4">
          <div className="text-xl font-semibold">Why Join GoGoGetaway?</div>
          <div className="flex flex-col gap-5">
            {why.map((item, index) => (
              <div key={index} className="flex gap-4">
                {item.icon}
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-lg font-light">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
