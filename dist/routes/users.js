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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User"); // Import your User model
const config_1 = require("../config");
const userRouter = express_1.default.Router();
// User registration route
userRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const user = new User_1.UserModel({ username, password: hashedPassword, email });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed', error });
    }
}));
// User login route
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by username
        const user = yield User_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check if the provided password matches the hashed password in the database
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // Generate and send a JWT token for authentication
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
}));
exports.default = userRouter;
