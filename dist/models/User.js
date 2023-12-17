"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Create the User schema
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png',
    },
});
// Create and export the User model
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
