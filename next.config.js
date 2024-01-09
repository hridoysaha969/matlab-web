/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i3.ytimg.com", "img.youtube.com"],
    formats: ["image/webp"],
  },
};
