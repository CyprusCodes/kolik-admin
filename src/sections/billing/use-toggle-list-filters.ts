import { useState } from "react";
import { useDebouncedValue } from "src/hooks/use-debounced-value";
import type { FilterSpec } from "src/components/paginated-table/platform-xest-table";

export const useToggleListFilters = (column: string) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [state, setState] = useState<string | null>(null);

  const filters: FilterSpec[] = state ? [{ column, operation: "equals", value: state }] : [];

  return { search, setSearch, debouncedSearch, state, setState, filters };
};
