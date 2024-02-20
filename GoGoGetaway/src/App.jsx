import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile';
import Create from './pages/Itineraries/Create';
import SearchResults from './pages/SearchResults';
import ForYou from './pages/ForYou/ForYou';
import { useUserContext } from './context/userContext';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar';
import Following from './pages/Following/Following';
import ForYouLeft from './pages/ForYou/ForYouLeft';
import Itinerary from './pages/Itineraries/Itinerary';
function App() {
  const { loadingAuthState } = useUserContext();
  if (loadingAuthState) {
    return (
      <div className="absolute flex h-screen w-full items-center justify-center ">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="pt-[6.25rem] ">
        {/* <ForYouLeft className="" />{' '} */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/foryou" element={<ForYou />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/following" element={<Following />} />
          <Route path="/itineraries" element={<Itinerary />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
