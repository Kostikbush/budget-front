"use client";

import { endPoints, getApi} from "@/app/api";
import {useRootStore } from "@/app/rootStore";
import { CreateBudget } from "@/features/createBudget/createBudget";
import {  Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { FC, } from "react";

const SkeletonCard = () => (
  <Card isBlurred className="flex min-w-80 min-h-56 p-4 gap-6" radius="lg">
    <Skeleton className="rounded-lg h-4 w-4/5" />
    <div className="gap-8 flex flex-col">
      <Skeleton className="w-3/5 h-6 rounded-lg" />
      <Skeleton className="w-10 rounded-lg h-4" />
      <Skeleton className="w-10 rounded-lg h-6" />
    </div>
  </Card>
);

export const Budget: FC = () => {
  const { user } = useRootStore();

  const { data, isFetching } = useQuery({
    queryKey: [endPoints.budget.endPoint],
    queryFn: () => getApi("budget", {}, `userId=${user?._id}`),
  });

  if (isFetching) {
    return <SkeletonCard />;
  }

  if (!data?.data?.budget?._id) {
    return <CreateBudget id={user?._id ?? ""} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="h-52 w-80">
        <CardHeader>scscsc</CardHeader>
        <CardBody>
          <div className="h-52">asdcascas</div>
          <div className="h-52">asdcascas</div>
        </CardBody>
      </Card>
      <Card className="h-52 w-80">
        <CardHeader>scscsc</CardHeader>
        <CardBody>
          <div className="h-52">asdcascas</div>
          <div className="h-52">asdcascas</div>
        </CardBody>
      </Card>
    </div>
  );
};