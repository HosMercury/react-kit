import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const FETCH_USER = "FETCH_USER";

export type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  createdAt: string;
};

const fetchUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data as User;
};

export const useUser = () =>
  useQuery<User>({
    queryKey: [FETCH_USER],
    queryFn: fetchUser,
    retry: false,
  });
