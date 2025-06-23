"use client"

import { endPoints, getApi, isSuccessResponse, useRevalidateQuery } from "@/app/api";
import { updateUserBudget } from "@/app/indexDb";
import { useRootStore } from "@/app/rootStore";
import { Notification as NotificationType } from "@/types";
import { Alert, Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { GoQuestion } from "react-icons/go";

interface InviteNotificationProps {
  notification: NotificationType;
}

export const InviteNotification: FC<InviteNotificationProps> = ({notification}) => {
  const { user, setUser } = useRootStore();
  const revalidate = useRevalidateQuery();

  const { isPending: isPendingAcceptInvite, mutate: acceptInvite } =
    useMutation({
      mutationFn: () => getApi("acceptInvite", {}, `userId=${user?._id}`),
      onSuccess: (data) => {
          if(isSuccessResponse(data)) {
            revalidate([endPoints.budget.endPoint, endPoints.notifications.endPoint]);

            if ("_id" in data?.data?.budget){
              updateUserBudget(user?._id ?? '', data.data.budget._id);

              if (!user) return;

              setUser({
                ...user,
                budget: data.data.budget._id,
              });
            }
          }
      },
    });

  const { isPending: isPendingRejectInvite, mutate: rejectInvite } =
    useMutation({
      mutationFn: () => getApi("rejectInvite", {}, `userId=${user?._id}`),
      onSuccess: () => revalidate(endPoints.notifications.endPoint)
    });

  return (
    <Alert
      radius="lg"
      variant="flat"
      hideIcon
      key={notification.createdAt}
      color="warning"
      title={
        <Popover
          className="w-80"
          backdrop="blur"
          placement="bottom"
          showArrow={true}
        >
          <PopoverTrigger>
            <span className="flex gap-2 items-center">
              {notification.message} <GoQuestion />
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <span>
              Если вы примите приглашение <br /> то создать свой бюджет не
              сможете!
            </span>
          </PopoverContent>
        </Popover>
      }
    >
      <div className="flex gap-2 justify-center items-center pt-2">
        <Button
          isDisabled={isPendingRejectInvite}
          isLoading={isPendingAcceptInvite}
          onPress={() => acceptInvite()}
          radius="lg"
          size="sm"
          color="primary"
          variant="solid"
        >
          Принять
        </Button>
        <Button
          onPress={() => rejectInvite()}
          isLoading={isPendingRejectInvite}
          isDisabled={isPendingAcceptInvite}
          size="sm"
          radius="lg"
          variant="bordered"
        >
          Отклонить
        </Button>
      </div>
    </Alert>
  );
};