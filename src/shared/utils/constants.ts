const DEV_URL = process.env.NEXT_PUBLIC_DEV_URL;
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
	"user-read-playback-state",
	"user-read-currently-playing",
	"user-modify-playback-state",
	"user-read-recently-played",
].join(" ");

const KEYS = {
	access_token: "access_token",
	refresh_token: "refresh_token",
	creation_time: "creation_time",
	expires_in: "expires_in",
	state: "state",
	code: "code",
} as const;

const TAGS = {
	get_user_profile: "get_user_profile",
	get_top_tracks: "get_top_tracks",
	get_top_artists: "get_top_artists",
	get_user_saved_tracks: "get_user_saved_tracks",
	get_user_playlists: "get_user_playlists",
	get_playlist: "get_playlist",
	get_search: "get_search",
	get_several_categories: "get_several_categories",
	get_single_category: "get_single_category",
	get_category_playlist: "get_category_playlist",
	get_artist: "get_artist",
	get_playback_state: "get_playback_state",
	get_available_devices: "get_available_devices",
	get_currently_playing_track: "get_currently_playing_track",
	get_recently_played_tracks: "get_recently_played_tracks",
	get_user_queue: "get_user_queue",
} as const;

const LINKS = {
	origin: DEV_URL,
	home: "/",
	login: "/api/login",
	refresh: "/api/refresh",
	logout: "/api/logout",
	category: {
		id: (id: string) => `/${id}`,
	},
	album: {
		id: (id: string) => `/album/${id}`,
	},
	artist: {
		id: (id: string) => `/artist/${id}`,
	},
	episode: {
		id: (id: string) => `/episode/${id}`,
	},
	playlist: {
		id: (id: string) => `/playlist/${id}`,
	},
	track: {
		id: (id: string) => `/track/${id}`,
	},
	search: {
		id: (id: string) => `/search/${id}`,
		albums: "/search/albums",
		artists: "/search/artists",
		genres: "/search/genres",
		playlists: "/search/playlists",
		podcastAndEpisodes: "/search/podcastAndEpisodes",
		tracks: "/search/tracks",
		users: "/search/users",
	},
	user: {
		id: (id: string) => `/user/${id}`,
	},
} as const;

const endpoint = {
	spotify: {
		origin: "https://api.spotify.com",
		tokenEndpoint: "https://accounts.spotify.com/api/token",
		authEndpoint: "https://accounts.spotify.com/authorize",
		album: {
			several: "/v1/albums",
			single: (id: string) => `/v1/albums/${id}`,
			tracks: (id: string) => `/v1/albums/${id}/tracks`,
			saved: "/v1/me/albums",
			save: "/v1/me/albums",
			remove: "/v1/me/albums",
			contains: "/v1/me/albums/contains",
			newReleases: "/v1/browse/new-releases",
		},
		artists: {
			several: "/v1/artists",
			single: (id: string) => `/v1/artists/${id}`,
			albums: (id: string) => `/v1/artists/${id}/albums`,
			topTracks: (id: string) => `/v1/artists/${id}/top-tracks`,
			realted: (id: string) => `/v1/artists/${id}/related-artists`,
		},
		audiobooks: {
			several: "/v1/audiobooks",
			single: (id: string) => `/v1/audiobooks/${id}`,
			chapters: (id: string) => `/v1/audiobooks/${id}/chapters`,
			saved: "/v1/me/audiobooks",
			save: "/v1/me/audiobooks",
			remove: "/v1/me/audiobooks",
			contains: "/v1/me/audiobooks/contains",
		},
		categories: {
			several: "/v1/browse/categories",
			single: (id: string) => `/v1/browse/categories/${id}`,
		},
		chapters: {
			several: "/v1/chapters",
			single: (id: string) => `/v1/chapters/${id}`,
		},
		episodes: {
			several: "/v1/episodes",
			single: (id: string) => `/v1/episodes/${id}`,
			saved: "/v1/me/episodes",
			save: "/v1/me/episodes",
			remove: "/v1/me/episodes",
			contains: "/v1/me/episodes/contains",
		},
		genres: {
			availableGenreSeeds: "/v1/recommendations/available-genre-seeds",
		},
		markets: {
			availableMarkets: "/v1/markets",
		},
		player: {
			state: "/v1/me/player",
			transferPlayback: "/v1/me/player",
			devices: "/v1/me/player/devices",
			currentlyPlaying: "/v1/me/player/currently-playing",
			play: "/v1/me/player/play",
			pause: "/v1/me/player/pause",
			next: "/v1/me/player/next",
			previous: "/v1/me/player/previous",
			seek: "/v1/me/player/seek",
			repeat: "/v1/me/player/repeat",
			volume: "/v1/me/player/volume",
			shuffle: "/v1/me/player/shuffle",
			recentlyPlayed: "/v1/me/player/recently-played",
			queue: "/v1/me/player/queue",
			addToQueue: "/v1/me/player/queue",
		},
		playlists: {
			several: "/v1/playlists",
			single: (id: string) => `/v1/playlists/${id}`,
			changeDetails: (id: string) => `/v1/playlists/${id}`,
			items: (id: string) => `/v1/playlists/${id}/tracks`,
			updateItems: (id: string) => `/v1/playlists/${id}/tracks`,
			addItems: (id: string) => `/v1/playlists/${id}/tracks`,
			removeItems: (id: string) => `/v1/playlists/${id}/tracks`,
			currentUserPlaylists: "/v1/me/playlists",
			userPlaylists: (id: string) => `/v1/users/${id}/playlists`,
			createPlaylist: (id: string) => `/v1/users/${id}/playlists`,
			featured: "/v1/browse/featured-playlists",
			categories: (id: string) => `/v1/browse/categories/${id}/playlists`,
			cover: (id: string) => `/v1/playlists/${id}/images`,
		},
		search: {
			search: "/v1/search",
		},
		shows: {
			several: "/v1/shows",
			single: (id: string) => `/v1/shows/${id}`,
			episodes: (id: string) => `/v1/shows/${id}/episodes`,
			saved: "/v1/me/shows",
			save: "/v1/me/shows",
			remove: "/v1/me/shows",
			contains: "/v1/me/shows/contains",
		},
		tracks: {
			several: "/v1/tracks",
			single: (id: string) => `/v1/tracks/${id}`,
			saved: "/v1/me/tracks",
			save: "/v1/me/tracks",
			remove: "/v1/me/tracks",
			contains: "/v1/me/tracks/contains",
			severalFeatures: "/v1/audio-features",
			singleFeatures: (id: string) => `/v1/audio-features/${id}`,
			analysis: (id: string) => `/v1/audio-analysis/${id}`,
			recommendations: "/v1/recommendations",
		},
		users: {
			currentProfile: "/v1/me",
			topItems: (type: string) => `/v1/me/top/${type}`,
			userProfile: (id: string) => `/v1/users/${id}`,
			followPlaylist: (id: string) => `/v1/playlists/${id}/followers`,
			unfollowPlaylist: (id: string) => `/v1/playlists/${id}/followers`,
			followedArtists: "/v1/me/following",
			followArtistOrUser: "/v1/me/following",
			unfollowArtistOrUser: "/v1/me/following",
			checkIfUserFollows: "/v1/me/following/contains",
			checkIfUserFollowsPlaylist: (id: string) =>
				`/v1/playlists/${id}/followers/contains`,
		},
	},
} as const;

export {
	CLIENT_ID,
	CLIENT_SECRET,
	DEV_URL,
	KEYS,
	LINKS,
	REDIRECT_URI,
	SCOPES,
	TAGS,
	basic,
	endpoint,
};
