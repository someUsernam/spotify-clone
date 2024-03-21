// primitives

type QueryProps = {
	params: {
		query: string;
	};
};

type CommonTypes<T> = {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	type: T;
	uri: string;
};

//TODO: Image type for height and width might be null
type Image = {
	url: string;
	height: number;
	width: number;
};

type Follower = {
	href: string | null;
	total: number;
};

type Restriction = {
	reason: string;
} | null;

type ExternalId = {
	isrc: string;
	ean: string;
	upc: string;
};

type ExplicitContent = {
	filter_enabled: boolean;
	filter_locked: boolean;
};

type User = {
	followers: Follower;
} & CommonTypes<"TODO">;

type Owner = User & {
	display_name: string;
};

type PagingObject<T> = {
	href: string;
	items: T[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
};

type PlaylistTrack = {
	total: number;
	href: string;
};

type DetailedPlaylistTrack = {
	added_at: string;
	added_by: User;
	is_local: boolean;
	track: Track;
};

type VolumePercent = number | null;

type PreviewUrl = string | null;

type LinkedFrom = CommonTypes<"TODO"> | null;

type ResumePoint = {
	fully_played: boolean;
	resume_position_ms: number;
};

type AudioPreviewUrl = string | null;

type Explicit = boolean | unknown;

type Device = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: VolumePercent;
	supports_volume: boolean;
};

type Context = {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
} | null;

type ProgressMs = number | null;

type ExternalUrls = {
	spotify: string;
};

// TODO: check proper name for property copyright. is it Copyrights or Copyright
type Copyright = [
	{
		text: string;
		type: string;
	},
];

type Actions = {
	interupting_playback: boolean;
	pausing: boolean;
	resuming: boolean;
	seeking: boolean;
	skipping_next: boolean;
	skipping_prev: boolean;
	toggling_repeat_context: boolean;
	toggling_shuffle: boolean;
	toggling_repeat_track: boolean;
	transferring_playback: boolean;
};

type ErrorType =
	| {
			error: {
				status: number;
				message: string;
			};
	  }
	| undefined;

type ErrorTypeAndPaging<T> = PagingObject<T> & ErrorType;

type Errorable<T> = T & ErrorType;

interface ChildrenProps {
	children?: React.ReactNode;
}

// specific types

type Album = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: Restriction;
	artists: Artist[];
} & CommonTypes<"album">;

type Artist = {
	followers: Follower;
	genres: string[];
	images: Image[];
	name: string;
	popularity: number;
} & CommonTypes<"artist">;

type Track = {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalId;
	is_playable: boolean;
	linked_from: LinkedFrom;
	restrictions: Restriction;
	name: string;
	popularity: number;
	preview_url: PreviewUrl;
	track_number: number;
	is_local: boolean;
} & CommonTypes<"track">;

type Show = {
	available_markets: string[];
	copyright: Copyright;
	description: string;
	images: Image[];
	html_description: string;
	explicit: boolean;
	is_externally_hosted: boolean;
	languages: string[];
	media_type: string;
	name: string;
	publisher: string;
	total_episodes: number;
} & CommonTypes<"show">;

type Audiobook = {
	authors: [
		{
			name: string;
		},
	];
	available_markets: string[];
	copyrights: [
		{
			text: string;
			type: string;
		},
	];
	description: string;
	html_description: string;
	explicit: boolean;
	images: Image[];
	languages: string[];
	media_type: string;
	name: string;
	narrators: [
		{
			name: string;
		},
	];
	publisher: string;
	total_chapters: number;
};

type Episode = {
	audio_preview_url: AudioPreviewUrl;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: Explicit;
	images: Image[];
	is_externally_hosted: boolean;
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: ResumePoint;
	restrictions: Restriction;
	show: Show;
} & CommonTypes<"episode">;

type Category = {
	href: string;
	icons: Image[];
	id: string;
	name: string;
};

// general types

type Token = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
};

type UserPlaylist = {
	collaborative: boolean;
	description: string;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	type: string;
	uri: string;
};

type UserProfile = {
	country: string;
	display_name: string;
	email: string;
	explicit_content: ExplicitContent;
	followers: Follower;
	images: Image[];
	product: string;
} & CommonTypes<"user">;

type UserSavedTrack = {
	added_at: string;
	track: Track;
};

type Playlist<T> = {
	collaborative: boolean;
	description: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: PagingObject<T>;
} & CommonTypes<"playlist">;

