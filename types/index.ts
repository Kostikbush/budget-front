import { SVGProps } from "react";

export enum Frequency {
  once = "once",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum TypeNotification {
  newExpense = "newExpense",
  invitation = "invitation",
}

export interface Notification {
  ownerId: string;
  recipientId: string;
  type: TypeNotification;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type Notifications = Notification[];

export interface BudgetType {
  createdAt: string;
  members: { _id: string }[];
  name: string;
  owner: string;
  sum: number;
  updatedAt: string;
  _id: string;
}

export type BudgetTypeResponse = {
  data: { budget: BudgetType };
};

export interface IncomeType {
  budgetId: string;
  userId: string;
  title: string;
  amount: number;
  frequency: Frequency;
  date: string;
  createdAt: string;
  _id: string;
}

export interface IncomeDataRequestBody {
  title: string;
  amount: number;
  frequency: Frequency;
  date: string;
}

export interface IncomeTypeRequestBody {
  budgetId: string;
  userId: string;
  incomeData: IncomeDataRequestBody;
}

export type IncomeTypeResponse = {
  data: { incomes: IncomeType[] };
};