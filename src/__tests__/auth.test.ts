import request from 'supertest';
import app from '../app'; // <-- ¡Importamos la app REAL!
import { PrismaClient } from '../generated/prisma'; // y asegúrate de generar antes
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    beforeEach(async () => {
      await prisma.user.deleteMany({}); // Limpiar usuarios antes de cada prueba
    });

    afterAll(async () => {
      await prisma.user.deleteMany({}); // Limpiar usuarios despues de cada prueba
      await prisma.$disconnect();
    });

    it('deberia registar un usuario y retonrnar 201 con el usuario creado', async () => {
      // Arrange
      const newUser = {
        email: 'testuser@examplee.com',
        password: 'Password123!',
        firstname: 'test',
        lastname: 'user',
      };
      // Act
      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBeDefined();
      expect(response.body.user.firstname).toBe('test');
      expect(response.body.user.password).toBeUndefined(); // Asegurarse de que la contraseña no se retorne
    });
  });
  //deba de este describe tenemos la logica para regisraregistrar un nuevo usuario, digo que esto es redundante porque ya el
  //test de arriba lo hace, pero lo dejo asi para ver estructura y conocer beforeeach y afterall
  describe('POST /api/aith/login', () => {
    beforeEach(async () => {
      await prisma.user.deleteMany({}); // Limpiar usuarios antes de cada prueba
      //creamos usuario de prueba
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Password123!', salt);
      await prisma.user.create({
        data: {
          email: 'naweltv@gmail.com',
          password: hashedPassword,
          firstName: 'Nawel',
          lastName: 'Taveras',
        },
      });
    });
    //aqui en este afterall borramos todos os usuarios, algo que hacemos en el beforeall
    afterAll(async () => {
      await prisma.user.deleteMany({});
      await prisma.$disconnect();
    });

    it('deberia autenticar un usuario valido, retornar code 200 y un token jwt', async () => {
      const credentials = {
        email: 'naweltv@gmail.com',
        password: 'Password123!',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});
