import { LuUser } from "react-icons/lu";
import { useUser } from "../../queries/fetchUser";

const User = () => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load user data</p>;
  }

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <LuUser className="w-6 h-6" />
      <span>{user?.firstName}</span>
    </div>
  );
};

export default User;
