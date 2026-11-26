import { platformUsers } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { PlatformUser } from "src/types/user";

const getPlatformUser = (userId: number | string) =>
  http.get<{ user: PlatformUser }>(`${API_BASE_URL}${platformUsers.getUser(userId)}`);

export default getPlatformUser;
