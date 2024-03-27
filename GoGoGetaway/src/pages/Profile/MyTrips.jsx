import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaRegBookmark } from 'react-icons/fa6';
import { useUserContext } from '@/context/userContext';
export default function UserProfile() {
  const { currentUser } = useUserContext();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log(user);
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately, such as displaying an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // const fetchItineraries = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:8080/itineraries/user/${username}`);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch itineraries');
    //     }
    //     // const itineraries = await response.json();
    //     // setItineraries(itineraries);
    //   } catch (error) {
    //     console.error('Error:', error);
    //     // Handle error appropriately, such as displaying an error message
    //   } finally {
    //     setLoading(false); // Set loading to false regardless of success or failure
    //   }
    // };

    fetchData(); // Call the async function immediately
    // fetchItineraries();
  }, [username]);

  // Render loading indicator if user is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='sm:container md:flex gap-10 mt-5'>
      <Card className="sm:w-[350px] shadow-lg">
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
            {isCurrentUser ? <Button variant="secondary" className="w-1/2 md:text-md">Edit Profile</Button> : <Button variant="secondary" className="w-1/2 md:text-md">Follow</Button>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="w-full justify-start gap-2 md:text-lg pl-1">
            <FaRegBookmark />
            Favourites
          </Button>
        </CardContent>
      </Card>
      <Tabs defaultValue="post" className="w-full border rounded-lg bg-card text-card-foreground shadow-lg">
        <TabsList className="w-full grid grid-cols-3 place-content-center py-6 bg-card border-b">
          <TabsTrigger value="post" className="text-md">Posts</TabsTrigger>
          <TabsTrigger value="saved" className="text-md">Saved</TabsTrigger>
          <TabsTrigger value="like" className="text-md">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">

          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
        </TabsContent>
        <TabsContent value="saved">Change your password here.</TabsContent>
        <TabsContent value="like">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
