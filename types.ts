// primitives
type TODO = any;

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
	height: number | null;
	width: number | null;
};

type Follower = {
	href: string | null;
	total: number;
};

// TODO: is it nullable?
type Restriction = {
	reason: "market" | "product" | "explicit";
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
	display_name: string | null;
};

type PagingObject<T> = {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
};

type VolumePercent = number | null;

type PreviewUrl = string | null;

type LinkedFrom = CommonTypes<"TODO"> | null;

type ReleaseDatePrecision = "year" | "month" | "day";

type PaymentRequired = "payment_required";

type currentlyPlayingType = "track" | "episode" | "ad" | "unknown";

type AudioFeatures = {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: "audio_features";
	uri: string;
	valence: number;
};

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

type Copyrights = {
	text: string;
	type: string;
}[];

type AlbumGroup = "album" | "single" | "compilation" | "appears_on";

type Narrator = {
	name: string;
};

type Authors = {
	name: string;
}[];

type Cursors = {
	after: string;
	before: string;
};

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

type ErrorType = {
	error: {
		status: number;
		message: string;
	};
};

type ErrorTypeAndPaging<T> = PagingObject<T> | ErrorType;

type Errorable<T> = T | ErrorType;

interface ChildrenProps {
	children?: React.ReactNode;
}

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

type UserSavedTrack = {
	added_at: string;
	track: Track;
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
	currently_playing_type: currentlyPlayingType;
	actions: Actions;
}>;

type UserPlaylists = ErrorTypeAndPaging<UserPlaylist>;

type TopArtists = ErrorTypeAndPaging<Artist>;

type TopTracks = ErrorTypeAndPaging<Track>;

type UserSavedTracks = ErrorTypeAndPaging<UserSavedTrack>;

// Albums

type Album = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: ReleaseDatePrecision;
	restrictions: Restriction;
	artists: SimplifiedArtist[];
	tracks: PagingObject<SimplifiedTrack>;
	copyrights: Copyrights;
	external_ids: ExternalId;
	genres: string[];
	label: string;
	popularity: number;
} & CommonTypes<"album">;

type SimplifiedAlbum = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: ReleaseDatePrecision;
	restrictions: Restriction;
	artists: SimplifiedArtist[];
} & CommonTypes<"album">;

type SavedAlbum = {
	added_at: string;
	album: Album;
};

type GetAlbum = Errorable<Album>;
type GetSeveralAlbums = Errorable<{ albums: Album[] }>;
type GetAlbumTracks = Errorable<PagingObject<SimplifiedTrack>>;
type GetUserSavedAlbums = Errorable<PagingObject<SavedAlbum>>;
type CheckUserSavedAlbums = Errorable<boolean[]>;
type GetNewReleases = Errorable<{ albums: PagingObject<SimplifiedAlbum> }>;

// Artists

type Artist = {
	followers: Follower;
	genres: string[];
	images: Image[];
	name: string;
	popularity: number;
} & CommonTypes<"artist">;

type SimplifiedArtist = Omit<
	Artist,
	"followers" | "genres" | "images" | "popularity"
>;

type GetArtist = Errorable<Artist>;
type GetSeveralArtists = Errorable<{ artists: Artist[] }>;
type GetArtistAlbums = Errorable<PagingObject<SimplifiedAlbum & AlbumGroup>>;
type GetArtistTopTracks = Errorable<{ tracks: Track[] }>;
type GetRelatedArtists = Errorable<{ artists: Artist[] }>;

// Audiobooks

type Audiobook = {
	authors: Authors;
	available_markets: string[];
	copyrights: Copyrights;
	description: string;
	html_description: string;
	edition: string;
	explicit: boolean;
	images: Image[];
	languages: string[];
	media_type: string;
	name: string;
	narrators: Narrator[];
	publisher: string;
	total_chapters: number;
	chapters: PagingObject<SimplifiedChapter[]>;
} & CommonTypes<"audiobook">;

type SimplifiedAudiobook = Omit<Audiobook, "chapters">;

