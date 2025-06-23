import { FC, FormEvent } from "react";

import { Spacer } from "@heroui/spacer";
import { Form, Input, Button, Card, CardBody, addToast } from "@heroui/react";
import { getApi } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addUser } from "../indexDb";

interface LoginProps {
  
}
 
const Login: FC<LoginProps> = () => {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      [k: string]: FormDataEntryValue;
  }) => getApi("login", {
        body: JSON.stringify(data),
      }),
    onSuccess(data, variables) {
        if (data?.data?.user && "_id" in data.data.user) {
          const user = {
            name: data.data.user.name,
            email: variables.email,
            _id: data.data.user._id,
            password: variables.password,
            budget: data.data.user.budgets.length ? data.data.user.budgets[0] : "",
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
              }, 2000)

              
            })
            .catch((e) => console.log("Error in indexDb", e));
        }
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData.entries());
    
    mutate(jsonData);
  };

  return (
    <Card>
      <CardBody className="flex justify-center items-center min-w-80">
        <h2>Вход</h2>
        <Spacer y={4} />
        <Form
          className="w-full flex items-center gap-8 flex-col"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            errorMessage="Введите валидный email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            isRequired
            errorMessage="Введите пароль"
            label="Пароль"
            labelPlacement="outside"
            name="password"
            placeholder="Введите пароль"
            type="password"
            
          />
          <Button
            isLoading={isPending}
            radius="lg"
            color="primary"
            type="submit"
            variant="shadow"
          >
            Войти
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
 
export default Login;