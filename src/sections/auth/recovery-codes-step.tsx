import { useState } from "react";
import { ContentCopy as ContentCopyIcon, Download as DownloadIcon } from "@mui/icons-material";
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import toast from "react-hot-toast";
import LoginLayout from "./login-layout";

const RecoveryCodesStep = ({ codes, onDone }: { codes: string[]; onDone: () => void }) => {
  const [saved, setSaved] = useState(false);
  const text = codes.join("\n");

  const download = () => {
    const url = URL.createObjectURL(
      new Blob([`Kolik Admin recovery codes\n\n${text}\n`], { type: "text/plain" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "kolik-admin-recovery-codes.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <LoginLayout
      title="Save your recovery codes"
      subtitle="If you lose your phone, sign in with one of these instead of a code. Each one works once."
    >
      <Stack spacing={3} sx={{ mt: 2 }}>
        <Alert severity="warning">You won't see these codes again. Keep them somewhere safe.</Alert>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1.5,
            p: 2.5,
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            fontFamily: "monospace",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {codes.map((code) => (
            <Box key={code}>{code}</Box>
          ))}
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => {
              navigator.clipboard?.writeText(text);
              toast.success("Recovery codes copied");
            }}
          >
            Copy
          </Button>
          <Button fullWidth variant="outlined" startIcon={<DownloadIcon />} onClick={download}>
            Download
          </Button>
        </Stack>
        <FormControlLabel
          control={<Checkbox checked={saved} onChange={(event) => setSaved(event.target.checked)} />}
          label="I've saved my recovery codes"
        />
        <Button disabled={!saved} fullWidth size="large" variant="contained" onClick={onDone}>
          Continue to the admin panel
        </Button>
      </Stack>
    </LoginLayout>
  );
};

export default RecoveryCodesStep;
