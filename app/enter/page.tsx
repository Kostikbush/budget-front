"use client";

import { Spacer, Tab, Tabs } from "@heroui/react";
import { IoEnterOutline } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";
import Login from "./login";
import Registration from "./registration";

export default function Page() {
  return (
    <section className="h-full w-full flex flex-col justify-start items-center overflow-y-hidden">
      <Spacer y={4} />
      <Tabs
        variant="underlined"
        color="primary"
        aria-label="Options"
      >
        <Tab
          key="login"
          title={
            <div className="flex items-center gap-1">
              <IoEnterOutline size={20} />
              Войти
            </div>
          }
        >
          <Login />
        </Tab>
        <Tab
          key="registration"
          title={
            <div className="flex items-center gap-1">
              Регистрация <MdOutlineAppRegistration size={20} />
            </div>
          }
        >
          <Registration />
        </Tab>
      </Tabs>
    </section>
  );
}
