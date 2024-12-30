// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [

//       {
//         protocol: 'https',
//         hostname: 'i.ibb.co.com',
//         port: '',
//         pathname: '/**', // Allow all paths under this domain
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "imgbb.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "10x-tax-software-user-theta.vercel.app",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

