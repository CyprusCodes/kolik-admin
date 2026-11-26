import { useCallback } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import putOrganizationSessionRecording from "src/services/organizations/putOrganizationSessionRecording";

export const useSessionRecordingToggle = () => {
  const queryClient = useQueryClient();

  return useCallback(
    async (target: { id: number; name: string }, enabled: boolean) => {
      try {
        await putOrganizationSessionRecording(target.id, { enabled });
        queryClient.invalidateQueries({ queryKey: ["organization", target.id] });
        toast.success(
          enabled
            ? `Session recording turned on for ${target.name}`
            : `Session recording turned off for ${target.name}`,
        );
        return true;
      } catch {
        toast.error("Something went wrong. Try again.");
        return false;
      }
    },
    [queryClient],
  );
};
