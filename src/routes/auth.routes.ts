import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma'; // y asegúrate de generar antes

import jwt from 'jsonwebtoken';

const authRouter = Router();
const prisma = new PrismaClient();

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstname,
        lastName: lastname,
      },
    });

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstName,
      lastname: newUser.lastName,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userAuth = await prisma.user.findUnique({ where: { email } });
    if (!userAuth) res.status(404).json({ message: 'user not found' });
    const isMatch = await bcrypt.compare(password, userAuth!.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        userId: userAuth!.id,
        email: userAuth!.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

export default authRouter;
