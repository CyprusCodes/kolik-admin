export const isPickerDateStillBeingTyped = (date: Date | string | null | undefined): boolean => {
  if (!date) {
    return false;
  }

  const value = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(value.getTime())) {
    return true;
  }

  return value.getFullYear() < 1000;
};

export default isPickerDateStillBeingTyped;
