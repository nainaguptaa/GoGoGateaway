const request = require('supertest');
const app = require('../app.js'); 

// run npm test to run 
describe('POST /itineraries/create', () => {
    // test('It should respond with 201 status code for successful itinerary creation', async () => {
    //   // Create a mock itinerary data for testing
    //   const mockData = {
    //     userId: 'testUser',
    //     name: 'Test Itinerary',
    //     city: 'Test City',
    //     date: '2022-12-31',
    //     events: [{ id: 'event1', ratingEvent: '4.5', time: '10:00', typeOfActivity: 'Sightseeing', locationEvent: 'Event Location', priceEvent: '50' }],
    //     restaurant: [{ id: 'restaurant1', ratingRestaurant: '4.2', priceRestaurant: '30', cuisine: 'Italian', locationRestaurant: 'Restaurant Location' }],
    //     hotel: { id: 'hotel1', ratingHotel: '4.0', priceHotel: '100', locationHotel: 'Hotel Location', bookingURL: 'www.hotel.com' },
    //     images: ['image1.jpg', 'image2.jpg'],
    //     totalPrice: 180,
    //   };
  
    //   const response = await request(app)
    //     .post('/itineraries/create')
    //     .send(mockData);
  
    //   expect(response.statusCode).toBe(201);
    //   expect(response.body).toHaveProperty('message', 'Itinerary created successfully');
    //   expect(response.body).toHaveProperty('id');
    // });
  
    test('It should respond with 400 status code if required fields are missing', async () => {
      // Create a mock itinerary data with missing required fields for testing
      const mockData = {
        userId: 'testUser',
        // Missing 'events', 'restaurant', and 'hotel' fields
      };
  
      const response = await request(app)
        .post('/itineraries/create')
        .send(mockData);
  
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe('GET /itineraries/all', () => {
    test('It should respond with all itineraries', async () => {
      const response = await request(app)
        .get('/itineraries/all');
  
      expect(response.statusCode).toBe(200);
      // Add more expectations based on the structure of the returned itineraries
    });
  });
  

  

  
  describe('GET /itineraries', () => {
    test('It should respond with itineraries based on the specified location', async () => {
      const response = await request(app)
        .get('/itineraries?location=TestLocation');
  
      expect(response.statusCode).toBe(200);
      // Add more expectations based on the returned itineraries
    });
  
    test('It should respond with 400 status code if location parameter is missing', async () => {
      const response = await request(app)
        .get('/itineraries');
  
      expect(response.statusCode).toBe(400);
    });
  });
  

  
  describe('POST /itineraries/:id/comments', () => {
    test('It should add a comment to a specific itinerary', async () => {
      const response = await request(app)
        .post('/itineraries/ItineraryID/comments')
        .send({
          userId: 'NewTestUser',
          text: 'This is a test comment.',
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Comment added successfully');
    });
  
    test('It should respond with 400 status code if required fields are missing', async () => {
      const response = await request(app)
        .post('/itineraries/ItineraryID/comments')
        .send({
          userId: 'testUser',
          // Missing 'text' field
        });
  
      expect(response.statusCode).toBe(400);
    });
  });
  
  describe('GET /itineraries/:id/comments', () => {
    test('It should respond with comments for a specific itinerary', async () => {
      const response = await request(app)
        .get('/itineraries/ItineraryID/comments');
  
      expect(response.statusCode).toBe(200);
      // Add more expectations based on the structure of the returned comments
    });
  });
  
  describe('DELETE /itineraries/:itineraryId/comments/:commentId', () => {
    test('It should delete a specific comment from an itinerary', async () => {
      const response = await request(app)
        .delete('/itineraries/ItineraryID/comments/CommentID');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Comment deleted successfully');
    });
  });
// describe('POST /itineraries/:id/comments', () => {
//   test('It should respond with 201 status code for successful comment addition', async () => {
//     const response = await request(app)
//       .post('/itineraries/WeARHXw443QB1Os8F2gc/comments') 
//       .send({
//         userId: 'testUser',
//         text: 'This is a test comment.',
//       });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.message).toBe('Comment added successfully');
//   });

//   test('It should respond with 400 status code if required fields are missing', async () => {
//     const response = await request(app)
//       .post('/itineraries/WeARHXw443QB1Os8F2gc/comments')
//       .send({
//         userId: 'testUser',
//         // Missing 'text' field
//       });
//     expect(response.statusCode).toBe(400);
//   });
// });