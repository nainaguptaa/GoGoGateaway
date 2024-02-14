import React from 'react'

const Hotel = ({handleChange}) => {
    return (
        <div>
            <h1>Hotel</h1>
            <label htmlFor="hotel">Hotel Name</label>
            <input type="text" id="hotel" name="hotel" placeholder="Hotel Name" onChange={handleChange} />
            <label htmlFor="rating">Rating</label>
            <input type="number" id="rating" name="ratingHotel" placeholder="Rating" onChange={handleChange} />
            <label htmlFor="bookingURL">Booking URL</label>
            <input type="text" id="bookingURL" name="bookingURL" placeholder="Booking URL" onChange={handleChange} />
            <label htmlFor="imageURL">Image URL</label>
            <input type="text" id="imageURL" name="imageURL" placeholder="Image URL" onChange={handleChange} />
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="locationHotel" placeholder="Location" onChange={handleChange} />
        </div>
    )
}

export default Hotel