import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useMemo } from "react";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { UserImageListDto } from "../../models/UserImageListDto";
import { AppUserUpdateModel } from "../../models/Users/AppUserUpdateModel";
import { UserService } from "../../services/UserService";

export const useSettings = () => {
  const userId = useMemo(() => keycloakService.getCurrentUserId()!, []);
  const queryClient = useQueryClient();
  const { isLoading, data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return UserService.getUserById(userId);
    },
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

  const uploadUserImage = useMutation({
    mutationFn: (image: ImagePicker.ImagePickerAsset) => {
      return UserService.uploadImage(image);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["userImage", userId], () => {
        return { ...data } as UserImageListDto;
      });
    },
  });

  return {
    user: userData,
    isLoading,
    updateUser: async (userData: AppUserUpdateModel) =>
      updateUserMutation.mutateAsync(userData),
    uploadUserImage: async (image: ImagePicker.ImagePickerAsset) =>
      uploadUserImage.mutateAsync(image),
  };
};
