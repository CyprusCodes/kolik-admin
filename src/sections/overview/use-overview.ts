import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getOverview from "src/services/platform/getOverview";

export const useOverview = (days: number) =>
  useQuery({
    queryKey: ["overview", days],
    queryFn: () => getOverview(days).then((response) => response.data),
    placeholderData: keepPreviousData,
  });
