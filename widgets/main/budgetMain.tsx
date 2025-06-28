"use client";

import { Budget } from "../budget/budget";

import { Notifications } from "@/features/notifications/notifications";

import { IoMdExit } from "react-icons/io";
import { Link } from "@heroui/link";
import { useRootStore } from "@/app/rootStore";
import { clearUsers } from "@/app/indexDb";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Button, Image, Tab, Tabs } from "@heroui/react";

import { AiOutlineAim } from "react-icons/ai";

import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

import blackLogo from "./logo_black3.png";
import { IoHomeOutline } from "react-icons/io5";
import { useScroll } from "./useScroll";
import { Incomes } from "../incomes/income";

const tabsKeys = {
  budget: "budget",
  income: "income",
  expense: "expense",
  aim: "aim",
};

const tabs = [
  {
    key: tabsKeys.budget,
    icon: <IoHomeOutline size={20} />,
    component: <Budget />,
  },
  {
    key: tabsKeys.income,
    icon: <GiReceiveMoney size={20} />,
    component: <Incomes />,
  },
  {
    key: tabsKeys.expense,
    icon: <GiPayMoney size={20} />,
    component: <Budget />,
  },
  {
    key: tabsKeys.aim,
    icon: <AiOutlineAim size={20} />,
    component: <Budget />,
  },
].map((item) => ({
  ...item,
  component: (
    <div className="w-full overflow-y-auto items-center justify-start flex flex-col h-full gap-4">
      {item.component}
    </div>
  ),
}));

export const BudgetMain = () => {
  const { hideTabs, scrollContainerRef, toggleTabs } = useScroll();
  const { setUser, user } = useRootStore();

  const blockTabs = !user?.budget;

  const exit = () => {
    clearUsers();
    setUser(null);
  };

  return (
    <section className="flex flex-col items-center justify-start h-[100dvh]">
      <header className="w-full p-2 flex justify-between">
        <Image
          className="object-contain"
          height={30}
          width={90}
          alt="logo"
          src={blackLogo.src}
        />
        <Link
          href="/enter"
          onClick={exit}
          showAnchorIcon
          size="lg"
          anchorIcon={<IoMdExit size={25} />}
        />
      </header>
      <div className="px-2 pb-2 flex w-full">
        <Notifications />
      </div>
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-y-auto scrollbar-custom"
      >
        <Tabs
          color="primary"
          variant="bordered"
          className={`max-w-80 pb-4 items-center backdrop-blur-md justify-center fixed bottom-0 left-[calc(50%-106px)] rounded-lg z-50 transition-transform duration-300 ${hideTabs ? "translate-y-full" : "translate-y-0"}`}
          classNames={{
            tabWrapper:
              "w-full justify-center items-center scrollbar-custom flex-col pb-4",
            panel: "py-0",
          }}
          placement="bottom"
          size="md"
          disabledKeys={
            blockTabs ? [tabsKeys.aim, tabsKeys.expense, tabsKeys.income] : []
          }
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.icon}>
              {tab.component}
            </Tab>
          ))}
        </Tabs>
        <Button
          isIconOnly
          color="primary"
          variant="light"
          onPress={toggleTabs}
          className={`fixed bottom-[16px] left-[calc(100%-50px)] ${hideTabs ? "rotate-180 transition-transform" : "rotate-0 transition-transform"}`}
        >
          <MdKeyboardArrowDown />
        </Button>
      </div>
    </section>
  );
};
