import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import putOrganizationBilling from "src/services/organizations/putOrganizationBilling";
import BillingOffModal from "./billing-off-modal";

interface Target {
  id: number;
  name: string;
}

export const useBillingToggle = () => {
  const queryClient = useQueryClient();
  const [asking, setAsking] = useState<Target | null>(null);
  const resolveRef = useRef<(reason: string | null) => void>(() => undefined);

  const finish = (reason: string | null) => {
    setAsking(null);
    resolveRef.current(reason);
  };

  const toggle = useCallback(
    async (target: Target, enabled: boolean) => {
      const reason = enabled
        ? undefined
        : await new Promise<string | null>((resolve) => {
            resolveRef.current = resolve;
            setAsking(target);
          });
      if (!enabled && reason === null) {
        return false;
      }
      try {
        await putOrganizationBilling(target.id, { enabled, reason: reason ?? undefined });
        queryClient.invalidateQueries({ queryKey: ["organization", target.id] });
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
        toast.success(
          enabled ? `Billing turned on for ${target.name}` : `Billing turned off for ${target.name}`,
        );
        return true;
      } catch {
        toast.error("Something went wrong. Try again.");
        return false;
      }
    },
    [queryClient],
  );

  const modal = (
    <BillingOffModal
      key={asking?.id ?? "closed"}
      organizationName={asking?.name ?? null}
      onCancel={() => finish(null)}
      onConfirm={(reason) => finish(reason)}
    />
  );

  return { toggle, modal };
};
