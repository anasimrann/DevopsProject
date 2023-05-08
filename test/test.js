
const request = require('supertest');
const { app, server } = require('../index');
const myEmployees = require('../employees');

afterAll(async () => {
    await server.close();
});

describe('GET /api/get/employee', () => {
    it('should return all employees', async () => {
        const response = await request(server).get('/api/get/employee');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(myEmployees);
        expect(response.body.length).toBe(10);
    });

    it('should return 10 employees', async () => {
        const response = await request(app).get('/api/get/employee');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(10);
    });
});

describe('POST /api/find/employee', () => {
    it('should return the employee with the given name', async () => {
        const name = 'John Doe'; // assuming this is a valid employee name
        const response = await request(app)
            .post('/api/find/employee')
            .send({ name });
        expect(response.status).toBe(200);
        expect([response.body]).toEqual([
            {
                name: 'John Doe',
                designation: 'Manager',
                salary: 100000,
                age: 35,
                experience: 8,
                roles: ['Team Management', 'Strategic Planning']
            }
        ]);
    });

    it('should return a 400 status if the employee is not found', async () => {
        const name = 'Invalid Name'; // assuming this is an invalid employee name
        const response = await request(app)
            .post('/api/find/employee')
            .send({ name });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'employee not found' });
    });
});