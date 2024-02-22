import SearchableMap from '@/components/SearchableMap';
import Error from '@/components/ui/Error';
import React, { useState } from 'react';

export default function Test() {
  const [address, setAddress] = useState('');
  return (
    <div className="mt-8">
      <Error />
    </div>
  );
}
