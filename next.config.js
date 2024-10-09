module.exports = {
    
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rukonpro.imgbb.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'adminapi.applegadgetsbd.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'chenabazar.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.imghippo.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.imghippo.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            }
        ],
    },

    plugins: [
        require('tailwind-scrollbar-hide')
    ],
};
