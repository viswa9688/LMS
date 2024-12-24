import request from 'supertest';
import { createApp } from '../../../config/app.js';
import { connectDB, closeDB, clearDB } from '../../../utils/test-utils/db.js';
import { createTestUser } from '../../../utils/test-utils/auth.js';

describe('Course Controller', () => {
  let app;
  let instructorToken;
  let instructor;

  beforeAll(async () => {
    await connectDB();
    app = createApp();
    instructor = await createTestUser({ role: 'instructor' });
    instructorToken = instructor.generateAuthToken();
  });

  afterAll(async () => {
    await clearDB();
    await closeDB();
  });

  describe('POST /api/courses', () => {
    const validCourse = {
      title: 'Test Course',
      description: 'This is a test course description that meets the minimum length requirement',
      thumbnail: 'https://example.com/image.jpg',
      category: 'programming',
      level: 'beginner',
      price: 99.99,
      language: 'English',
    };

    test('creates course with valid data', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send(validCourse);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(validCourse.title);
    });

    test('fails when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'Test',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('fails with invalid price', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          ...validCourse,
          price: -10,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('sanitizes course data', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          ...validCourse,
          title: '  Test Course with Spaces  ',
          description: '  Description with spaces  ',
        });

      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe('Test Course with Spaces');
      expect(response.body.data.description).toBe('Description with spaces');
    });
  });

  describe('GET /api/courses/:id', () => {
    let courseId;

    beforeEach(async () => {
      const course = await request(app)
        .post('/api/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'Test Course',
          description: 'Test description that meets the minimum length requirement',
          thumbnail: 'https://example.com/image.jpg',
          category: 'programming',
          level: 'beginner',
          price: 99.99,
          language: 'English',
        });

      courseId = course.body.data.id;
    });

    test('retrieves course by id', async () => {
      const response = await request(app)
        .get(`/api/courses/${courseId}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(courseId);
    });

    test('returns 404 for non-existent course', async () => {
      const response = await request(app)
        .get('/api/courses/nonexistentid');

      expect(response.status).toBe(404);
    });
  });
});