import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaRegBookmark } from 'react-icons/fa6';
import { useUserContext } from '@/context/userContext';
import ItineraryProfile from '@/components/ItineraryList/ItineraryProfile';
export default function UserProfile() {
  const { currentUser } = useUserContext();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postedItineraries, setPostedItineraries] = useState([]);
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [likedItineraries, setLikedItineraries] = useState([]);
  const isCurrentUser = currentUser.username === username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/username/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately, such as displaying an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    const fetchItineraries = async () => {
      try {
        const response = await fetch(`http://localhost:8080/itineraries/user/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch itineraries');
        }
        const { posted, liked, saved } = await response.json();

        setPostedItineraries(posted);
        
        setLikedItineraries(liked);
        
        setSavedItineraries(saved);
        console.log(savedItineraries)
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately, such as displaying an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData(); // Call the async function immediately
    fetchItineraries();
  }, [username]);

  // Render loading indicator if user is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='sm:container flex flex-col md:flex-row md:gap-10 mt-5'>
      <Card className="sm:w-[350px] sm:h-[300px] shadow-lg rounded-xl">
        <CardHeader  >
          <CardTitle className="flex flex-col gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.photoURL} />
              <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              {user.firstName} {user.lastName}
              <CardDescription>
                @{user.username}
              </CardDescription>
            </div>

          </CardTitle>
          <CardDescription className="grid gap-3">
            <div className='grid grid-cols-4'>
              <div>
                <h1 className='font-bold text-lg'>{user.following.length}</h1>
                <h1>Following</h1>
              </div>
              <Separator orientation="vertical" className="justify-self-center" />
              <div >
                <h1 className='font-bold text-lg'>{user.followers.length}</h1>
                <h1>Followers</h1>
              </div>
            </div>
            {isCurrentUser ? <Button variant="secondary" className="w-2/3 md:text-md">Edit Profile</Button> : <Button variant="secondary" className="w-1/2 md:text-md">Follow</Button>}
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
          <Button variant="ghost" className="w-full justify-start gap-2 md:text-lg pl-1"
            onClick={() => setActiveTab('saved')}>

            <FaRegBookmark />
            Favourites
          </Button>
        </CardContent> */}
      </Card>

      <Tabs defaultValue="post" className="w-full border bg-card text-card-foreground shadow-lg rounded-xl">
        <TabsList className="w-full grid grid-cols-3 place-content-center py-6 bg-card border-b rounded-none">
          <TabsTrigger value="post" className="text-md">Posts</TabsTrigger>
          <TabsTrigger value="saved" className="text-md">Saved</TabsTrigger>
          <TabsTrigger value="like" className="text-md">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <Card className="rounded-none border-0 ">
            <CardContent className=" grid sm:grid-cols-2 gap-3">
              {postedItineraries.map((itinerary) => (
                <ItineraryProfile key={itinerary.id}  itinerary={itinerary}/>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved">
          <Card className="rounded-none border-0">
            <CardContent className="grid sm:grid-cols-2 gap-3">
              {savedItineraries.map((itinerary) => (
                <ItineraryProfile key={itinerary.id}  itinerary={itinerary}/>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="like">
          <Card className="rounded-none border-0">
            <CardContent className="grid sm:grid-cols-2 gap-3">
              {likedItineraries.map((itinerary) => (
                <ItineraryProfile key={itinerary.id} itinerary={itinerary}/>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
