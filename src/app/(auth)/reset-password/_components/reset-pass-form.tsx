"use client";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useResetPasswordAction } from "../_hooks/useResetPasswordAction";
import { resetPasswordSchema, ResetPasswordValues } from "@/lib/schemas/auth";

export default function ResetPasswordPage() {
  // Hooks
  const { mutate, isPending, error } = useResetPasswordAction();

  // Form & Validation
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  // Functions
  const onSubmit = (values: ResetPasswordValues) => {
    mutate(values);
  };

  // Return JSX
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-card rounded-2xl shadow-sm border-none">
        {/* Header */}
        <CardHeader>
          {/* Card title */}
          <CardTitle className="text-3xl font-semibold text-zinc-800">
            Create a New Password
          </CardTitle>
          {/* Instruction text */}
          <p className="mt-1 text-sm text-zinc-800">
            Enter and confirm your new password below.
          </p>
        </CardHeader>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        className="h-11 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm New Password Field */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter your password"
                        className="h-11 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Footer: Submit Button + Error */}
            <CardFooter className="flex flex-col gap-3">
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white font-medium transition"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
