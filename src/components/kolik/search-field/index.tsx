import type { ChangeEvent, FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import { IconButton, InputAdornment, SvgIcon, TextField } from "@mui/material";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

export const SearchField: FC<SearchFieldProps> = ({ value, onChange, placeholder, sx }) => {
  return (
    <TextField
      fullWidth
      hiddenLabel
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SvgIcon sx={{ color: "text.secondary", fontSize: 20 }}>
              <SearchMdIcon />
            </SvgIcon>
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => onChange("")} edge="end" aria-label={"Clear"}>
              ✕
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={[
        {
          maxWidth: 840,
          "& .MuiOutlinedInput-root": {
            height: 48,
            borderRadius: 2,
            fontSize: "0.95rem",
            alignItems: "center",
            color: "text.secondary",
            bgcolor: "neutral.50",
            "& fieldset": { borderColor: "neutral.200" },
            "&:hover fieldset": { borderColor: "neutral.300" },
            "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 1 },
          },
          "& .MuiOutlinedInput-input": {
            height: "100%",
            boxSizing: "border-box",
            py: 0,
            lineHeight: "20px",
            color: "text.secondary",
            "&::placeholder": { color: "text.disabled", opacity: 1 },
          },
          "& .MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "none",
            display: "flex",
            alignItems: "center",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};
