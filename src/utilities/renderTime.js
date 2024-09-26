import { format as formatDate, isValid } from "date-fns";

export function renderTime(timestamp, format = "hh:mm aaa", locale) {
  // Converts UTC timestamp to local time
  // Custom format https://date-fns.org/v3.6.0/docs/format
  if (timestamp && isValid(new Date(timestamp))) {
    if (locale) {
      return formatDate(
        new Date(timestamp).toLocaleString(undefined, { timeZone: locale }),
        format
      );
    } else {
      return formatDate(new Date(timestamp), format);
    }
  }
  console.error("Invalid timestamp", timestamp);
  return "-";
}
