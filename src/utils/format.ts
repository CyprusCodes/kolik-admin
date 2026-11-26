import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (value: string | null | undefined) =>
  value ? dayjs(value).format("D MMM YYYY") : "—";

export const fromNow = (value: string | null | undefined) => (value ? dayjs(value).fromNow() : "Never");

export const formatNumber = (value: number) => new Intl.NumberFormat("en").format(value);

export const daysUntil = (value: string | null | undefined) =>
  value ? dayjs(value).startOf("day").diff(dayjs().startOf("day"), "day") : null;

export const trialLabel = (trialExpiresAt: string | null) => {
  const days = daysUntil(trialExpiresAt);
  if (days === null) {
    return null;
  }
  if (days < 0) {
    return `Trial ended ${Math.abs(days)}d ago`;
  }
  if (days === 0) {
    return "Trial ends today";
  }
  return `Trial ends in ${days}d`;
};

export const trialShortLabel = (trialExpiresAt: string | null) => {
  const days = daysUntil(trialExpiresAt);
  if (days === null) {
    return null;
  }
  if (days < 0) {
    return `Ended ${Math.abs(days)}d ago`;
  }
  return days === 0 ? "Ends today" : `${days}d left`;
};
