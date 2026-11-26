import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { TableProvider, useTable } from "@xest-ui/data-table";
import type { Col } from "@xest-ui/data-table";
import type { TableProviderProps } from "@xest-ui/data-table/dist/TableProvider";
import Authentication from "src/services/authentication";
import { ColumnLayoutContext } from "./column-layout-context";
import type { LayoutAction } from "./column-layout-context";

interface SavedColumn {
  id: string;
  hidden: boolean;
  fixed: "left" | "right" | null;
}

type LayoutColumn<T extends Record<string, any>> = Col<T> & { layoutId: string };

const STORAGE_PREFIX = "kolik-admin:table-columns";

const readLayout = (storageKey: string | null): SavedColumn[] | null => {
  if (!storageKey) return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "null");
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};

const withLayoutIds = <T extends Record<string, any>>(columns: Col<T>[]): LayoutColumn<T>[] => {
  let unnamed = 0;
  return columns.map((column) => {
    const name = column.key ?? column.dataIndex;
    const layoutId = name !== undefined && name !== null ? String(name) : `column-${(unnamed += 1)}`;
    return { ...column, layoutId };
  });
};

const applyLayout = <T extends Record<string, any>>(
  columns: LayoutColumn<T>[],
  layout: SavedColumn[] | null,
): LayoutColumn<T>[] => {
  if (!layout) return columns;

  const byId = new Map(columns.map((column) => [column.layoutId, column]));
  const arranged: LayoutColumn<T>[] = layout
    .filter((saved) => byId.has(saved.id))
    .map((saved) => ({
      ...(byId.get(saved.id) as LayoutColumn<T>),
      hidden: saved.hidden,
      fixed: saved.fixed || undefined,
    }));

  const savedIds = new Set(layout.map((saved) => saved.id));
  columns.forEach((column, index) => {
    if (!savedIds.has(column.layoutId)) {
      arranged.splice(Math.min(index, arranged.length), 0, column);
    }
  });

  return arranged;
};

const ColumnLayoutSync = ({
  pendingRef,
  packageStorageKey,
  onSave,
  onReset,
  children,
}: {
  pendingRef: MutableRefObject<LayoutAction | null>;
  packageStorageKey: string;
  onSave: (columns: LayoutColumn<any>[]) => void;
  onReset: () => void;
  children: ReactNode;
}) => {
  const { columns } = useTable();

  useEffect(() => {
    const action = pendingRef.current;
    if (!action) return;
    pendingRef.current = null;
    removeItem(packageStorageKey);
    if (action === "reset") onReset();
    else onSave(columns as LayoutColumn<any>[]);
  }, [columns, onReset, onSave, packageStorageKey, pendingRef]);

  const value = useMemo(
    () => ({
      mark: (action: LayoutAction) => {
        pendingRef.current = action;
      },
    }),
    [pendingRef],
  );

  return <ColumnLayoutContext.Provider value={value}>{children}</ColumnLayoutContext.Provider>;
};

type ColumnLayoutTableProviderProps<T extends Record<string, any>> = TableProviderProps<T> & {
  tableId: string;
};

export function ColumnLayoutTableProvider<T extends Record<string, any>>({
  tableId,
  columns,
  params,
  children,
  ...rest
}: ColumnLayoutTableProviderProps<T>) {
  const userId = new Authentication().getAccessTokenPayload()?.userId;
  const storageKey = userId ? `${STORAGE_PREFIX}:${userId}:${tableId}` : null;
  const packageStorageKey = `${STORAGE_PREFIX}:package:${tableId}`;

  useState(() => removeItem(packageStorageKey));

  const [saved, setSaved] = useState<{ key: string | null; layout: SavedColumn[] | null }>({
    key: null,
    layout: null,
  });
  const layout = useMemo(
    () => (saved.key === storageKey ? saved.layout : readLayout(storageKey)),
    [saved, storageKey],
  );
  const pendingRef = useRef<LayoutAction | null>(null);

  const arrangedColumns = applyLayout(withLayoutIds(columns), layout);

  const handleSave = useCallback(
    (savedColumns: LayoutColumn<any>[]) => {
      if (!storageKey) return;
      const entries: SavedColumn[] = savedColumns
        .filter((column) => column.layoutId)
        .map((column) => ({
          id: column.layoutId,
          hidden: Boolean(column.hidden),
          fixed: column.fixed || null,
        }));
      try {
        localStorage.setItem(storageKey, JSON.stringify(entries));
      } catch {
        return;
      }
      setSaved({ key: storageKey, layout: entries });
    },
    [storageKey],
  );

  const handleReset = useCallback(() => {
    if (storageKey) removeItem(storageKey);
    setSaved({ key: storageKey, layout: null });
  }, [storageKey]);

  return (
    <TableProvider
      {...rest}
      params={{
        ...params,
        config: {
          ...params.config,
          localStorageKey: () => packageStorageKey,
        },
      }}
      columns={arrangedColumns}
    >
      <ColumnLayoutSync
        pendingRef={pendingRef}
        packageStorageKey={packageStorageKey}
        onSave={handleSave}
        onReset={handleReset}
      >
        {children}
      </ColumnLayoutSync>
    </TableProvider>
  );
}
