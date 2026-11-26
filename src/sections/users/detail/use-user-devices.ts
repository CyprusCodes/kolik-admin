import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePlatformUserSession,
  getPlatformUserDevices,
  postPlatformUserSignOutEverywhere,
} from "src/services/platformUsers/userDevices";

export const useUserDevices = (userId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["platform-user-devices", userId];
  const refresh = () => queryClient.invalidateQueries({ queryKey });

  const query = useQuery({
    queryKey,
    queryFn: () => getPlatformUserDevices(userId).then((response) => response.data),
    enabled: Number.isFinite(userId),
  });

  const signOutSession = useMutation({
    mutationFn: (sessionId: string) => deletePlatformUserSession(userId, sessionId),
    onSuccess: () => {
      toast.success("Device signed out");
      refresh();
    },
    onError: () => toast.error("Couldn't sign this device out. Try again."),
  });

  const signOutEverywhere = useMutation({
    mutationFn: () => postPlatformUserSignOutEverywhere(userId),
    onSuccess: () => {
      toast.success("Signed out of every device");
      refresh();
    },
    onError: () => toast.error("Couldn't sign this user out. Try again."),
  });

  return { ...query, signOutSession, signOutEverywhere };
};

export type UserDevicesController = ReturnType<typeof useUserDevices>;
