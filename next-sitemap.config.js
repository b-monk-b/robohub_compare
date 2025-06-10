/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://robohub.com', // Change this to your production URL
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://robohub.com/sitemap.xml',
      'https://robohub.com/server-sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml'],
  generateIndexSitemap: true,
  outDir: 'out',
  // Add any additional configuration options here
}
