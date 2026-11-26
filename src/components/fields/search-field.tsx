import { IconButton, InputAdornment, TextField } from "@mui/material";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchField = ({ value, onChange, placeholder }: SearchFieldProps) => (
  <TextField
    fullWidth
    variant="outlined"
    label="Search"
    placeholder={placeholder}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    InputProps={{
      endAdornment: value ? (
        <InputAdornment position="end">
          <IconButton size="small" onClick={() => onChange("")} edge="end" aria-label="Clear">
            ✕
          </IconButton>
        </InputAdornment>
      ) : null,
    }}
    sx={{ maxWidth: 840 }}
  />
);

export default SearchField;
