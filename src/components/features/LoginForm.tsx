"use client";

import { useState, type FunctionComponent } from "react";
import { Button } from "@ssms/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ssms/components/ui/Card";
import { Input } from "@ssms/components/ui/Input";
import { Checkbox } from "@ssms/components/ui/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@ssms/validations/LoginSchema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/Form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAppwrite } from "./AppwriteProvider";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Models } from "appwrite";

export const LoginForm: FunctionComponent = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  const appwrite = useAppwrite();

  const router = useRouter();

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["login_user"],
    mutationFn: async (credentials: z.infer<typeof LoginSchema>) => {
      const session = await appwrite.createEmailPasswordSession(credentials.email, credentials.password);
      const loggedInUser = await appwrite.get();
      setUser(loggedInUser);
      return session;
    },

    // handle success event
    onSuccess: () => {
      if (user) {
        router.push("/dashboard");
      }
    },

    // handle error event
    onError: (err) => {
      loginForm.resetField("password");
      loginForm.setFocus("password");
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    mutate(values);
  };

  if (!user) {
    return (
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="flex h-screen w-full items-center justify-center px-4"
        >
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-7">
                {/** Email field */}
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormDescription>Your active email address</FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid gap-2">
                  {/** Password field */}
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Link href="#" tabIndex={-1} className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input id="password" type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormDescription>At least 8 characters</FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center space-x-2  mb-4">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me logged in
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }

  redirect("/dashboard");
};
