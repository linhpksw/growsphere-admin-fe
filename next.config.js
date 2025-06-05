// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    images: {
        domains: ['i.ibb.co', 'images.unsplash.com', 'plus.unsplash.com'],
    },

    env: {
        BASE_URL: process.env.ORGADO_SERVER_URL,
        IMGBB_URL: process.env.ORGADO_IMGBB_KEY,
    },
};
