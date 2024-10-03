/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/crS49sPQag93IjYdYatJlA/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent-sea1-1.xx.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
