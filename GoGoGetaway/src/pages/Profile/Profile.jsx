import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { set } from 'date-fns';
const apiURL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const { currentUser, updateCurrentUser, logout } = useUserContext();
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [editMode, setEditMode] = useState(false);

  const saveUserData = async (userData) => {
    try {
      if(!userData.firstName || !userData.lastName) {
        setFirstName(currentUser.firstName);
        setLastName(currentUser.lastName);
        throw new Error('First Name and Last Name are required');
      }
      const response = await fetch(`${apiURL}/users/${currentUser.id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to save user data');
      }
      const updatedUser = await response.json();
      updateCurrentUser(updatedUser);
      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);

    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately, such as displaying an error message
    }
  }

  return (
    <div className="mt-5 sm:container grid sm:place-items-center">
      <Card className="rounded-xl shadow-lg sm:h-[300px] sm:w-2/3 flex flex-col sm:flex-row p-2">
        <CardHeader className="justify-around items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.photoURL} />
            <AvatarFallback>
              {currentUser.firstName[0]}
              {currentUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <Button variant="secondary"
            className="md:text-md w-1/2 sm:w-full"
            onClick={() => { setEditMode(!editMode) }}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent className="pt-6 flex-1 grid grid-cols-2 gap-4">
          {editMode ? (
            <>
              <div className="grid gap-1 sm:gap-0 w-full max-w-sm items-center">
                <Label htmlFor="firstName">First Name</Label>
                <Input type="text" id="firstName" placeholder="First Name" defaultValue={currentUser.firstName} className="lg:text-md"
                  onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="grid gap-1 sm:gap-0 w-full max-w-sm items-center">
                <Label htmlFor="lastName">Last Name</Label>
                <Input type="text" id="lastName" placeholder="Last Name" defaultValue={currentUser.lastName} className="lg:text-md"
                  onChange={(e) => setLastName(e.target.value)} />
              </div>

              <div className="grid gap-1 sm:gap-0 w-full items-center col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" value={currentUser.email} className="w-full lg:text-md" />
              </div>
              <Button variant="secondary" className="grid col-span-2 w-1/2 justify-self-center"
                onClick={() => {
                  setEditMode(false);
                  // Save the updated user data
                  saveUserData({ firstName, lastName })
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <div className="grid gap-1 sm:gap-0 w-full max-w-sm items-center">
                <Label htmlFor="firstName" className="font-bold">First Name</Label>
                <Label>{firstName}</Label>
              </div>
              <div className="grid gap-1 sm:gap-0 w-full max-w-sm items-center">
                <Label htmlFor="lastName" className="font-bold">Last Name</Label>
                <Label>{lastName}</Label>
              </div>
              <div className="grid gap-1 sm:gap-0 w-full items-center col-span-2">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Label>{currentUser.email}</Label>
              </div>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