type Search = {
	tracks: PagingObject<Track>;
	artists: PagingObject<Artist>;
	albums: PagingObject<Album>;
	playlists: PagingObject<Playlist<PlaylistTrack>>;
	shows: PagingObject<Show>;
	episodes: PagingObject<Episode>;
};

type Categories = {
	categories: PagingObject<Category>;
};

type CategoryPlaylist = {
	massage: string;
	playlists: PagingObject<Playlist<PlaylistTrack>>;
};

type CurrentlyPlayingTrack = Errorable<{
	device: Device;
	repeat_state: string;
	shuffle_state: string;
	context: Context;
	timestamp: number;
	progress_ms: ProgressMs;
	is_playing: boolean;
	item: Track | Episode | null;
	currently_playing_type: string;
	actions: Actions;
}>;

type PlaybackState = Errorable<{
	device: Device;
	repeat_state: string;
	shuffle_state: string;
	context: Context;
	timestamp: number;
	progress_ms: ProgressMs;
	is_playing: boolean;
	item: Track | Episode | null;
	currently_playing_type: string;
	actions: Actions;
}>;

type CategoriesPlaylists = Errorable<CategoryPlaylist>;

type SingleCategory = Errorable<Category>;

type SeveralCategories = Errorable<Categories>;

type SearchType = Errorable<Search>;

type UserProfiles = Errorable<UserProfile>;

type Playlists = Errorable<Playlist<DetailedPlaylistTrack>>;

type UserPlaylists = ErrorTypeAndPaging<UserPlaylist>;

type TopArtists = ErrorTypeAndPaging<Artist>;

type TopTracks = ErrorTypeAndPaging<Track>;

type UserSavedTracks = ErrorTypeAndPaging<UserSavedTrack>;

// endpoint

type ApiEndpoint = {
	spotify: {
		origin: string;
		tokenEndpoint: string;
		authEndpoint: string;
		album: {
			several: string;
			single: (id: string) => string;
			tracks: (id: string) => string;
			saved: string;
			save: string;
			remove: string;
			contains: string;
			newReleases: string;
		};
		artists: {
			several: string;
			single: (id: string) => string;
			albums: (id: string) => string;
			topTracks: (id: string) => string;
			realted: (id: string) => string;
		};
		audiobooks: {
			several: string;
			single: (id: string) => string;
			chapters: (id: string) => string;
			saved: string;
			save: string;
			remove: string;
			contains: string;
		};
		categories: {
			several: string;
			single: (id: string) => string;
		};
		chapters: {
			several: string;
			single: (id: string) => string;
		};
		episodes: {
			several: string;
			single: (id: string) => string;
			saved: string;
			save: string;
			remove: string;
			contains: string;
		};
		genres: {
			availableGenreSeeds: string;
		};
		markets: {
			availableMarkets: string;
		};
		player: {
			state: string;
			transferPlayback: string;
			devices: string;
			currentlyPlaying: string;
			play: string;
			pause: string;
			next: string;
			previous: string;
			seek: string;
			repeat: string;
			volume: string;
			shuffle: string;
			recentlyPlayed: string;
			queue: string;
			addToQueue: string;
		};
		playlists: {
			several: string;
			single: (id: string) => string;
			changeDetails: (id: string) => string;
			items: (id: string) => string;
			updateItems: (id: string) => string;
			addItems: (id: string) => string;
			removeItems: (id: string) => string;
			currentUserPlaylists: string;
			userPlaylists: (id: string) => string;
			createPlaylist: (id: string) => string;
			featured: string;
			categories: (id: string) => string;
			cover: (id: string) => string;
		};
		search: {
			search: string;
		};
		shows: {
			several: string;
			single: (id: string) => string;
			episodes: (id: string) => string;
			saved: string;
			save: string;
			remove: string;
			contains: string;
		};
		tracks: {
			several: string;
			single: (id: string) => string;
			saved: string;
			save: string;
			remove: string;
			contains: string;
			severalFeatures: string;
			singleFeatures: (id: string) => string;
			analysis: (id: string) => string;
			recommendations: string;
		};
		users: {
			currentProfile: string;
			topItems: (type: string) => string;
			userProfile: (id: string) => string;
			followPlaylist: (id: string) => string;
			unfollowPlaylist: (id: string) => string;
			followedArtists: string;
			followArtistOrUser: string;
			unfollowArtistOrUser: string;
			checkIfUserFollows: string;
			checkIfUserFollowsPlaylist: (id: string) => string;
		};
	};
};
