import React, { useState } from 'react';
import axios from 'axios';
import Event from './Event';
import Hotel from './Hotel';
import Restaurant from './Restaurant';


const Create = () => {
    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Adjusted to match the backend expectation
            const response = await axios.post('http://localhost:3000/itineraries/create', { data: formData });
          
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Create Itinerary</h1>
            <form onSubmit={handleSubmit}>
                {/* Assuming Event, Hotel, and Restaurant components correctly update formData */}
                <Event onChange={handleChange}></Event>
                <Hotel onChange={handleChange}></Hotel>
                <Restaurant onChange={handleChange}></Restaurant>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Create;