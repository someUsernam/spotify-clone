/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: [
		// 	"i.scdn.co",
		// 	"mosaic.scdn.co",
		// 	"newjams-images.scdn.co",
		// 	"image-cdn-ak.spotifycdn.com",
		// 	"image-cdn-fa.spotifycdn.com",
		// 	"t.scdn.co",
		// 	"charts-images.scdn.co",
		// 	"thisis-images.spotifycdn.com",
		// 	"seed-mix-image.spotifycdn.com",
		// 	"seeded-session-images.scdn.co",
		// 	"daily-mix.scdn.co",
		// 	"dailymix-images.scdn.co",
		// 	"lineup-images.scdn.co",
		// ],
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
				pathname: "/**/*",
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
