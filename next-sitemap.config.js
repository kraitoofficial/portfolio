/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kraito.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    additionalSitemaps: ["https://kraito.com/sitemap.xml"],
  },
  exclude: ["/api/*"],
  changefreq: "weekly",
  priority: 0.7,
};
