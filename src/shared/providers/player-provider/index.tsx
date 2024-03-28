"use client";

import {
	getPlaybackState,
	pausePlayback,
	startOrResumePlayback,
} from "@/shared/services/spotify";
import {
	Reducer,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";
import { Action, State, initialState, playerReducer } from "./modules/reducer";

const PlayerContext = createContext({
	isPlaying: false,
	play: () => {},
	pause: () => {},
	// playNext: () => {},
	// playPrevious: () => {},
	setVolume: (payload: number) => {},
	// seek: () => {},
	// repeat: () => {},
	// shuffle: () => {},
	// setPlaying: () => {},
	// setShuffle: () => {},
	// setRepeat: () => {},
	// setMuted: () => {},
	// setDuration: () => {},
	// setElapsed: () => {},
	// setPlayer: () => {},
});

function PlayerProvider({ children }: ChildrenProps) {
	const [state, dispatch] = useReducer<Reducer<State, Action>>(
		playerReducer,
		initialState,
	);

	useEffect(() => {
		getPlaybackState().then((data) => {
			dispatch({ type: "IS_PLAYING", payload: data.is_playing });
		});
	}, []);

	const values = useMemo(() => {
		return {
			isPlaying: state.playing,
			play: () => {
				dispatch({ type: "IS_PLAYING", payload: true });
				startOrResumePlayback();
			},
			pause: () => {
				dispatch({ type: "IS_PLAYING", payload: false });
				pausePlayback();
			},
			// playNext: () => {},
			// playPrevious: () => {},
			setVolume: (payload: number) => {
				dispatch({ type: "SET_VOLUME", payload });
			},
			// seek: () => {},
			// repeat: () => {},
			// shuffle: () => {},
			// setPlaying: () => {},
			// setSeeking: () => {},
			// setShuffle: () => {},
			// setRepeat: () => {},
			// setMuted: () => {},
			// setDuration: () => {},
			// setElapsed: () => {},
			// setPlayer: () => {},
		};
	}, [
		// dispatch,
		state.playing,
		// state.volume,
	]);

	return (
		<PlayerContext.Provider value={values}>{children}</PlayerContext.Provider>
	);
}

function usePlayer() {
	const context = useContext(PlayerContext);
	if (!context) {
		throw new Error("usePlayer must be used within a PlayerProvider");
	}

	return context;
}

export { PlayerProvider, usePlayer };
