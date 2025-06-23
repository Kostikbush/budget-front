"use client";

import { endPoints, getApi} from "@/app/api";
import {useRootStore } from "@/app/rootStore";
import { CreateBudget } from "@/features/createBudget/createBudget";
import { formatNumberWithSpaces } from "@/lib/format";
import { BudgetTypeResponse } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Skeleton,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

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

const currentVal = "RUB";

export const Budget: FC = () => {
  const { user } = useRootStore();

  const { data, isFetching } = useQuery<BudgetTypeResponse>({
    queryKey: [endPoints.budget.endPoint],
    queryFn: () => getApi("budget", {}, `userId=${user?._id}`),
  });

  if (isFetching) {
    return <SkeletonCard />;
  }

  if (!data?.data?.budget?._id) {
    return <CreateBudget id={user?._id ?? ""} />;
  }

  const { sum, createdAt } = data.data.budget;

  console.log(data.data.budget);

  return (
    <div className="flex flex-col gap-6">
      <Card isBlurred className="p-2">
        <CardHeader className="h-10 gap-6 bg-white/5 backdrop-blur-md border-white/20 border-1 py-1 rounded-large  w-50% shadow-small z-10">
          <p className="text-tiny text-white/80 uppercase justify-between items-center flex w-full">
            <span>бюджет</span>{" "}
            <span className="text-sm">
              {formatNumberWithSpaces(sum)} {currentVal}
            </span>
          </p>
        </CardHeader>
        <CardBody className="min-w-80 min-h-52">acsa</CardBody>
        <CardFooter className="gap-6 bg-white/10 backdrop-blur-md border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large w-90% shadow-small z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
          >
            Notify me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};