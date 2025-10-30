import { Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma'; // y asegúrate de generar antes


const authRouter = Router();
const prisma = new PrismaClient();

authRouter.post('/register', async ( req: Request, res: Response) => {
    try {
        const {email, password, firstname, lastname} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstname,
                lastName: lastname
            }
        })

        const userResponse = {
            id: newUser.id,
            email: newUser.email,
            firstname: newUser.firstName,
            lastname: newUser.lastName

        }

        res.status(201).json({ user: userResponse });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});


export default authRouter;