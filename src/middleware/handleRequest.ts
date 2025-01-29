import { Request, RequestHandler, Response } from 'express';
import { registerError } from '../errors/registerError';
import { getJWTToken } from '../services/User';

// Define interface to extend Request with user property
interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type
}

export function handleRequest(fn: (req: AuthenticatedRequest, res: Response) => Promise<Response>): RequestHandler {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const originalJson = res.json.bind(res);
            res.json = (body) => {
                if ((req as AuthenticatedRequest).user) {
                    res.set('extended-token', getJWTToken((req as AuthenticatedRequest).user));
                }
                return originalJson(body);
            };
            await fn(req as AuthenticatedRequest, res);
        } catch (e) {
            if (e instanceof registerError) {
                res.status(400).json({ success: false, message: e.message, field: e.field });
                return;
            }
            console.error(e);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };
}