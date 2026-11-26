import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Link, Stack } from "@mui/material";
import Authentication from "src/services/authentication";
import { apiErrorMessage } from "./api-error-message";
import CodeField from "./code-field";
import LoginLayout from "./login-layout";

interface CodeStepProps {
  challengeToken: string;
  onDone: () => void;
  onRestart: () => void;
}

const CodeStep = ({ challengeToken, onDone, onRestart }: CodeStepProps) => {
  const [code, setCode] = useState("");
  const [recovery, setRecovery] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const ready = recovery ? code.length >= 10 : code.length === 6;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!ready) return;
    setSubmitting(true);
    setError(null);
    try {
      await new Authentication().verifyTwoFactor(challengeToken, code);
      onDone();
    } catch (err) {
      setError(apiErrorMessage(err, "That code isn't right. Try again."));
      setSubmitting(false);
    }
  };

  return (
    <LoginLayout
      title="Two-factor sign-in"
      subtitle={
        recovery
          ? "Enter one of the recovery codes you saved. Each code works once."
          : "Enter the 6-digit code from your authenticator app."
      }
    >
      <form noValidate onSubmit={submit}>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <CodeField value={code} onChange={setCode} recovery={recovery} error={error} />
          <Button disabled={submitting || !ready} fullWidth size="large" type="submit" variant="contained">
            Verify
          </Button>
          <Stack direction="row" justifyContent="space-between">
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => {
                setRecovery((current) => !current);
                setCode("");
                setError(null);
              }}
            >
              {recovery ? "Use authenticator code" : "Use a recovery code"}
            </Link>
            <Link component="button" type="button" variant="body2" color="text.secondary" onClick={onRestart}>
              Back to sign in
            </Link>
          </Stack>
        </Stack>
      </form>
    </LoginLayout>
  );
};

export default CodeStep;
