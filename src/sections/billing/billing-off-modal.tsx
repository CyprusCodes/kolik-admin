import { useState } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { AppModal } from "src/components/kolik/app-modal";

interface BillingOffModalProps {
  organizationName: string | null;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}

const BillingOffModal = ({ organizationName, onCancel, onConfirm }: BillingOffModalProps) => {
  const [reason, setReason] = useState("");

  return (
    <AppModal
      open={Boolean(organizationName)}
      onClose={onCancel}
      title={`Turn off billing for ${organizationName}?`}
      actions={
        <>
          <Button color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" disabled={!reason.trim()} onClick={() => onConfirm(reason.trim())}>
            Turn off billing
          </Button>
        </>
      }
    >
      <Stack spacing={3}>
        <Alert severity="info">
          They keep full access to Kolik and won't be charged or sent invoices until billing is turned back
          on.
        </Alert>
        <TextField
          variant="outlined"
          label="Reason"
          placeholder="e.g. Pilot partner, free until the end of the year"
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

export default BillingOffModal;
