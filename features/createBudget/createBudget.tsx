"use client"

import {
  BaseResponse,
  endPoints,
  getApi,
  isSuccessResponse,
  useRevalidateQuery,
} from "@/app/api";
import { updateUserBudget } from "@/app/indexDb";
import { User, useRootStore } from "@/app/rootStore";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  NumberInput,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  FormEvent, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";

export const CreateBudget = ({ id }: { id: string }) => {
  const { user, setUser } = useRootStore();

  const [isSelected, setIsSelected] = useState(false);

  const revalidate = useRevalidateQuery();

  const { data: users } = useQuery<BaseResponse<User[]>>({
    queryKey: [endPoints.users.endPoint],
    queryFn: () => getApi("users"),
    enabled: isSelected,
  });

  const usersRes = users?.data ? users.data : [];

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { [k: string]: FormDataEntryValue }) =>
      getApi("createBudget", {
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      if (isSuccessResponse(data)) {
        revalidate(endPoints.budget.endPoint);

        if ("_id" in data?.data?.budget) {
          updateUserBudget(user?._id ?? "", data.data.budget._id);

          if (!user) return;

          setUser({
            ...user,
            budget: data.data.budget._id,
          });
        }
      }
    },
  });

  const options = usersRes
    .filter((user) => user._id !== id)
    .map((user) => ({
      key: user._id,
      label: `${user?.name ?? ""} ${user.email}`,
    }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jsonData = Object.fromEntries(formData.entries());

    mutate({ ...jsonData, ownerId: id });
  };

  return (
    <Card isBlurred className="flex gap-1 min-w-80">
      <CardHeader className="flex gap-2">
        <MdOutlineCreateNewFolder color="#66aaf9" size={20} />
        Создать бюджет
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} className="w-full flex gap-8">
          <NumberInput
            name="startSum"
            isClearable
            variant="underlined"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">&#8381;</span>
              </div>
            }
            formatOptions={{
              style: "currency",
              currency: "RUB",
              currencyDisplay: "code",
              currencySign: "accounting",
            }}
            min={0}
            size="sm"
            placeholder="0.00"
            label="Начальная сумма в бюджете"
            defaultValue={0}
            labelPlacement="outside"
            fullWidth={false}
            minValue={0}
            className="w-full"
          />
          <Switch
            onValueChange={setIsSelected}
            isSelected={isSelected}
            size="sm"
          >
            Пригласить в бюджет
          </Switch>
          {isSelected && (
            <Select
              name="memberId"
              size="sm"
              variant="bordered"
              placeholder="Выберите пользователя"
              listboxProps={{
                emptyContent: "Пользователи не найдены :(",
              }}
            >
              {options.map((user) => (
                <SelectItem key={user.key}>{user.label}</SelectItem>
              ))}
            </Select>
          )}
          <Button
            type="submit"
            color="primary"
            variant="solid"
            isLoading={isPending}
            size="sm"
            radius="lg"
          >
            Создать
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
