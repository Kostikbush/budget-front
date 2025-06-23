"use client";

import { useEffect, useState } from "react";
import { User, useRootStore } from "./rootStore";
import { useRouter } from "next/navigation";
import { addUser, getUser } from "./indexDb";

export const useInit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useRootStore();

  useEffect(() => {
      getUser().then((userInIndexDb) => {
        if (!user && !userInIndexDb?._id) {
          router.push("/enter");
        }
        if (!user && userInIndexDb?._id) {
          setUser(userInIndexDb as User);
        }

        if (user && !userInIndexDb?._id) {
          addUser(user);
        }

        if (!user?.budget && userInIndexDb?.budget && user) {
          setUser({
            ...user,
            budget: userInIndexDb?.budget,
          });
        }
        
        setLoading(false);
      });
  }, [user]);

  return { loading, user };
};
