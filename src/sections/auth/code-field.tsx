import { TextField } from "@mui/material";

interface CodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  recovery?: boolean;
  error?: string | null;
}

const CodeField = ({ value, onChange, recovery, error }: CodeFieldProps) => (
  <TextField
    autoFocus
    fullWidth
    variant="outlined"
    label={recovery ? "Recovery code" : "6-digit code"}
    placeholder={recovery ? "xxxxx-xxxxx" : "123456"}
    value={value}
    onChange={(event) =>
      onChange(recovery ? event.target.value.trim() : event.target.value.replace(/\D/g, "").slice(0, 6))
    }
    inputProps={{
      inputMode: recovery ? "text" : "numeric",
      autoComplete: "one-time-code",
      style: { letterSpacing: recovery ? 2 : 8, fontSize: 20, textAlign: "center" },
    }}
    error={Boolean(error)}
    helperText={error}
  />
);

export default CodeField;
