import { useState } from "react";
import { useDebouncedValue } from "src/hooks/use-debounced-value";
import { useSearchParams } from "react-router-dom";

export type FilterKey = "plan" | "tier";

const filterKeys: FilterKey[] = ["plan", "tier"];

export const useOrganizationFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const values: Record<FilterKey, string | null> = {
    plan: searchParams.get("plan"),
    tier: searchParams.get("tier"),
  };

  const setFilter = (key: FilterKey, value: string | null) =>
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });

  const clear = () => {
    setSearch("");
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      filterKeys.forEach((key) => next.delete(key));
      return next;
    });
  };

  return {
    values,
    setFilter,
    search,
    setSearch,
    debouncedSearch,
    clear,
    hasFilters: Boolean(search) || filterKeys.some((key) => values[key]),
  };
};
