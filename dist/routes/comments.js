"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// commentsRoutes.ts
const express_1 = __importDefault(require("express"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = require("../models/User");
const commentsRouter = express_1.default.Router();
// Route to create a new comment
commentsRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body_html, user_id, article_id } = req.body;
        const user = yield User_1.UserModel.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Create a new comment
        const comment = new Comment_1.default({
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
        yield comment.save();
        res.status(201).json({ message: 'Comment created successfully', comment });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Comment creation failed', error });
    }
}));
// Route to fetch list of comments from db related to article id in params and sort them in a ascending order based on creation date
commentsRouter.get('/:articleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId } = req.params;
        // Fetch all comments related to the article id
        const comments = yield Comment_1.default.find({ article_id: articleId }).sort({ createdAt: 'asc' });
        res.status(200).json({ message: 'Comments fetched successfully', comments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Comments fetch failed', error });
    }
}));
exports.default = commentsRouter;
