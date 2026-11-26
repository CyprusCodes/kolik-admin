export const tierOptions = [
  { value: "Starter Package", label: "Starter" },
  { value: "Business Package", label: "Business" },
  { value: "Enterprise Package", label: "Enterprise" },
];

export const formatTier = (tier: string | null | undefined) => (tier ? tier.replace(/ Package$/, "") : "-");

export const formatSeats = (employeeCount: number, maxEmployees: number | null) =>
  maxEmployees === null ? `${employeeCount}` : `${employeeCount} / ${maxEmployees}`;
