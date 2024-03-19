"use client";

import { Reducer, createContext, useContext, useMemo, useReducer } from "react";
import { Action, State, initialState, playerReducer } from "./modules/reducer";

const PlayerContext = createContext({
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

	const values = useMemo(() => {
		return {
			play: () => {
				dispatch({ type: "PLAY", payload: null });
			},
			pause: () => {
				dispatch({ type: "PAUSE", payload: null });
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
	}, []);

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
