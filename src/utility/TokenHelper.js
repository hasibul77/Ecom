import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ quiet: true }); // Load environment variables from .env

const KEY = process.env.JWT_SECRET; // Use secret from .env

export const EncodeToken = (email, user_id) => {
    const EXPIRE = { expiresIn: '168h' };
    const PAYLOAD = { email, user_id };
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {
    try {
        return jwt.verify(token, KEY);
    } catch (e) {
        return null;
    }
};
