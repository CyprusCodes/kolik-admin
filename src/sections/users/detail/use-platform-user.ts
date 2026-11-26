import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getPlatformUser from "src/services/platformUsers/getPlatformUser";
import patchPlatformUserStatus from "src/services/platformUsers/patchPlatformUserStatus";
import postPlatformUserPasswordReset from "src/services/platformUsers/postPlatformUserPasswordReset";
import type { UserStatus } from "src/types/user";

const failed = () => toast.error("Something went wrong. Try again.");

export const usePlatformUser = (userId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["platform-user", userId];

  const query = useQuery({
    queryKey,
    queryFn: () => getPlatformUser(userId).then((response) => response.data.user),
    enabled: Number.isFinite(userId),
  });

  const updateStatus = useMutation({
    mutationFn: (userStatus: UserStatus) => patchPlatformUserStatus(userId, userStatus),
    onSuccess: (response) => {
      queryClient.setQueryData(queryKey, response.data.user);
      toast.success(response.data.user.userStatus === "enabled" ? "User enabled" : "User disabled");
    },
    onError: failed,
  });

  const sendPasswordReset = useMutation({
    mutationFn: () => postPlatformUserPasswordReset(userId),
    onSuccess: (response) => toast.success(`Password reset email sent to ${response.data.email}`),
    onError: failed,
  });

  return { ...query, updateStatus, sendPasswordReset };
};
