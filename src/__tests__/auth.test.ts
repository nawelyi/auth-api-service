
import request from "supertest";
import app from "../app"; // <-- ¡Importamos la app REAL!

describe('Auth Routes', () => {
    describe('POST /api/auth/register', () => {
        it('deberia registar un usuario y retonrnar 201 con el usuario creado', async () => {
            // Arrange
            const newUser = {
                email: 'testuser@example.com',
                password: 'Password123!',
                firstname: 'test',
                lastname: 'user'
            };
            // Act
            const response = await request(app)
                .post('/api/auth/register')
                .send(newUser);

            // Assert
            expect(response.status).toBe(201);
            expect(response.body.user).toBeDefined();
            expect(response.body.user.email).toBe('testuser@example.com');
            expect(response.body.user.firstname).toBe('test');
            expect(response.body.user.password).toBeUndefined(); // Asegurarse de que la contraseña no se retorne




         });   
                
    });
});