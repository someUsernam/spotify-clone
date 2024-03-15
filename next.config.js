/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "mosaic.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "newjams-images.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "image-cdn-ak.spotifycdn.com",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "image-cdn-fa.spotifycdn.com",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "t.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "charts-images.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "thisis-images.spotifycdn.com",
			},
			{
				protocol: "https",
				hostname: "seed-mix-image.spotifycdn.com",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "seeded-session-images.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "daily-mix.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "dailymix-images.scdn.co",
				pathname: "/**/*",
			},
			{
				protocol: "https",
				hostname: "lineup-images.scdn.co",
				pathname: "/**/*",
			},
		],
	},
};

module.exports = nextConfig;
