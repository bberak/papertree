function areFiltersTheSame(f1, f2) {
	f1 = f1 || {};
	f2 = f2 || {};

	return (
		(f1.groupId === f2.groupId ||
			(!f1.groupId && f2.groupName === "All Systems") ||
			(f1.groupName === "All Systems" && !f2.groupId)) &&
		f1.systemId === f2.systemId &&
		f1.minTime === f2.minTime &&
		f1.maxTime === f2.maxTime
	);
}

function areFiltersDifferent(f1, f2) {
	return !areFiltersTheSame(f1, f2);
}

function areTimeFiltersValid(filter) {
	filter = filter || {};

	let now = new Date().getTime();

	if (filter.minTime && filter.minTime > now)
		return false;

	if (filter.minTime && filter.maxTime && filter.minTime > filter.maxTime)
		return false;

	return true;
}

export { areFiltersTheSame, areFiltersDifferent, areTimeFiltersValid };
