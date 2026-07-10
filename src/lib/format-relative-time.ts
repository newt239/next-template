export const formatRelativeTime = (date: Date) => {
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });

  if (abs < 60) {
    return rtf.format(diffSeconds, "second");
  }
  if (abs < 3600) {
    return rtf.format(Math.trunc(diffSeconds / 60), "minute");
  }
  if (abs < 86400) {
    return rtf.format(Math.trunc(diffSeconds / 3600), "hour");
  }
  if (abs < 2592000) {
    return rtf.format(Math.trunc(diffSeconds / 86400), "day");
  }
  if (abs < 31536000) {
    return rtf.format(Math.trunc(diffSeconds / 2592000), "month");
  }
  return rtf.format(Math.trunc(diffSeconds / 31536000), "year");
};
