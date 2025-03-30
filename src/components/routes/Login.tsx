import { useForm } from "react-hook-form";
import GuestLayout from "../layouts/GuestLayout";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const Login = () => {
  const [errorMsg, serErrorMsg] = useState("");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.log(error);

      if (error.response && error.response.data) {
        const message =
          (error.response.data as { message?: string }).message ||
          "An error occurred. Please try again.";
        serErrorMsg(message);
      } else {
        serErrorMsg("Network error. Please check your connection.");
      }
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  if (isPending) return <p>Loading ...</p>;

  return (
    <GuestLayout>
      <Card>
        <CardHeader>
          <CardTitle>Please Log in</CardTitle>
          <CardDescription className="invisible">Log in card</CardDescription>
        </CardHeader>
        <CardContent className="min-w-[400px]">
          <ErrorMessage message={errorMsg} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="cursor-pointer w-full">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <div className="my-3">
            <Link to={`/a/register`}>New user? Register</Link>
          </div>
        </CardContent>
      </Card>
    </GuestLayout>
  );
};

export default Login;
