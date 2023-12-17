import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User'; // Import your User model
import { secretKey } from '../config';

const userRouter = express.Router();


// User registration route
userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserModel({ username, password: hashedPassword, email });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed', error });
  }
});

// User login route
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate and send a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default userRouter;
