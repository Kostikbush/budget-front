import { Notifications } from "@/types";
import { addToast } from "@heroui/react";
import { DefinedInitialDataOptions, QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

export const baseUrl =  process.env.NODE_ENV === 'development' && "http://192.168.1.116:5000/api";

interface ResponseType {
  message?: string;
  type: 'error' | 'success'
}

const colorToast = {
  error: "danger",
  success: "success",
};

export const useRevalidateQuery = () => {
  const queryClient = useQueryClient();

    return (keys: string | string[]) => {
      if (Array.isArray(keys)) {
        keys.map((key) => {
          queryClient.invalidateQueries({
            queryKey: [key],
          });
        })
      }else {
        queryClient.invalidateQueries({
          queryKey: [keys],
        });
      }
    };
}

export const isSuccessResponse = (
  data: ResponseType | { data: ResponseType }
): boolean => {
  if ("message" in data && "type" in data) {
    return data.type === 'success'
  }
  if ("data" in data && "type" in data.data) {
    return data.data.type === "success";
  }

  return false
};

const havErrorMessage = (data: ResponseType | { data: ResponseType }) => {
  if ("message" in data && "type" in data) {
    addToast({
      title: data.message,
      color: colorToast[data?.type as keyof typeof colorToast] as any,
    });
  }
  if ("data" in data && "message" in data.data && "type" in data.data) {
    addToast({
      title: data.data.message,
      color: colorToast[data?.data.type as keyof typeof colorToast] as any,
    });
  }
};


export interface BaseResponse<T> {
  data: T & ResponseType;
  notifications: Notifications;
}

enum HttpMethods {
  POST="POST",
  GET="GET",
  PUT="PUT",
  DELETE="DELETE",
  PATCH="PATCH"
}

export const endPoints = {
  register: { endPoint: "/auth/register", method: HttpMethods.POST },
  login: { endPoint: "/auth/login", method: HttpMethods.POST },
  refresh: { endPoint: "/auth/refresh", method: HttpMethods.POST },
  logout: { endPoint: "/auth/logout", method: HttpMethods.POST },
  users: { endPoint: "/users", method: HttpMethods.GET },
  notifications: { endPoint: "/notifications", method: HttpMethods.GET },
  budget: { endPoint: "/budget", method: HttpMethods.GET },
  acceptInvite: { endPoint: "/acceptInvite", method: HttpMethods.PUT },
  rejectInvite: { endPoint: "/rejectInvite", method: HttpMethods.PUT },
  createBudget: { endPoint: "/createBudget", method: HttpMethods.POST },
};

export default function useLazyQuery(
  options: DefinedInitialDataOptions<
    unknown,
    Error,
    unknown,
    readonly unknown[]
  >,
  queryClient?: QueryClient
) {
  const query = useQuery(options, queryClient);

  return [query.refetch, query];
}

export const getApi = async (url: keyof typeof endPoints, init: RequestInit = {}, queryParams: string='') => {
  const res = await fetch(
    `${baseUrl}${endPoints[url].endPoint}${queryParams ? "?" + queryParams : ""}`,
    {
      ...init,
      method: endPoints[url].method,
      headers: {
        ...(init?.headers || {}),
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);

    throw new Error(errorBody.message || "Unknown error");
  }

  const response = await res.json();

  havErrorMessage(response);
  
  return response;
};