"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function verifyToken(req, res, next) {
    // Get the token from the request headers or cookies
    let token = req.headers.authorization || req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    // remove 'Bearer' from the token and trim spaces
    token = token.replace('Bearer', '').trim();
    jsonwebtoken_1.default.verify(token, config_1.secretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        // Attach the authenticated user to the request object
        req.user = user;
        next();
    });
}
const isAuthenticated = (req, res, next) => {
    // Get the token from the request headers or cookies
    const token = req.headers.authorization;
    if (token) {
        return res.status(401).json({ success: false, message: 'Already connected' });
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
exports.default = verifyToken;
