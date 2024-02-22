import React from 'react';
import ForYouLeft from '../ForYou/ForYouLeft';

export default function Following({ isMobile }) {
  return (
    <div className="">
      <div className="flex h-screen">{!isMobile && <ForYouLeft />}</div>
    </div>
  );
}
