import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface PageLabel {
  path: string;
  label: string;
}

export const BreadcrumbContext = createContext<{
  pageLabel: PageLabel | null;
  setPageLabel: (value: PageLabel | null) => void;
}>({ pageLabel: null, setPageLabel: () => undefined });

export const useBreadcrumbContext = () => useContext(BreadcrumbContext);

export const useBreadcrumbLabel = (label?: string | null) => {
  const { pathname } = useLocation();
  const { setPageLabel } = useBreadcrumbContext();

  useEffect(() => {
    if (!label) return undefined;
    setPageLabel({ path: pathname, label });
    return () => setPageLabel(null);
  }, [label, pathname, setPageLabel]);
};
