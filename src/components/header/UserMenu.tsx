import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FETCH_USER, useUser } from "@/queries/fetchUser";
import toast from "react-hot-toast";
import { LuUser, LuLogOut } from "react-icons/lu";
import api from "@/utils/api";

const UserMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/a/login");
    }
  }, [user, isLoading, navigate]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("users/logout");
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: [FETCH_USER] });
      navigate("/a/login");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <LuUser className="w-6 h-6" />
          <span>{user?.firstName}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex gap-4 items-center">
            <LuUser />
            <span>Profile</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500"
          onClick={() => logoutMutation.mutate()}
        >
          <div className="flex gap-4 items-center">
            <LuLogOut />
            <span>Log Out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
