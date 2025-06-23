import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum TypeNotification {
  newExpense="newExpense",
  invitation="invitation",
};

export interface Notification {
  ownerId: string;
  recipientId: string;
  type: TypeNotification;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type Notifications = Notification[]