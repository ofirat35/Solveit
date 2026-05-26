import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useMemo } from "react";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { UserImageListDto } from "../../models/UserImageListDto";
import { AppUserListModel } from "../../models/Users/AppUserListModel";
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

  const { data: userImageData } = useQuery({
    queryKey: ["userImage", userId],
    queryFn: () => UserService.getUserImage(userId),
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
      queryClient.setQueryData(["user", userId], (old: AppUserListModel) => {
        return { ...old, profileImage: data?.imagePath } as AppUserListModel;
      });
      queryClient.setQueryData(["userImage", userId], () => {
        return { ...data } as UserImageListDto;
      });
    },
  });

  const combinedUser = useMemo(() => {
    if (!userData) return null;
    return {
      ...userData,
      // Fallback to whatever comes first: the image path from the image query,
      // or the baseline string property on the user object itself
      profileImage: userImageData?.imagePath,
    };
  }, [userData, userImageData]);

  return {
    user: combinedUser,
    isLoading,
    updateUser: async (userData: AppUserUpdateModel) =>
      updateUserMutation.mutateAsync(userData),
    uploadUserImage: async (image: ImagePicker.ImagePickerAsset) =>
      uploadUserImage.mutateAsync(image),
  };
};
