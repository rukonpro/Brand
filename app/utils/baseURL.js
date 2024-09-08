const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://brand-rukon.vercel.app';

export default baseURL;