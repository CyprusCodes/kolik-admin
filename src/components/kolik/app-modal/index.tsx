import { Close as CloseIcon, InfoOutlined as InfoOutlinedIcon } from "@mui/icons-material";
import type { FC, ReactNode } from "react";
import type { Breakpoint, SxProps, Theme } from "@mui/material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

interface AppModalProps {
  open: boolean;
  onClose?: () => void;
  title: ReactNode;
  info?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  actionsAlign?: "right" | "space-between";
  maxWidth?: Breakpoint | false;
  fullWidth?: boolean;
  closeLabel?: string;
  hideClose?: boolean;
  disableContentPadding?: boolean;
  contentSx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  disableRestoreFocus?: boolean;
}

export const AppModal: FC<AppModalProps> = ({
  open,
  onClose,
  title,
  info,
  icon,
  children,
  actions,
  actionsAlign = "right",
  maxWidth = "sm",
  fullWidth = true,
  closeLabel = "Close",
  hideClose = false,
  disableContentPadding = false,
  contentSx,
  paperSx,
  disableRestoreFocus,
}) => {
  const heading = (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0 }}>
      <Typography variant="h6" fontWeight={600} noWrap>
        {title}
      </Typography>
      {info && <InfoOutlinedIcon sx={{ fontSize: 18, color: "text.disabled", flexShrink: 0 }} />}
    </Stack>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      disableRestoreFocus={disableRestoreFocus}
      PaperProps={{
        sx: [
          {
            borderRadius: "12px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
          ...(Array.isArray(paperSx) ? paperSx : [paperSx]),
        ],
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
        {icon && (
          <Box sx={{ display: "inline-flex", color: "primary.main", "& svg": { fontSize: 22 } }}>{icon}</Box>
        )}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {info ? (
            <Tooltip title={info} placement="bottom-start">
              <Box sx={{ display: "inline-flex", maxWidth: "100%", cursor: "help" }}>{heading}</Box>
            </Tooltip>
          ) : (
            heading
          )}
        </Box>
        {!hideClose && onClose && (
          <IconButton aria-label={closeLabel} onClick={onClose} size="small" sx={{ mr: -0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      <DialogContent
        sx={[
          { pt: "8px !important" },
          disableContentPadding && { p: 0, pt: "0 !important" },
          ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
        ]}
      >
        {children}
      </DialogContent>

      {actions && (
        <>
          <Divider />
          <DialogActions
            sx={{
              px: 3,
              py: 1.5,
              gap: 1.5,
              justifyContent: actionsAlign === "space-between" ? "space-between" : "flex-end",
              "& > :not(:first-of-type)": { ml: 0 },
            }}
          >
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
