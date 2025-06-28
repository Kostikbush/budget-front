import { endPoints, getApi } from "@/app/api"
import { useRootStore } from "@/app/rootStore"
import { IncomeType, IncomeTypeResponse } from "@/types"
import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, useDisclosure } from "@heroui/react"
import { useQuery } from "@tanstack/react-query"
import { BsExclamationOctagon } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { ModalWrapper } from "./modal";
import { IncomeCard, IncomeCardSkeleton } from "@/entities/income-card/income-card"
import { useState } from "react"

export const columns = [
  { label: "название", key: "title" },
  { label: "периодичность", key: "frequency" },
  { label: "сумма", key: "amount" },
  { label: "дата", key: "date" },
];

export const Incomes = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectIncome, setSelectIncome] = useState <IncomeType | null>(null);
  const { user } = useRootStore();

  const {data, isFetching } =
    useQuery<IncomeTypeResponse>({
      queryKey: [endPoints.incomes.endPoint],
      queryFn: () =>
        getApi("incomes", {}, `userId=${user?._id}&budgetId=${user?.budget}`),
  });

  const incomes = data?.data?.incomes ?? [];

  const handleChange = (income: IncomeType) => {
    setSelectIncome(income);
  };

  const canRender = !isFetching && incomes.length > 0; 
  const emptyList = !isFetching && incomes.length === 0; 
  
  return (
    <>
      <Card isBlurred className="min-w-[370px] p-2 gap-4">
        <CardHeader className="gap-3 h-10 bg-white/5 backdrop-blur-md border-white/20 border-1 p-2 rounded-large w-50% shadow-small z-10">
          Добавленные источники доходов <GrMoney size={20} color="#338EF7" />
        </CardHeader>
        <CardBody className="p-1">
          {isFetching && (
            <div className="flex gap-2 flex-col h-96 overflow-auto scrollbar-custom p-1">
              {[1, 2, 3].map((num) => (
                <IncomeCardSkeleton key={num} />
              ))}
            </div>
          )}
          {canRender && (
            <div className="flex gap-2 flex-col h-96 overflow-auto scrollbar-custom p-1">
              {incomes.map((income) => (
                <IncomeCard
                  handleChange={handleChange}
                  income={income}
                  key={income._id}
                />
              ))}
            </div>
          )}
          {emptyList && (
            <div className="w-full text-center flex gap-3 items-center justify-center">
              У вас нет доходов
              <BsExclamationOctagon size={20} color="#338EF7" />
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Button
            onPress={onOpen}
            isIconOnly
            color="primary"
            radius="full"
            size="sm"
            variant="flat"
          >
            <IoMdAdd size={20} />
          </Button>
        </CardFooter>
      </Card>
      <ModalWrapper onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  );
}