const DEV_URL = process.env.NEXT_PUBLIC_DEV_URL;
const SPOTIFY_API_ORIGIN = "https://api.spotify.com";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const SCOPES = [
	"user-read-private",
	"user-read-email",
	"user-library-read",
	"user-library-modify",
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-private",
	"playlist-modify-public",
	"user-top-read",
].join(" ");

export {
	AUTH_ENDPOINT,
	CLIENT_ID,
	CLIENT_SECRET,
	DEV_URL,
	REDIRECT_URI,
	SCOPES,
	SPOTIFY_API_ORIGIN,
	TOKEN_ENDPOINT,
	basic,
};
