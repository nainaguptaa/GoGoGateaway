import SearchBar from '@/components/SearchBar';
import React from 'react';

export default function Search({ isMobile }) {
  return (
    <div className="pt-[-3rem] shadow">
      <SearchBar isMobile={isMobile} />
    </div>
  );
}
