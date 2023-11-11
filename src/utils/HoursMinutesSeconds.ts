function appendZero(n: number) {
	return Number(n < 10 ? `0${n}` : n);
}

function HoursMinutesSeconds(ms: number) {
	const seconds = Math.floor(ms / 1000);
	const minutes = seconds >= 60 ? Math.floor(seconds / 60) : null;
	if (!minutes) return [appendZero(seconds % 60)];

	const hours = minutes >= 60 ? minutes / 60 - (minutes % 60) / 60 : null;
	if (!hours) return [minutes % 60, appendZero(seconds % 60)];

	return [hours, minutes % 60, seconds % 60];
}

export { HoursMinutesSeconds };
