"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const articles_1 = __importDefault(require("./routes/articles"));
const authMiddleware_1 = __importStar(require("./middleware/authMiddleware"));
const comments_1 = __importDefault(require("./routes/comments"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5100;
const DB_URI = 'mongodb://localhost:27017/blog';
mongoose_1.default.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', authMiddleware_1.isAuthenticated, users_1.default);
app.use('/api/articles', authMiddleware_1.default, articles_1.default);
app.use('/api/comments', authMiddleware_1.default, comments_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
