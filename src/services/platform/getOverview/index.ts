import { platform } from "src/constants/endpoints";
import { API_BASE_URL } from "src/constants/api";
import http from "src/utils/http";
import type { Overview } from "src/types/overview";

const getOverview = (days: number) => http.get<Overview>(`${API_BASE_URL}${platform.getOverview(days)}`);

export default getOverview;
