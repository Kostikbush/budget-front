import { endPoints, getApi } from "@/app/api"
import { useRootStore } from "@/app/rootStore";
import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"

export const History = () => {
  const nextDate = useRef<string | null>(null);
  const {user} = useRootStore()
  const { data } = useQuery({
    queryKey: [endPoints.history.endPoint, nextDate],
    queryFn: () => getApi("history", {}, `budgetId=${user?.budget}`),
  });

  console.log(data)

  return <></>
} 