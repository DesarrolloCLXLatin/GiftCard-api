import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'YammaCafé') {
    return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
