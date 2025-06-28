import { IncomeType } from "@/types";
import { frequencyText } from "@/widgets/incomes/lib";
import { Chip, Skeleton } from "@heroui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { FC } from "react";

interface IncomeCardProps {
  handleChange: (income: IncomeType) => void;
  income: IncomeType;
}

export const IncomeCard: FC<IncomeCardProps> = ({
  income,
  handleChange
}) => {
  const {amount, date, frequency, title, } = income;

  return (
    <div className="flex flex-col gap-2 bg-white/5 backdrop-blur-lg border-white/20 border-1 bg-bluer p-2 rounded-lg">
      <div className="flex justify-between">
        <span>Название</span>
        <div className="w-32">
          <Chip
            radius="sm"
            color="primary"
            variant="faded"
            classNames={{
              content: "p-0",
            }}
          >
            {title}
          </Chip>
        </div>
      </div>
      <div className="flex justify-between">
        <span>Сумма дохода</span>
        <div className="w-32">
          <Chip radius="sm" color="primary" variant="faded">
            {amount}
          </Chip>
        </div>
      </div>
      <div className="flex justify-between">
        <span>Дата зачисления</span>
        <div className="w-32">
          <Chip radius="sm" color="primary" variant="faded">
            {format(date, "dd MMMMMMMM", { locale: ru })}
          </Chip>
        </div>
      </div>
      <div className="flex justify-between">
        <span>Периодичность</span>
        <div className="w-32">
          <Chip
            radius="sm"
            color="primary"
            classNames={{
              content: "p-0",
            }}
            variant="faded"
          >
            {frequencyText[frequency]}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export const IncomeCardSkeleton = () => (
  <div className="flex flex-col gap-2 bg-white/5 backdrop-blur-lg border-white/20 border-1 bg-bluer p-2 rounded-lg">
    <div className="flex justify-between">
      <Skeleton className="h-7 w-32 rounded-lg" />
      <div className="w-32">
        <Skeleton className="h-7 rounded-lg w-full" />
      </div>
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-7 rounded-lg w-32" />
      <div className="w-32">
        <Skeleton className="h-7 rounded-lg w-full" />
      </div>
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-7 rounded-lg w-32" />
      <div className="w-32">
        <Skeleton className="h-7 rounded-lg w-full" />
      </div>
    </div>
    <div className="flex justify-between">
      <Skeleton className="h-7 rounded-lg w-32" />
      <div className="w-32">
        <Skeleton className="h-7 rounded-lg w-full" />
      </div>
    </div>
  </div>
);