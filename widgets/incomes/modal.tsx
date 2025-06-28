"use client"

import { Button, DatePicker, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, NumberInput, Select, SelectItem } from "@heroui/react"
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { FC, FormEvent, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useMutation } from "@tanstack/react-query";
import { endPoints, getApi, isSuccessResponse, useRevalidateQuery } from "@/app/api";
import { Frequency, IncomeDataRequestBody, IncomeTypeRequestBody } from "@/types";
import { useRootStore } from "@/app/rootStore";

interface ModalWrapperProps {
  isOpen: boolean;
  onOpenChange: () => void;
  initialData?: {
    _id: string;
    title: string,
    amount: number,
    frequency: Frequency,
    date: string;
  }
}

const frequencyOptions = [
  {
    label: 'одноразовый',
    key: "once",
  },
  {
    label: 'ежедневный',
    key: "daily",
  },
  {
    label: 'еженедельный',
    key: "weekly",
  },
  {
    label: 'ежемесячный',
    key: "monthly",
  },
  {
    label: 'ежегодный',
    key: "yearly",
  },
];

export const ModalWrapper: FC<ModalWrapperProps> = ({ isOpen, onOpenChange, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    amount: initialData?.amount || 0,
    frequency: initialData?.frequency || Frequency.once,
    date: initialData?.date || "",
  })
  const revalidate = useRevalidateQuery();
  const { user } = useRootStore();
  const [selectState, setSelectState] = useState<Frequency | null>(null);

  const isCreateIncome = !initialData;

  

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IncomeTypeRequestBody) =>
      getApi("createIncome", {
        body: JSON.stringify(data),
      }),
      onSuccess(data) {
        if (!isSuccessResponse(data)) return;
        
        revalidate(endPoints.incomes.endPoint)

        onOpenChange()
      },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(
      formData.entries()
    ) as unknown as IncomeDataRequestBody;

    const data: IncomeTypeRequestBody = {
      budgetId: user?.budget ?? "",
      userId: user?._id ?? "",
      incomeData: {
        amount: parseInt(jsonData.amount as unknown as string, 10),
        date: (jsonData?.date ?? ""),
        frequency: jsonData.frequency,
        title: jsonData?.title,
      },
    };
    
    mutate(data);
  };

  return (
    <Modal
      backdrop="blur"
      onOpenChange={onOpenChange}
      placement="top-center"
      isOpen={isOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2 items-center">
              Добавление дохода
              <LiaMoneyCheckAltSolid color="#12A150" size={25} />
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 items-center"
              >
                <div className="flex flex-col gap-4 w-full">
                  <Input
                    variant="bordered"
                    radius="lg"
                    label="Название"
                    isRequired
                    labelPlacement="inside"
                    size="sm"
                    maxLength={10}
                    name="title"
                  />
                  <NumberInput
                    labelPlacement="inside"
                    isClearable
                    size="sm"
                    variant="bordered"
                    radius="lg"
                    label="Сумма дохода"
                    max={9999999999}
                    maxValue={9999999999}
                    isRequired
                    formatOptions={{
                      style: "currency",
                      currency: "RUB",
                    }}
                    name="amount"
                  />
                  <Select
                    variant="bordered"
                    radius="lg"
                    label="Периодичность"
                    isRequired
                    labelPlacement="inside"
                    size="sm"
                    name="frequency"
                    onChange={(event) =>
                      setSelectState(event.target.value as Frequency)
                    }
                  >
                    {frequencyOptions.map((frequency) => (
                      <SelectItem key={frequency.key}>
                        {frequency.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <DatePicker
                    isDisabled={selectState === Frequency.once || !selectState}
                    variant="bordered"
                    radius="lg"
                    isRequired={selectState !== Frequency.once || !!selectState}
                    name="date"
                    labelPlacement="inside"
                    minValue={today(getLocalTimeZone())}
                    size="sm"
                    label="Дата дохода"
                  />
                </div>
                <div className="flex gap-6">
                  <Button
                    color="primary"
                    variant="faded"
                    radius="lg"
                    onPress={onClose}
                    isDisabled={isPending}
                  >
                    отмена
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    radius="lg"
                    isLoading={isPending}
                  >
                    {isCreateIncome ? "создать" : "обновить"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};