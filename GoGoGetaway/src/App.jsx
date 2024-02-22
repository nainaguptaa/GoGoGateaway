import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile';
const Create = lazy(() => import('./pages/Itineraries/Create'));
// import Create from './pages/Itineraries/Create';
const SearchResults = lazy(() => import('./pages/SearchResults'));
// import SearchResults from './pages/SearchResults';
import ForYou from './pages/ForYou/ForYou';
import { useUserContext } from './context/userContext';
import Loading from './components/Loading/Loading';
import Navbar from './components/Navbar';
const Following = lazy(() => import('./pages/Following/Following'));
// import Following from './pages/Following/Following';
import ForYouLeft from './pages/ForYou/ForYouLeft';
const Itinerary = lazy(() => import('./pages/Itineraries/Itinerary'));
// import Itinerary from './pages/Itineraries/Itinerary';
import Test from './pages/Test';
import BottomBar from './components/BottomBar';
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    // Call handleResize initially in case the initial window size is mobile
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <Navbar isMobile={isMobile} />
      <div className=" lg:pt-[6.25rem] ">
        {/* <ForYouLeft className="" />{' '} */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/foryou" element={<ForYou isMobile={isMobile} />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/following" element={<Following />} />
            <Route path="/itineraries" element={<Itinerary />} />{' '}
            <Route path="/create" element={<Create />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </div>
      {isMobile && (
        <div className="absolute bottom-0 w-full">
          <BottomBar />
        </div>
      )}
    </>
  );
}

export default App;
