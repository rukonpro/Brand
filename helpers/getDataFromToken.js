import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const session = request.cookies.get("session")?.value || '';
        const decodedToken = jwt.verify(session, process.env.SECRET_KEY);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }

}