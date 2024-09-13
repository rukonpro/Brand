import jwt from 'jsonwebtoken';

// Middleware function to authorize users based on multiple roles
export function authorize(allowedRoles = []) {
    return async (req, res) => {
        try {
            // Get the token from the Authorization header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Access Denied: No token provided' });
            }

            // Extract token from the header
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Access Denied: No token found' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            // Check if the user's role is in the allowedRoles array
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Access Denied: Unauthorized role' });
            }

            // Attach user to the request
            req.user = decoded;

            // Proceed with the API logic
            return req;
        } catch (err) {
            console.error('Authorization error:', err.message);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
}