type GetAudiobook = Errorable<Audiobook>;
type GetSeveralAudiobooks = Errorable<{ audiobooks: (Audiobook | null)[] }>;
type GetAudiobookChapters = Errorable<PagingObject<SimplifiedChapter[]>>;
type GetUserSavedAudiobooks = Errorable<PagingObject<SimplifiedAudiobook>>;
type CheckUserSavedAudiobooks = Errorable<boolean[]>;

// Categories

type Category = {
	href: string;
	icons: Image[];
	id: string;
	name: string;
};

type GetSeveralBrowseCategories = Errorable<{
	categories: PagingObject<Category>;
}>;
type GetSingleBrowseCategory = Errorable<Category>;

// Chapters

type Chapter = {
	audio_preview_url: AudioPreviewUrl;
	available_markets: string[];
	chapter_number: number;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: Explicit;
	images: Image[];
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: ReleaseDatePrecision;
	resume_point: ResumePoint;
	restrictions: Restriction | PaymentRequired;
	audiobook: Audiobook;
} & CommonTypes<"episode">;

type SimplifiedChapter = Omit<Chapter, "audiobook">;

type GetChapter = Errorable<Chapter>;
type GetSeveralChapters = Errorable<{ chapters: Chapter[] }>;

// Episodes

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
	release_date_precision: ReleaseDatePrecision;
	resume_point: ResumePoint;
	restrictions: Restriction;
	show: Show;
} & CommonTypes<"episode">;

type SimplifiedEpisode = Omit<Episode, "show">;

type SavedEpisode = {
	added_at: string;
	episode: Episode;
};

type GetEpisode = Errorable<Episode>;
type GetSeveralEpisodes = Errorable<{ episodes: Episode[] }>;
type GetUserSavedEpisodes = Errorable<PagingObject<SavedEpisode>>;
type CheckUserSavedEpisodes = Errorable<boolean[]>;

// Genres

type GetAvailableGenreSeeds = Errorable<{ genres: string[] }>;

// Player

type Playback = {
	device: Device;
	repeat_state: string;
	shuffle_state: string;
	context: Context;
	timestamp: number;
	progress_ms: ProgressMs;
	is_playing: boolean;
	item: Track | Episode | null;
	currently_playing_type: currentlyPlayingType;
	actions: Actions;
};

type Devices = {
	devices: Device[];
};

type PlayHistory = {
	track: Track;
	played_at: string;
	context: Context;
};

type CurrentlyPlaying = {
	currently_playing: (Track | Episode)[] | null;
};

type Queue = {
	queue: (Track | Episode)[];
};

type RecentlyPlayedTracks = {
	href: string;
	limit: number;
	next: string;
	cursors: Cursors;
	total: number;
	items: PlayHistory[];
};

type GetPlaybackState = Errorable<Playback>;
type AvailableDevices = Errorable<{ devices: Devices }>;
type GetCurrentlyPlayingTrack = Errorable<Playback>;
type GetRecentlyPlayedTracks = Errorable<RecentlyPlayedTracks>;
type GetUserQueue = Errorable<Queue & CurrentlyPlaying>;

// Playlists

type Playlist = {
	collaborative: boolean;
	description: string | null;
	followers: Follower;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean | null;
	snapshot_id: string;
	tracks: PagingObject<PlaylistTrack>;
} & CommonTypes<"playlist">;

type SimplifiedPlaylist = {
	collaborative: boolean;
	description: string | null;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean | null;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
	} | null;
} & CommonTypes<"playlist">;

// type SimplifiedPlaylist = Omit<Playlist, "followers"> & {
// 	tracks: {
// 		href: string;
// 		total: number;
// 	} | null;
// };

type PlaylistTrack = {
	added_at: string | null;
	added_by: User | null;
	is_local: boolean;
	track: Track | Episode;
};

type SnapshotId = {
	snapshot_id: string;
};

type FeaturedPlaylists = {
	message: string;
	playlists: PagingObject<SimplifiedPlaylist>;
};

