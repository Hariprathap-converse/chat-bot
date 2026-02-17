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

const changePasswordSchema = z
  .object({
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

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const { setOpen } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    setOpen(false);
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");
    if (emailParam && otpParam) {
      setEmail(emailParam);
      setOtp(otpParam);
    } else {
      toast.error(
        "Required information is missing. Please restart the process.",
      );
      router.push("/forgot-password");
    }
  }, [searchParams, setOpen, router]);

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setLoading(true);
    try {
      const { authService } = await import("@/services/auth");
      await authService.resetPassword(email, otp, data.newPassword);
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
      <div className="hidden lg:block h-full w-full pl-2">
        <img
          src="/backgroundImage.png"
          alt="Image"
          className="object-fit w-full h-[940px]"
        />
      </div>

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
                Set New Password
              </span>
              <p className="text-sm text-center text-muted-foreground px-8">
                Enter your new password below.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 gap-2 w-full max-w-[450px]">
              {/* New Password */}
              <div className="w-full space-y-1">
                <Input
                  {...register("newPassword")}
                  type="password"
                  placeholder="New Password"
                  className="p-0 h-[45px] rounded-[8px]! border-0 bg-white px-[21px] flex items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus:ring-offset-0 focus-visible:ring-offset-0 focus:placeholder:text-sub-title
                  shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm pt-1 px-2">
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
                  className="p-0 h-[45px] rounded-[8px]! border-0 bg-white px-[21px] flex items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus:ring-offset-0 focus-visible:ring-offset-0 focus:placeholder:text-sub-title
                  shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm pt-1 px-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className={cn(
                  "w-full mt-5 capitalize text-base font-semibold h-[45px] hover:scale-[101%] bg-sidebar-accent active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 flex items-center rounded-[10px]! border border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer text-white shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]",
                )}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>

              <div className="text-sm text-sub-heading font-medium mt-4 flex gap-1">
                Remember your password?
                <Link
                  href="/login"
                  className="text-dark-circle font-medium hover:scale-[103%]"
                >
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
