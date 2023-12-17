import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import userRouter from './routes/users';
import articleRouter from './routes/articles';
import verifyToken, { isAuthenticated } from './middleware/authMiddleware';
import commentsRouter from './routes/comments';


const app = express();
const PORT = process.env.PORT || 5100;
const DB_URI = 'mongodb://localhost:27017/blog';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(express.json());
app.use(cors());

app.use('/api/users', isAuthenticated, userRouter);
app.use('/api/articles', verifyToken, articleRouter);
app.use('/api/comments', verifyToken, commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
