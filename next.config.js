/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend-8000-audiomesh.onrender.com',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
