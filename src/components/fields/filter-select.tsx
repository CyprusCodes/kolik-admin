import { MenuItem, TextField } from "@mui/material";

interface FilterSelectProps {
  label: string;
  allLabel: string;
  value: string | null;
  data: { value: string; label: string }[];
  onChange: (value: string | null) => void;
}

const FilterSelect = ({ label, allLabel, value, data, onChange }: FilterSelectProps) => (
  <TextField
    variant="outlined"
    select
    SelectProps={{ displayEmpty: true }}
    InputLabelProps={{ shrink: true }}
    label={label}
    value={value ?? ""}
    onChange={(event) => onChange(event.target.value || null)}
    sx={{ minWidth: 200 }}
  >
    <MenuItem value="">{allLabel}</MenuItem>
    {data.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default FilterSelect;
