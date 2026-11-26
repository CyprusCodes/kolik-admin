import { useState } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { AppModal } from "src/components/kolik/app-modal";

interface SuspendModalProps {
  organizationName: string;
  opened: boolean;
  saving: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const SuspendModal = ({ organizationName, opened, saving, onClose, onConfirm }: SuspendModalProps) => {
  const [reason, setReason] = useState("");

  return (
    <AppModal
      open={opened}
      onClose={onClose}
      title={`Suspend ${organizationName}?`}
      actions={
        <>
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={!reason.trim() || saving}
            onClick={() => onConfirm(reason.trim())}
          >
            Suspend
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        <Alert severity="error">
          Nobody in this organization can log in until you reactivate it. Their data stays as it is.
        </Alert>
        <TextField
          variant="outlined"
          label="Reason"
          placeholder="e.g. Unpaid invoice after trial ended"
          multiline
          minRows={3}
          fullWidth
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
      </Stack>
    </AppModal>
  );
};

export default SuspendModal;
