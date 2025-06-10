/* @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This line tells Next.js to export your application as static HTML
  // You can add other Next.js configurations here if needed
  basePath: '', // For reponame.github.io, use your repo name
  trailingSlash: true,
};

module.exports = nextConfig;