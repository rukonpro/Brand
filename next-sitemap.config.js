/** @type {import('next-sitemap').IConfig} */


module.exports = {
    siteUrl: "https://brand-rukon.vercel.app",
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/api/*'], // Exclude specific routes
    transform: async (config, path) => {
        return {
            loc: path, // The URL path
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(), // Last modification date
        };
    },
};
