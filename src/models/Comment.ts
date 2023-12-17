// Comment.ts
import mongoose, { Schema, Document } from 'mongoose';

interface User {
    user_id: string;
    name: string;
    profile_image: string;
}

interface Comment extends Document {
    user_id: string;
    body_html: string;
    user: User;
    created_at: string;
}

const CommentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body_html: { type: String, required: true },
    user: {
        name: { type: String, required: true },
        profile_image: { type: String },
    },
    article_id: { type: String, required: true },
    created_at: { type: String, required: true },
});

const CommentModel = mongoose.model<Comment>('Comment', CommentSchema);

export default CommentModel;