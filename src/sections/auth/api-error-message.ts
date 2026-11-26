import { isAxiosError } from "axios";

export const apiErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (error.response?.status === 429) return "Too many attempts. Try again in a few minutes.";
    if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
      return data.message;
    }
  }
  return fallback;
};
