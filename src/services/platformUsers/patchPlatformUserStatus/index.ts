import { platformUsers } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { PlatformUser, UserStatus } from "src/types/user";

const patchPlatformUserStatus = (userId: number, userStatus: UserStatus) =>
  http.patch<{ user: PlatformUser }>(`${API_BASE_URL}${platformUsers.patchUserStatus(userId)}`, {
    userStatus,
  });

export default patchPlatformUserStatus;
