import { Chip, Tooltip } from "@mui/material";

interface StatusChipProps {
  label: string;
  tone: "good" | "bad" | "warning" | "neutral" | "primary";
  tooltip?: string | null;
}

const StatusChip = ({ label, tone, tooltip }: StatusChipProps) => {
  const chip =
    tone === "good" ? (
      <Chip size="small" variant="outlined" color="success" label={label} />
    ) : tone === "bad" ? (
      <Chip size="small" color="error" label={label} />
    ) : tone === "warning" ? (
      <Chip size="small" color="warning" label={label} />
    ) : tone === "primary" ? (
      <Chip size="small" variant="outlined" color="primary" label={label} />
    ) : (
      <Chip size="small" variant="outlined" label={label} />
    );

  return tooltip ? (
    <Tooltip title={tooltip}>
      <span>{chip}</span>
    </Tooltip>
  ) : (
    chip
  );
};

export default StatusChip;
