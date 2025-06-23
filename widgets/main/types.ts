import { User } from "@/app/rootStore";

export interface Budget {
  _id: string;
  name: string;
  sum: number;
  members: User[];
  owner: User;
  createdAt: string;
}