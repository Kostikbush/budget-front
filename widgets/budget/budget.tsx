"use client";

import { CreateBudget } from "@/features/createBudget/createBudget";
import { formatNumberWithSpaces } from "@/lib/format";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";
import { FC } from "react";
import { useBudget } from "./useBudget";
import { History } from "@/features/history/history";
import { TbPigMoney } from "react-icons/tb";

const currentVal = "RUB";

export const Budget: FC = () => {
  const { budget, isFetchingBudget, user } = useBudget();

  if (!budget?._id && !isFetchingBudget) {
    return <CreateBudget id={user?._id ?? ""} />;
  }

  const sum = budget?.sum ?? 0;

  console.log(budget);

  return (
    <div className="flex flex-col gap-6">
      <Card isBlurred className="p-2">
        <CardHeader className="h-10 gap-6 bg-white/5 backdrop-blur-md border-white/20 border-1 py-1 rounded-large  w-50% shadow-small z-10">
          <div className="text-tiny text-white/80 uppercase justify-between items-center flex w-full">
            <span className="flex items-center gap-2 text-start">
              бюджет <TbPigMoney size={16} color="#338EF7" />
            </span>{" "}
            <Skeleton
              className="rounded-lg h-full"
              isLoaded={!isFetchingBudget}
            >
              <span className="text-sm">
                {formatNumberWithSpaces(sum)} {currentVal}
              </span>
            </Skeleton>
          </div>
        </CardHeader>
        <CardBody className="min-w-80 min-h-52">
          <History />
        </CardBody>
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