import { useRef } from "react";
import { DataTable } from "@xest-ui/data-table";
import type { Col } from "@xest-ui/data-table";
import type { ExportDataProps } from "@xest-ui/data-table/dist/DataTable/ExportData";
import type { AxiosResponse } from "axios";
import { ColumnLayoutTableProvider } from "./column-layout-table-provider";
import { DefaultTableComponents } from "./default-table-components";
import MyPaginator from "./my-paginator";
import { useUpdateQueryParams } from "./use-update-query-params";

export type FilterSpec = { column: string; operation: string; value: string };

interface PlatformXestTableProps<T extends Record<string, any>> {
  tableId: string;
  columns: Col<T>[];
  fetchPage: (query: string) => Promise<AxiosResponse>;
  rowKey: (row: T) => string | number;
  extraFilters?: FilterSpec[];
  exportConfig?: ExportDataProps<Record<string, unknown>>;
  initialSortCriteria: string;
}

const toQuery = (filters: FilterSpec[], startIndex: number) =>
  filters.flatMap((filter, offset) => {
    const index = startIndex + offset;
    return [
      `filters[${index}][column]=${filter.column}`,
      `filters[${index}][operation]=${filter.operation}`,
      `filters[${index}][values][0]=${encodeURIComponent(filter.value)}`,
    ];
  });

const PlatformXestTable = <T extends Record<string, any>>({
  tableId,
  columns,
  fetchPage,
  rowKey,
  extraFilters = [],
  exportConfig,
  initialSortCriteria,
}: PlatformXestTableProps<T>) => {
  const updateQueryParams = useUpdateQueryParams();
  const filterKey = JSON.stringify(extraFilters);
  const lastFilterKeyRef = useRef(filterKey);

  return (
    <ColumnLayoutTableProvider<T>
      tableId={tableId}
      params={{
        apiCallFn: async (queryParams: string) => {
          try {
            const url = new URLSearchParams(queryParams.replace(/^\?/, ""));

            if (lastFilterKeyRef.current !== filterKey) {
              lastFilterKeyRef.current = filterKey;
              url.delete("cursor");
              url.delete("direction");
              url.delete("page");
            }

            let maxIndex = -1;
            url.forEach((_, key) => {
              const indexMatch = key.match(/^filters\[(\d+)\]/);
              if (indexMatch) {
                maxIndex = Math.max(maxIndex, Number(indexMatch[1]));
              }
            });

            const rawQuery = [
              ...Array.from(url.entries()).map(([key, value]) => `${key}=${value}`),
              ...toQuery(extraFilters, maxIndex + 1),
            ].join("&");

            const response = await fetchPage(rawQuery);
            return { data: response.data, error: null };
          } catch (error) {
            return { data: [], error };
          }
        },
        initialPageSize: 25,
        config: {
          tableIdentifier: tableId,
          updateSearchQueryParams: updateQueryParams,
        },
        initialSortCriteria,
        deps: [filterKey],
      }}
      components={DefaultTableComponents}
      columns={columns}
    >
      <DataTable
        pagination={false}
        rowKey={(row) => rowKey(row as unknown as T)}
        actions={exportConfig ? { exportData: exportConfig } : undefined}
      />
      <MyPaginator />
    </ColumnLayoutTableProvider>
  );
};

export default PlatformXestTable;
