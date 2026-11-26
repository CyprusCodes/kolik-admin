import { createContext, useContext } from "react";

export type LayoutAction = "save" | "reset";

export const ColumnLayoutContext = createContext<{ mark: (action: LayoutAction) => void } | null>(null);

export const useColumnLayoutAction = () => useContext(ColumnLayoutContext);
