const request = require("supertest");
const app = require("../app");

describe('Test web checker path', () => {
  it('should respond to the POST method with valid URLs', async () => {
    const response = await request(app)
      .post('/api/check-urls')
      .send({
        urls: ['https://example.com', 'https://google.com']
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('webStatus');
    expect(response.body).toHaveProperty('up');
    expect(response.body).toHaveProperty('down');
    expect(response.body).toHaveProperty('total');

    expect(Array.isArray(response.body.webStatus)).toBe(true);
    response.body.webStatus.forEach(item => {
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('status');
    });

    expect(response.body.up).toBe(2);
    expect(response.body.down).toBe(0);
    expect(response.body.total).toBe(2);
  });

  it('should handle invalid URLs', async () => {
    const response = await request(app)
      .post('/api/check-urls')
      .send({
        urls: ['https://example.com', 'https://nonexistenturl.fake']
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('webStatus');
    expect(response.body).toHaveProperty('up');
    expect(response.body).toHaveProperty('down');
    expect(response.body).toHaveProperty('total');

    expect(Array.isArray(response.body.webStatus)).toBe(true);
    response.body.webStatus.forEach(item => {
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('status');
    });

    expect(response.body.up).toBe(1);
    expect(response.body.down).toBe(1);
    expect(response.body.total).toBe(2);
  });

  it('should handle an empty URL list', async () => {
    const response = await request(app)
      .post('/api/check-urls')
      .send({
        urls: []
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should handle invalid payload', async () => {
    const response = await request(app)
      .post('/api/check-urls')
      .send({
        urlList: ['https://example.com', 'https://google.com']
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('URLs should be an array');
  });

  it('should handle timeout errors', async () => {
    const response = await request(app)
      .post('/api/check-urls')
      .send({
        urls: ['http://10.255.255.1']
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('webStatus');
    expect(response.body).toHaveProperty('up');
    expect(response.body).toHaveProperty('down');
    expect(response.body).toHaveProperty('total');

    expect(Array.isArray(response.body.webStatus)).toBe(true);
    response.body.webStatus.forEach(item => {
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('status');
    });

    expect(response.body.up).toBe(0);
    expect(response.body.down).toBe(1);
    expect(response.body.total).toBe(1);
  }, 10000);
});
