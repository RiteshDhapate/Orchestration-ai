import { format as formatDate, isValid } from "date-fns";

export function renderDate(timestamp, format = "d LLL y") {
	// Converts UTC timestamp to local time
	// Custom format https://date-fns.org/v3.6.0/docs/format
	if (timestamp && isValid(new Date(timestamp))) {
		return formatDate(new Date(timestamp), format);
	}
	console.error("Invalid timestamp", timestamp);
	return "-";
}