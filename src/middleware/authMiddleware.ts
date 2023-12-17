import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Get the token from the request headers or cookies
    let token = req.headers.authorization || req.cookies.token;
    
    if (!token) {
        return res.status(401).json({success: false, message: 'Unauthorized' });
    }
    // remove 'Bearer' from the token and trim spaces
    token = token.replace('Bearer', '').trim();
    
    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            console.log(err)
            return res.status(401).json({success: false,  message: 'Unauthorized' });
        }

        // Attach the authenticated user to the request object
        (req as any).user = user;

        next();
    });
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the request headers or cookies
    const token = req.headers.authorization;

    if (token) {
        return res.status(401).json({success: false, message: 'Already connected' });
    }
    next();
}

export default verifyToken;
