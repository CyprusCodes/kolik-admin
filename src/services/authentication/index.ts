import { platformAuth } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import parseJWTPayload from "src/utils/parse-jwt-payload";
import getAxiosInstance from "src/utils/http/axiosInstance";

const TOKEN_KEY = "kolikAdminCreds";

export interface LoginChallenge {
  challengeToken: string;
  twoFactorSetupRequired: boolean;
}

export interface TwoFactorSetup {
  secret: string;
  otpauthUrl: string;
}

const post = <T>(path: string, data: Record<string, unknown>) =>
  getAxiosInstance()<T>(`${API_BASE_URL}${path}`, { method: "POST", data }).then((response) => response.data);

class Authentication {
  startLogin({ email, password }: { email: string; password: string }) {
    return post<LoginChallenge>(platformAuth.login(), { email, password });
  }

  startTwoFactorSetup(challengeToken: string) {
    return post<TwoFactorSetup>(platformAuth.setupTwoFactor(), { challengeToken });
  }

  verifyTwoFactor(challengeToken: string, code: string) {
    return post<{ accessToken: string; recoveryCodes: string[] | null }>(platformAuth.verifyTwoFactor(), {
      challengeToken,
      code,
    }).then(({ accessToken, recoveryCodes }) => {
      localStorage.setItem(TOKEN_KEY, accessToken);
      return { recoveryCodes };
    });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated() {
    const payload = this.getAccessTokenPayload();
    if (!payload || payload.platformTwoFactor !== true) {
      return false;
    }
    return Boolean(payload.exp && payload.exp > Math.floor(Date.now() / 1000));
  }

  getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getAccessTokenPayload() {
    const accessToken = this.getAccessToken();
    return accessToken ? parseJWTPayload(accessToken) : null;
  }
}

export default Authentication;
