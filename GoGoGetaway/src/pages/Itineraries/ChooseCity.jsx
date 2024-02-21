import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function ChooseCity({ city, setCity, handleChange }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically open the dialog when the URL is '/create'
    if (location.pathname === '/create') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);
  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-[60rem] md:text-lg">
      <DialogHeader className="md:text-lg">
        <DialogTitle>Select City</DialogTitle>
        <DialogDescription>Please Select City to Continue</DialogDescription>
      </DialogHeader>
      <div className="flex items-center gap-4">
        {' '}
        <Label htmlFor="city" className="text-right md:text-lg">
          City
        </Label>
        <Input
          id="city"
          value={city}
          onChange={setCity}
          className="col-span-3"
        />
      </div>{' '}
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button">Save Changes</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
