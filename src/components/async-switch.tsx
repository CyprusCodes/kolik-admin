import { useState } from "react";
import { Switch } from "@mui/material";

interface AsyncSwitchProps {
  checked: boolean;
  onToggle: (value: boolean) => Promise<boolean>;
  "aria-label"?: string;
}

const AsyncSwitch = ({ checked, onToggle, ...rest }: AsyncSwitchProps) => {
  const [value, setValue] = useState(checked);
  const [pending, setPending] = useState(false);

  const change = async (next: boolean) => {
    setPending(true);
    setValue(next);
    const applied = await onToggle(next);
    if (!applied) {
      setValue(!next);
    }
    setPending(false);
  };

  return (
    <Switch
      checked={value}
      disabled={pending}
      inputProps={{ "aria-label": rest["aria-label"] }}
      onChange={(event) => change(event.target.checked)}
      onClick={(event) => event.stopPropagation()}
    />
  );
};

export default AsyncSwitch;
