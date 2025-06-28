import { endPoints, getApi } from "@/app/api";
import { useRootStore } from "@/app/rootStore";
import { BudgetTypeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useBudget = () => {
  const { user } = useRootStore();

  const { data: budgetResponse, isFetching: isFetchingBudget } =
    useQuery<BudgetTypeResponse>({
      queryKey: [endPoints.budget.endPoint],
      queryFn: () => getApi("budget", {}, `userId=${user?._id}`),
    });

  return { budget: budgetResponse?.data?.budget, isFetchingBudget, user };
};
