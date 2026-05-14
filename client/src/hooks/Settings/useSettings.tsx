import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { AppUserUpdateModel } from "../../models/Users/AppUserUpdateModel";
import { UserService } from "../../services/UserService";

export const useSettings = () => {
  const userId = useMemo(() => keycloakService.getCurrentUserId()!, []);
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => UserService.getUserById(userId),
  });

  const updateUserMutation = useMutation({
    mutationFn: (userData: AppUserUpdateModel) => {
      const payload: AppUserUpdateModel = {
        ...userData,
      };
      return UserService.updateUser(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  return {
    user,
    isLoading,
    updateUser: async (userData: AppUserUpdateModel) =>
      updateUserMutation.mutateAsync(userData),
  };
};
