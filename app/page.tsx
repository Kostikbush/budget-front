"use client";

import { Spinner } from "@heroui/react";

import { useInit } from "./useInit";
import { BudgetMain } from "@/widgets/main/budgetMain";

export default function Home() {
  const { loading, user } = useInit();

  if (loading) {
    <section className="flex flex-col items-center justify-center w-screen">
      <Spinner size="lg" color="primary" />
    </section>;
  }

  if (!user) {
    return null;
  }

  return <BudgetMain />;
}
