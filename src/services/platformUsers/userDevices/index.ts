import { platformUsers } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { UserDevices } from "src/types/user";

export const getPlatformUserDevices = (userId: number) =>
  http.get<UserDevices>(`${API_BASE_URL}${platformUsers.getUserDevices(userId)}`);

export const deletePlatformUserSession = (userId: number, sessionId: string) =>
  http.delete(`${API_BASE_URL}${platformUsers.deleteUserSession(userId, sessionId)}`);

export const postPlatformUserSignOutEverywhere = (userId: number) =>
  http.post(`${API_BASE_URL}${platformUsers.postUserSignOutEverywhere(userId)}`);
