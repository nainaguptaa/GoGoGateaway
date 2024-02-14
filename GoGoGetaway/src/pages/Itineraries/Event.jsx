import React from 'react'

const Event = ({handleChange}) => {
    return (
        <div>
            <h1>Event</h1>
            <label htmlFor="event">Event Name</label>
            <input type="text" id="event" name="event" placeholder="Event Name" onChange={handleChange} />
            <label htmlFor="rating">Rating</label>
            <input type="number" id="rating" name="rating" placeholder="Rating" onChange={handleChange} />
            <label htmlFor="typeOfActivity">Type of Activity</label>
            <select id="typeOfActivity" name="typeOfActivity" onChange={handleChange}>
                <option value="sightseeing">Sightseeing</option>
                <option value="dining">Dining</option>
                <option value="shopping">Shopping</option>
                <option value="outdoors">Outdoors</option>
                <option value="entertainment">Entertainment</option>
            </select>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" placeholder="Location" onChange={handleChange} />
        </div>
    )
}

export default Event