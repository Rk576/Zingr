/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        swcPlugins:[
            ["next-superjson-plugin",{}]
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        domains:[
            "res.cloudinary.com",
            "avatar.githubusercontent.com",
            "lh3.googleusercontent.com"

        ]
    }

};

export default nextConfig;
