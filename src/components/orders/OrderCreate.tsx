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
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import ErrorMessages from "../common/ErrorMessages";
import { serverErr } from "../../utils/error";
import MainLayout from "../layouts/MainLayout";

const orderSchema = z.object({
  modelName: z.string().min(2, { message: "Model Name is required" }),
  partNumber: z.string().min(2, { message: "Part Number is required" }),
});

const createOrder = async ({
  modelName,
  partNumber,
}: {
  modelName: string;
  partNumber: string;
}) => {
  const response = await api.post("/orders", { modelName, partNumber });
  return response.data;
};

const OrderCreate = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      modelName: "",
      partNumber: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert("Order Created Successfully!");
    },
    onError: (error: AxiosError) => {
      let messages = serverErr(error);
      setErrorMessages(messages);
    },
  });

  function onSubmit(values: z.infer<typeof orderSchema>) {
    mutate(values);
  }

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Create Order</CardTitle>
          <CardDescription>
            Fill in the details to create an order
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-[400px]">
          <ErrorMessages errors={errorMessages} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="modelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Model Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Part Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Submitting..." : "Create Order"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OrderCreate;
