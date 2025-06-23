import { TypeNotification} from "@/types";
import { useNotifications } from "./useNotifications";
import { InviteNotification } from "./inviteNotification";
import { Spacer } from "@heroui/react";

export const Notifications = () => {
  const { notifications } = useNotifications()

  return (
    <div className="flex-col w-full flex gap-4">
      {notifications?.map((alert) => {
        if(alert.type === TypeNotification.invitation) {
          return <InviteNotification key={alert.createdAt} notification={alert} />;
        }
        
        return <></>
      })}
      <Spacer y={2}/>
    </div>
  );
}