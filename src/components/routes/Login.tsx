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
import ErrorMessages from "../common/ErrorMessages";
import { serverErr } from "../../utils/error";

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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
      let messages = serverErr(error);
      setErrorMessages(messages);
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return (
    <GuestLayout>
      <Card>
        <CardHeader>
          <CardTitle>Please Log in</CardTitle>
          <CardDescription>Log in to continue</CardDescription>
        </CardHeader>
        <CardContent className="min-w-[400px]">
          <ErrorMessages errors={errorMessages} />
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
              <div className="flex justify-end ">
                <Button
                  type="submit"
                  className="cursor-pointer w-full"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Submit"}
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
