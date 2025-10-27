import request from 'supertest';
import app from '../app'; // <-- ¡Importamos la app REAL!

describe('GET /api/health', () => {
  it('debería retornar 200 y un mensaje de estado "UP"', async () => {
    // Act
    const response = await request(app).get('/api/health'); // <-- Usamos la app real

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'UP',
      message: 'Servidor base saludable',
    });
  });
});