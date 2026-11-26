const OPEN_EVENT = "kolik-admin:open-search";

export const openSearch = () => window.dispatchEvent(new Event(OPEN_EVENT));

export const onOpenSearch = (handler: () => void) => {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
};
