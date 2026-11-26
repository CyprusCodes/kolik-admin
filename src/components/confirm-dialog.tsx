import type { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import { AppModal } from "src/components/kolik/app-modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  danger?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  danger,
  loading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => (
  <AppModal
    open={open}
    onClose={onCancel}
    title={title}
    maxWidth="xs"
    actions={
      <>
        <Button color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color={danger ? "error" : "primary"}
          onClick={onConfirm}
          disabled={loading}
        >
          {confirmLabel}
        </Button>
      </>
    }
  >
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
  </AppModal>
);

export default ConfirmDialog;
