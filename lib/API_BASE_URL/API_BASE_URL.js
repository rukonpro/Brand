const API_BASE_URL = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : process.env.API_BASE_URL;

export default API_BASE_URL