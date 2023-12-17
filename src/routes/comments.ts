// commentsRoutes.ts
import express, { Request, Response } from 'express';
import CommentModel from '../models/Comment';
import { UserModel } from '../models/User';

const commentsRouter = express.Router();

// Route to create a new comment
commentsRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const { body_html, user_id, article_id } = req.body;

        const user = await UserModel.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create a new comment
        const comment = new CommentModel({
            body_html,
            user_id,
            user: {
                name: user.username,
                profile_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png',
            },
            article_id,
            created_at: new Date().toISOString(),
         });

        // Save the comment to the database
        await comment.save();

        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Comment creation failed', error });
    }
});

// Route to fetch list of comments from db related to article id in params and sort them in a ascending order based on creation date
commentsRouter.get('/:articleId', async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;

        // Fetch all comments related to the article id
        const comments = await CommentModel.find({ article_id: articleId }).sort({ createdAt: 'asc' });

        res.status(200).json({ message: 'Comments fetched successfully', comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Comments fetch failed', error });
    }
});

export default commentsRouter;
