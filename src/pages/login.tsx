import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CodeStep from "src/sections/auth/code-step";
import PasswordStep from "src/sections/auth/password-step";
import RecoveryCodesStep from "src/sections/auth/recovery-codes-step";
import SetupStep from "src/sections/auth/setup-step";
import type { LoginChallenge } from "src/services/authentication";

type Step =
  | { name: "password" }
  | { name: "setup"; challengeToken: string }
  | { name: "code"; challengeToken: string }
  | { name: "recovery"; codes: string[] };

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>({ name: "password" });

  const finish = () => {
    const returnTo = searchParams.get("returnTo");
    navigate(returnTo && returnTo.startsWith("/") ? returnTo : "/", { replace: true });
  };
  const restart = () => setStep({ name: "password" });

  if (step.name === "setup") {
    return (
      <SetupStep
        challengeToken={step.challengeToken}
        onRestart={restart}
        onDone={(codes) => (codes.length ? setStep({ name: "recovery", codes }) : finish())}
      />
    );
  }

  if (step.name === "code") {
    return <CodeStep challengeToken={step.challengeToken} onRestart={restart} onDone={finish} />;
  }

  if (step.name === "recovery") {
    return <RecoveryCodesStep codes={step.codes} onDone={finish} />;
  }

  return (
    <PasswordStep
      onDone={({ challengeToken, twoFactorSetupRequired }: LoginChallenge) =>
        setStep(twoFactorSetupRequired ? { name: "setup", challengeToken } : { name: "code", challengeToken })
      }
    />
  );
};

export default LoginPage;
