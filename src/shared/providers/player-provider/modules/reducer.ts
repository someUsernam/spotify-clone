export type State = {
	playing: boolean;
	volume: number;
};

export type Action = {
	type: string;
	payload: any;
};

export function playerReducer(state: State, action: Action) {
	if (action.type === "PLAY") {
		return {
			...state,
			playing: true,
		};
	}
	if (action.type === "PAUSE") {
		return {
			...state,
			playing: false,
		};
	}
	if (action.type === "SET_VOLUME") {
		return {
			...state,
			volume: action.payload,
		};
	}

	return state;
}

export const initialState = {
	playing: false,
	volume: 100,
};
