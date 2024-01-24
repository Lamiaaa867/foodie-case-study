/*import supertest from 'supertest'
import {SignUp} from '../modules/user/user.controller.js'
describe('Signup API', () => {
    it('should create a new user', async () => {
      const response = await supertest(SignUp)
        .post('/signup')
        .send({
            userName:"mohamed",
          email:"mohamed2@gmail.com",
          address:"egypt",
          role:"foodie",
          phoneNumber:34555555,
            password:"mohamed",
            gender:"male"
          });
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
    });
  
    // Add more test cases as needed
  });
  */