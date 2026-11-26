import { useState } from "react";
import { useDebouncedValue } from "src/hooks/use-debounced-value";
import { useSearchParams } from "react-router-dom";
import type { FilterSpec } from "src/components/paginated-table/platform-xest-table";

export const useUserFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const status = searchParams.get("status");
  const superAdmin = searchParams.get("superAdmin");

  const setParam = (key: string, value: string | null) =>
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });

  const filters: FilterSpec[] = [
    ...(status ? [{ column: "users.user_status", operation: "equals", value: status }] : []),
    ...(superAdmin ? [{ column: "users.is_super_admin", operation: "equals", value: superAdmin }] : []),
    ...(debouncedSearch.trim()
      ? [{ column: "users.search", operation: "searchUsers", value: debouncedSearch.trim() }]
      : []),
  ];

  return {
    search,
    setSearch,
    status,
    setStatus: (value: string | null) => setParam("status", value),
    superAdmin,
    setSuperAdmin: (value: string | null) => setParam("superAdmin", value),
    filters,
    hasFilters: Boolean(search || status || superAdmin),
    clear: () => {
      setSearch("");
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        next.delete("status");
        next.delete("superAdmin");
        return next;
      });
    },
  };
};
