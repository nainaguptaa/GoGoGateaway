import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile/Profile';
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
import Signup from './pages/Auth/Signup';
import MyTrips from './pages/Profile/MyTrips';
import { Toaster } from './components/ui/toaster';
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
  const [iconSize, setIconSize] = useState(35); // Default size

  // Function to update the icon size based on the window width
  const updateIconSize = () => {
    if (window.innerWidth < 375) {
      // Example breakpoint for 'sm' screen
      setIconSize(20); // Smaller size for small screens
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      // 'md' to 'lg'
      setIconSize(40); // Medium size for medium screens
    } else {
      setIconSize(35); // Default size for larger screens
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateIconSize);
    // Set initial size on component mount
    updateIconSize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const { loadingAuthState, signPopup } = useUserContext();
  if (loadingAuthState) {
    return (
      <div className="absolute flex h-screen w-full items-center justify-center ">
        <Loading />
      </div>
    );
  }
  // if (isMobile) {
  //   return <Navigate to="/foryou" replace />;
  // }

  return (
    <>
      {signPopup && <Signup />}
      <Navbar isMobile={isMobile} iconSize={iconSize} />
      <div className=" lg:pt-[6.25rem] ">
        {/* <ForYouLeft className="" />{' '} */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/foryou"
              element={<ForYou isMobile={isMobile} iconSize={iconSize} />}
            />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/following"
              element={<Following isMobile={isMobile} />}
            />
            <Route path="/itineraries" element={<Itinerary />} />{' '}
            <Route path="/create" element={<Create />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Navigate to="/ " replace />} />
            <Route path="/my-trips" element={<MyTrips />} />
          </Routes>
        </Suspense>
      </div>
      {isMobile && (
        <div className="fixed bottom-0 w-full">
          <BottomBar iconSize={iconSize} />
        </div>
      )}
      <Toaster />
    </>
  );
}

export default App;
