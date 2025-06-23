import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast, Card, CardBody, Form, Spacer } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { FC, FormEvent } from "react";
import { getApi } from "../api";
import { addUser } from "../indexDb";

interface RegistrationProps {
  
}
 
const Registration: FC<RegistrationProps> = () => {
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: (data: { [k: string]: FormDataEntryValue }) =>
      getApi("register", {
        body: JSON.stringify(data),
      }),
    onSuccess: (data, variables) => {
      if (data?.data?.user && "_id" in data.data.user) {
        const user = {
          name: data.data.user.name,
          email: variables.email,
          _id: data.data.user._id,
          password: variables.password,
          budget: data.data.user.budgets.length
            ? data.data.user.budgets[0]
            : "",
        };

        addUser(user)
          .then(() => {
            addToast({
              title: `Добро пожаловать ${data.data.user.name}`,
              color: "success",
              timeout: 2000,
              shouldShowTimeoutProgress: false,
              onClose: () => {
                router.push("/");
              },
            });
            const timeout = setTimeout(() => {
              router.push("/");

              clearTimeout(timeout);
            }, 2000);
          })
          .catch((e) => console.log("Error in indexDb", e));
      }
    },
  });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const jsonData = Object.fromEntries(formData.entries());

      mutate(jsonData);
    };

  return (
    <Card>
      <CardBody className="flex justify-center items-center min-w-80">
        <h2>Регистрация</h2>
        <Spacer y={4} />
        <Form
          className="w-full flex items-center gap-6 flex-col"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            errorMessage="Введите валидный email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Введите ваш email"
            type="email"
          />
          <Input
            isRequired
            errorMessage="Обязательное поле"
            label="Имя"
            labelPlacement="outside"
            name="name"
            placeholder="Введите ваше имя"
            type="name"
          />
          <Input
            isRequired
            errorMessage="Обязательное поле"
            label="Пароль"
            labelPlacement="outside"
            name="password"
            placeholder="Придумайте пароль"
            type="password"
          />
          <Button radius="lg" color="primary" type="submit" variant="shadow">
            Зарегистрироваться
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
 
export default Registration;