"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    otp: z.string().min(1, { message: "OTP is required" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { setOpen } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    setOpen(false);
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams, setOpen]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      const { authService } = await import("@/services/auth");
      await authService.resetPassword(email, data.otp, data.newPassword);
      toast.success(
        "Password reset successfully. Please login with your new password.",
      );
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid bg-white items-center grid-cols-1 lg:grid-cols-2 w-full">
      {/* Left Image */}
      <div className="hidden lg:block h-full w-full pl-2">
        <img
          src="/backgroundImage.png"
          alt="Image"
          className="object-fit w-full h-[940px]"
        />
      </div>

      {/* Form */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-[590px] h-auto py-10 backdrop-blur-2xl bg-white rounded-[55px] border-0 shadow-none ring-3 px-6 sm:px-10 ring-white">
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-5">
              <span className="pl-1 flex gap-2 items-center justify-center transition-all duration-300">
                <NavChatBot className={"h-10 w-10"} />
                <span className="bg-[linear-gradient(180deg,#7468FC_0%,#FF8FD9_100%)] bg-clip-text text-transparent font-semibold text-[27px]">
                  OpsBot
                </span>
              </span>
              <span className="text-sub-heading font-semibold text-[25px] leading-[150%] tracking-normal">
                Reset Password
              </span>
              <p className="text-sm text-center text-muted-foreground px-8">
                Enter your OTP and new password below.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {/* Form Fields */}
            <div className="flex flex-col items-center space-y-4 gap-2 w-full max-w-[450px]">
              {/* OTP */}
              <div className="w-full space-y-1">
                <Input
                  {...register("otp")}
                  placeholder="Enter OTP"
                  className="p-2"
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs">{errors.otp.message}</p>
                )}
              </div>

              {/* New Password */}
              <div className="w-full space-y-1">
                <Input
                  {...register("newPassword")}
                  type="password"
                  placeholder="New Password"
                  className="p-2"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full space-y-1">
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className="p-2"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-sm text-sub-heading font-medium mt-4 flex gap-1">
                Remember your password?
                <Link href="/login" className="text-dark-circle font-medium">
                  Log In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
