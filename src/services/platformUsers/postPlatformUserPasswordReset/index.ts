import { platformUsers } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";

const postPlatformUserPasswordReset = (userId: number) =>
  http.post<{ email: string }>(`${API_BASE_URL}${platformUsers.postUserPasswordReset(userId)}`);

export default postPlatformUserPasswordReset;
