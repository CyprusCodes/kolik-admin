import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "src/components/confirm-dialog";
import patchOrganizationPlan from "src/services/organizations/patchOrganizationPlan";
import type { OrganizationRow } from "src/types/organization";

export const useMakePaid = () => {
  const queryClient = useQueryClient();
  const [target, setTarget] = useState<OrganizationRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const makePaid = useMutation({
    mutationFn: (row: OrganizationRow) =>
      patchOrganizationPlan(row.organization_id, {
        planType: "paid",
        tier: row.organization_tier_type,
        maxEmployees: null,
        trialExpiresAt: null,
      }),
    onSuccess: (_, row) => {
      toast.success(`${row.organization_name} is now on a paid plan`);
      queryClient.invalidateQueries({ queryKey: ["organization", row.organization_id] });
      queryClient.invalidateQueries({ queryKey: ["overview"] });
      setTarget(null);
      setRefreshKey((key) => key + 1);
    },
    onError: () => toast.error("Couldn't change the plan. Try again."),
  });

  const modal = (
    <ConfirmDialog
      open={Boolean(target)}
      title={`Make ${target?.organization_name ?? "this organization"} paid?`}
      message="Their plan becomes paid, the employee limit is removed and the trial end date is cleared."
      confirmLabel="Make paid"
      loading={makePaid.isPending}
      onCancel={() => setTarget(null)}
      onConfirm={() => target && makePaid.mutate(target)}
    />
  );

  return { open: setTarget, refreshKey, modal };
};
