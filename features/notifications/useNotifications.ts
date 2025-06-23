import { useRootStore } from "@/app/rootStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Notifications as NotificationsType } from "@/types";
import { BaseResponse, endPoints, getApi } from "@/app/api";

export const useNotifications = () => {
    const { user } = useRootStore();
  
    const {
      data,
    } = useQuery<BaseResponse<NotificationsType>>({
      queryKey: [endPoints.notifications.endPoint],
      queryFn: () =>
        getApi(
          "notifications",
          {},
          `userId=${user?._id}`
        ),
    });

    return {
      notifications: data?.notifications,
    };
  
}