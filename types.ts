// utils

type QueryProps = {
	params: {
		query: string;
	};
};

type CommonTypes = {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	type: string;
	uri: string;
};

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
} & CommonTypes;

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
} & CommonTypes;

type Artist = {
	followers: Follower;
	genres: string[];
	images: Image[];
	name: string;
	popularity: number;
} & CommonTypes;

type Track = {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalId;
	is_playable: boolean;
	linked_from: CommonTypes | null;
	restrictions: Restriction;
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	is_local: boolean;
} & CommonTypes;

type Show = {
	available_markets: string[];
	copyright: [
		{
			text: string;
			type: string;
		},
	];
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
} & CommonTypes;

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
	audio_preview_url: string;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	images: Image[];
	is_externally_hosted: boolean;
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: {
		fully_played: boolean;
		resume_position_ms: number;
	};
	restrictions: Restriction;
} & CommonTypes;

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
} & CommonTypes;

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
} & CommonTypes;

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
