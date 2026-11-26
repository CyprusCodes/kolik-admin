import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getOrganization from "src/services/organizations/getOrganization";
import patchOrganizationPlan from "src/services/organizations/patchOrganizationPlan";
import patchOrganizationStatus from "src/services/organizations/patchOrganizationStatus";
import putOrganizationApp from "src/services/organizations/putOrganizationApp";
import putOrganizationSessionRecording from "src/services/organizations/putOrganizationSessionRecording";
import type { OrganizationDetail, OrganizationStatus, PlanUpdate } from "src/types/organization";

export const useOrganization = (organizationId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["organization", organizationId];

  const query = useQuery({
    queryKey,
    queryFn: () => getOrganization(organizationId).then((response) => response.data.organization),
    enabled: Number.isFinite(organizationId),
  });

  const onSaved = (message: string) => (response: { data: { organization: OrganizationDetail } }) => {
    queryClient.setQueryData(queryKey, response.data.organization);
    queryClient.invalidateQueries({ queryKey: ["organizations"] });
    queryClient.invalidateQueries({ queryKey: ["overview"] });
    toast.success(message);
  };

  const onError = () => toast.error("Something went wrong. Try again.");

  const updatePlan = useMutation({
    mutationFn: (body: PlanUpdate) => patchOrganizationPlan(organizationId, body),
    onSuccess: onSaved("Plan updated"),
    onError,
  });

  const updateStatus = useMutation({
    mutationFn: (body: { status: OrganizationStatus; reason?: string }) =>
      patchOrganizationStatus(organizationId, body),
    onSuccess: (response, variables) =>
      onSaved(variables.status === "suspended" ? "Organization suspended" : "Organization reactivated")(
        response,
      ),
    onError,
  });

  const toggleApp = useMutation({
    mutationFn: ({ appId, enabled }: { appId: number; enabled: boolean }) =>
      putOrganizationApp(organizationId, appId, { enabled }),
    onSuccess: (response, variables) =>
      onSaved(variables.enabled ? "App turned on" : "App turned off")(response),
    onError,
  });

  const toggleSessionRecording = useMutation({
    mutationFn: (enabled: boolean) => putOrganizationSessionRecording(organizationId, { enabled }),
    onSuccess: (response, enabled) =>
      onSaved(enabled ? "Session recording turned on" : "Session recording turned off")(response),
    onError,
  });

  return { ...query, updatePlan, updateStatus, toggleApp, toggleSessionRecording };
};

export type OrganizationController = ReturnType<typeof useOrganization>;
