// Importamos 'request' de supertest para simular peticiones HTTP
import request from 'supertest';

// Importamos express (y sus tipos) para crear una app de prueba
import express, { Request, Response } from 'express';

// --- Configuración de la App de Prueba ---
// Vamos a crear una mini-app de Express aquí mismo
// que tenga solo la ruta que queremos probar.
const app = express();
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Servidor base saludable' });
});


// --- La Prueba ---

// 'describe' agrupa pruebas relacionadas. Es el título del reporte.
describe('GET /api/health', () => {

  // 'it' (o 'test') es la prueba individual.
  // Describe lo que la prueba debe hacer.
  it('debería retornar 200 y un mensaje de estado "UP"', async () => {
    
    // 1. Arrange (Organizar)
    // No necesitamos organizar nada, la 'app' ya está lista.

    // 2. Act (Actuar)
    // Usamos supertest (request) para hacer una petición GET a nuestra 'app'.
    const response = await request(app).get('/api/health');

    // 3. Assert (Afirmar)
    // Usamos 'expect' de Jest para verificar que los resultados son correctos.
    expect(response.status).toBe(200); // ¿El código de estado fue 200?
    expect(response.body).toEqual({    // ¿El JSON del cuerpo es exactamente este?
      status: 'UP',
      message: 'Servidor base saludable',
    });
  });

});