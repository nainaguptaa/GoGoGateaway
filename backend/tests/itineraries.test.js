const request = require('supertest');
const app = require('../app'); // Adjust the path according to your app's structure

describe('Itineraries Routes', () => {
  describe('POST /create', () => {
    it('should create a new itinerary and return 201 status', async () => {
      const newItinerary = {
        userId: 'user123',
        name: 'My Itinerary',
        city: 'Philippines',
        date: '2024-02-24',
        events: [
          {
            id: 'event1',
            time: '11:27',
            typeOfActivity: 'Sightseeing',
            locationEvent: '23',
            priceEvent: 23,
          },
        ],
        restaurant: [
          {
            id: 'restaurant1',
            time: '11:27',
            cuisine: 'Indian',
            locationRestaurant: '42',
            priceRestaurant: 23,
          },
        ],
        hotel: {
          id: 'hotel1',
          time: '00:28',
          locationHotel: '312',
          priceHotel: 3,
          bookingURL: '12',
        },
        totalPrice: 49,
        images: [
          'http://res.cloudinary.com/dx0n3s9h4/image/upload/v1708795705/your_folder_name/gmzxfqjlqsdhxjyluaza.webp',
          'http://res.cloudinary.com/dx0n3s9h4/image/upload/v1708795704/your_folder_name/zhflfgrvfitot9tsjcet.jpg',
          'http://res.cloudinary.com/dx0n3s9h4/image/upload/v1708795704/your_folder_name/u2mxschbqzce4lf71sdj.jpg',
          'http://res.cloudinary.com/dx0n3s9h4/image/upload/v1708795704/your_folder_name/x7inlmyikse9gjqdgduc.jpg',
        ],
        likeCount: 4,
      };

      const response = await request(app)
       .post('/itineraries/create')
       .send(newItinerary);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Itinerary created successfully');
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 status for missing required fields', async () => {
      const incompleteItinerary = {
        // Missing userId, name, city, date, events, restaurant, hotel, totalPrice, images, likeCount
      };

      const response = await request(app)
       .post('/itineraries/create')
       .send(incompleteItinerary);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Missing required fields');
    });
  });

  describe('GET /all', () => {
    it('should return all itineraries with 200 status', async () => {
      const response = await request(app).get('/itineraries/all');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /itineraries', () => {
    it('should require a city parameter', async () => {
      const response = await request(app).get('/itineraries');
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('City parameter is required');
    });

    it('should return itineraries for a specific city', async () => {
      // Assuming there's a city named 'TestCity' in your database
      const response = await request(app).get('/itineraries?city=Calgary');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      // Add more assertions based on your data structure
    });
  });

  describe('GET /itineraries/:id', () => {
    it('should return itinerary data for a specific ID', async () => {
      // Assuming there's an itinerary with ID 'testId' in your database
      const response = await request(app).get('/itineraries/WeARHXw443QB1Os8F2gc');
      expect(response.statusCode).toBe(200);
      // Add assertions based on your expected data structure
    });
  });

});