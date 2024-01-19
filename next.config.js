/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i3.ytimg.com", "img.youtube.com", "images.remotePatterns"],
    formats: ["image/webp"],
  },
};