type CategoryPlaylist = {
	massage: string;
	playlists: PagingObject<SimplifiedPlaylist>;
};

type GetPlaylist = Errorable<Playlist>;
type GetPlaylistItems = Errorable<PagingObject<PlaylistTrack>>;
type UpdatePlaylistItems = Errorable<SnapshotId>;
type AddItemsToPlaylist = Errorable<SnapshotId>;
type RemoveItemsFromPlaylist = Errorable<SnapshotId>;
type GetCurrentUserPlaylists = Errorable<PagingObject<SimplifiedPlaylist[]>>;
type GetUserPlaylists = Errorable<PagingObject<SimplifiedPlaylist>>;
type CreatePlaylist = Errorable<Playlist>;
type GetFeaturedPlaylists = Errorable<FeaturedPlaylists>;
type GetCategoryPlaylists = Errorable<CategoryPlaylist>;
type GetPlaylistCoverImage = Errorable<Image[]>;

// Search

type Search = {
	tracks: PagingObject<Track>;
	artists: PagingObject<Artist>;
	albums: PagingObject<SimplifiedAlbum>;
	playlists: PagingObject<SimplifiedPlaylist>;
	shows: PagingObject<SimplifiedShow>;
	episodes: PagingObject<SimplifiedEpisode>;
	audiobooks: PagingObject<SimplifiedAudiobook>;
};

type SearchForItem = Errorable<Search>;

// Shows
type Show = {
	available_markets: string[];
	copyrights: Copyrights;
	description: string;
	html_description: string;
	explicit: boolean;
	images: Image[];
	is_externally_hosted: boolean | null;
	languages: string[];
	media_type: string;
	name: string;
	publisher: string;
	total_episodes: number;
	episodes: SimplifiedEpisode[];
} & CommonTypes<"show">;

type SimplifiedShow = Omit<Show, "episodes">;

type SavedShow = {
	added_at: string;
	show: Show;
};

type GetShow = Errorable<Show>;
type GetSeveralShows = Errorable<{ shows: SimplifiedShow[] }>;
type GetShowEpisodes = Errorable<PagingObject<SimplifiedEpisode[]>>;
type GetUserSavedShows = Errorable<PagingObject<SavedShow[]>>;
type CheckUserSavedShows = Errorable<boolean[]>;

// Tracks

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

type SimplifiedTrack = Omit<Track, "album">;

type RecommendationSeed = {
	afterFilteringSize: number;
	afterRelinkingSize: number;
	href: string;
	id: string;
	initialPoolSize: number;
	type: "artist" | "track" | "genre";
};

type SavedTrack = {
	added_at: string;
	track: Track;
};

type GetTrack = Errorable<Track>;
type GetSeveralTracks = Errorable<{ tracks: Track[] }>;
type GetUserSavedTracks = Errorable<PagingObject<SavedTrack>>;
type CheckUserSavedTracks = Errorable<boolean[]>;
type GetSeveralTracksAudioFeatures = Errorable<{
	audio_features: AudioFeatures[];
}>;
type GetTrackAudioFeatures = Errorable<AudioFeatures>;
type GetReccomendations = Errorable<{
	seeds: RecommendationSeed[];
	tracks: Track[];
}>;

// Users

type UserDetailedProfile = {
	country: string;
	display_name: string | null;
	email: string;
	explicit_content: ExplicitContent;
	followers: Follower;
	images: Image[];
	product: string;
} & CommonTypes<"user">;

type UserProfile = Omit<
	UserDetailedProfile,
	"email" | "country" | "product" | "explicit_content"
>;

type GetCurrentUserPorfile = Errorable<UserDetailedProfile>;
type GetUserTopItems = Errorable<PagingObject<Track | Artist>>;
type GetUserProfile = Errorable<UserProfile>;
type GetFollowedArtists = Errorable<{ artists: PagingObject<Artist[]> }>;
type CheckIfUserFollowsArtists = Errorable<boolean[]>;
type CheckIfUserFollowPlaylist = Errorable<boolean[]>;
