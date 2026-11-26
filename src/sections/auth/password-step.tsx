import { useState } from "react";
import type { FormEvent } from "react";
import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { PasswordField } from "src/components/mui/password-field";
import Authentication from "src/services/authentication";
import type { LoginChallenge } from "src/services/authentication";
import { apiErrorMessage } from "./api-error-message";
import LoginLayout from "./login-layout";

const PasswordStep = ({ onDone }: { onDone: (challenge: LoginChallenge) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emailError = touched && !/^\S+@\S+$/.test(email) ? "Enter a valid email" : null;
  const passwordError = touched && !password ? "Enter your password" : null;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!/^\S+@\S+$/.test(email) || !password) return;
    setSubmitting(true);
    setError(null);
    try {
      onDone(await new Authentication().startLogin({ email, password }));
    } catch (err) {
      setError(apiErrorMessage(err, "Wrong email or password."));
      setSubmitting(false);
    }
  };

  return (
    <LoginLayout title="Sign in" subtitle="Only Kolik super admins can use this app.">
      <form noValidate onSubmit={submit}>
        <Stack spacing={3} sx={{ mb: 2, mt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <PasswordField
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
        </Stack>
        {error && (
          <FormHelperText error sx={{ mt: 3 }}>
            {error}
          </FormHelperText>
        )}
        <Button
          disabled={submitting}
          fullWidth
          size="large"
          sx={{ mt: 2, mb: 2 }}
          type="submit"
          variant="contained"
        >
          Continue
        </Button>
      </form>
    </LoginLayout>
  );
};

export default PasswordStep;
