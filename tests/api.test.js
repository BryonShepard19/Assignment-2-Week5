const request = require('supertest');
const app = require('../server');

describe('Books API', () => {

  it('GET /api/books - should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/books/1 - should return a book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('GET /api/books/999 - should return 404', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toBe(404);
  });

  it('POST /api/books - should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: "New Book",
        author: "Test Author"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Book");
  });

  it('PUT /api/books/1 - should update a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({
        title: "Updated Title"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it('PUT /api/books/999 - should return 404', async () => {
    const res = await request(app)
      .put('/api/books/999')
      .send({ title: "No Book" });

    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/books/1 - should delete a book', async () => {
    const res = await request(app).delete('/api/books/1');
    expect(res.statusCode).toBe(200);
  });

  it('DELETE /api/books/999 - should return 404', async () => {
    const res = await request(app).delete('/api/books/999');
    expect(res.statusCode).toBe(404);
  });

});
