import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, Link, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import Authentication from "src/services/authentication";
import type { TwoFactorSetup } from "src/services/authentication";
import { apiErrorMessage } from "./api-error-message";
import CodeField from "./code-field";
import LoginLayout from "./login-layout";

interface SetupStepProps {
  challengeToken: string;
  onDone: (recoveryCodes: string[]) => void;
  onRestart: () => void;
}

const groupSecret = (secret: string) => secret.replace(/(.{4})/g, "$1 ").trim();

const SetupStep = ({ challengeToken, onDone, onRestart }: SetupStepProps) => {
  const [setup, setSetup] = useState<TwoFactorSetup | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    new Authentication()
      .startTwoFactorSetup(challengeToken)
      .then((result) => active && setSetup(result))
      .catch(
        (err) => active && setLoadError(apiErrorMessage(err, "Couldn't start the setup. Sign in again.")),
      );
    return () => {
      active = false;
    };
  }, [challengeToken]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (code.length !== 6) return;
    setSubmitting(true);
    setError(null);
    try {
      const { recoveryCodes } = await new Authentication().verifyTwoFactor(challengeToken, code);
      onDone(recoveryCodes ?? []);
    } catch (err) {
      setError(apiErrorMessage(err, "That code isn't right. Try again."));
      setSubmitting(false);
    }
  };

  return (
    <LoginLayout
      title="Set up two-factor sign-in"
      subtitle="The admin panel needs a code from an authenticator app, such as Google Authenticator, Microsoft Authenticator or 1Password."
    >
      {loadError ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Alert severity="error">{loadError}</Alert>
          <Button variant="outlined" onClick={onRestart}>
            Back to sign in
          </Button>
        </Stack>
      ) : (
        <form noValidate onSubmit={submit}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">1. Scan this QR code with your authenticator app</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {setup ? (
                <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, border: 1, borderColor: "divider" }}>
                  <QRCodeSVG value={setup.otpauthUrl} size={176} />
                </Box>
              ) : (
                <Skeleton variant="rounded" width={210} height={210} />
              )}
            </Box>
            {setup && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Can't scan it? Enter this key:
                </Typography>
                <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                  {groupSecret(setup.secret)}
                </Typography>
                <Tooltip title="Copy key">
                  <IconButton
                    size="small"
                    onClick={() => {
                      navigator.clipboard?.writeText(setup.secret);
                      toast.success("Key copied");
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
            <Typography variant="subtitle2">2. Enter the 6-digit code it shows</Typography>
            <CodeField value={code} onChange={setCode} error={error} />
            <Button
              disabled={!setup || submitting || code.length !== 6}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Turn on two-factor sign-in
            </Button>
            <Link component="button" type="button" variant="body2" color="text.secondary" onClick={onRestart}>
              Back to sign in
            </Link>
          </Stack>
        </form>
      )}
    </LoginLayout>
  );
};

export default SetupStep;
