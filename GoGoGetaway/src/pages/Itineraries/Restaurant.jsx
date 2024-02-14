import React from 'react'

const Restaurant = ({handleChange}) => {
    return (
        <div>
            <h1>Restaurant</h1>
            <label htmlFor="restaurant">Restaurant Name</label>
            <input type="text" id="restaurant" name="restaurant" placeholder="Restaurant Name" onChange={handleChange} />
            <label htmlFor="rating">Rating</label>
            <input type="number" id="rating" name="rating" placeholder="Rating" onChange={handleChange} />
            <label htmlFor="cuisine">Cuisine</label>
            <select id="cuisine" name="cuisine" onChange={handleChange}>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="indian">Indian</option>
                <option value="french">French</option>
            </select>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" placeholder="Location" onChange={handleChange} />
        </div>
    )
}

export default Restaurant