import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useUpdateQueryParams = () => {
  const [, setSearchParams] = useSearchParams();
  return useCallback(
    (newParams: Record<string, string | number>) =>
      setSearchParams(
        Object.fromEntries(Object.entries(newParams).map(([key, value]) => [key, String(value)])),
        { replace: true },
      ),
    [setSearchParams],
  );
};
