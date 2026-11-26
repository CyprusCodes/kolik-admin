import { useState } from "react";
import type { TextFieldProps } from "@mui/material";
import { IconButton, InputAdornment, SvgIcon, TextField } from "@mui/material";
import EyeIcon from "@untitled-ui/icons-react/build/esm/Eye";
import EyeOffIcon from "@untitled-ui/icons-react/build/esm/EyeOff";

export const PasswordField = (props: TextFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? "Hide password" : "Show password"}
              edge="end"
              onClick={() => setVisible((shown) => !shown)}
            >
              <SvgIcon fontSize="small">{visible ? <EyeOffIcon /> : <EyeIcon />}</SvgIcon>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
