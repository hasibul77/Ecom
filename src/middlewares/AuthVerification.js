import { DecodeToken } from "../utility/TokenHelper.js";

const authMiddleware = (req, res, next) => {
    // Receive Token
    let token = req.headers['token'];
    if (!token) {
        token = req.cookies?.token;
    }

    // Token Decode
    const decoded = DecodeToken(token);

    // Request Header Email + UserID Add
    if (!decoded) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        const { email, user_id } = decoded;
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
};

export default authMiddleware;
