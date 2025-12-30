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
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
    const { setOpen } = useSidebar();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    useEffect(() => {
        setOpen(false);
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams, setOpen]);

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setLoading(true);
        try {
            const { authService } = await import("@/services/auth");
            await authService.resetPassword(email, data.otp, data.newPassword);
            toast.success("Password reset successfully. Please login with your new password.");
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
                                <span className="bg-[linear-gradient(180deg,#7468FC_0%,#FF8FD9_100%)] bg-clip-text text-transparent font-semibold text-[27px] ">
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
                        <div className="flex flex-col items-center space-y-4 gap-2 w-full max-w-[450px]">

                            <div className="w-full space-y-1">
                                <div className="grid gap-2 w-full relative">
                                    <span className="absolute top-[29%] left-3">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                        >
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" fill="#8692A6" />
                                        </svg>
                                    </span>
                                    <Input
                                        {...register("otp")}
                                        className="p-0 h-[45px] rounded-[12px]! border-0 bg-white px-[21px] flex pl-11 items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus-visible:ring-offset-0 focus:placeholder:text-sub-title
                  shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!"
                                        placeholder="Enter OTP"
                                    />
                                </div>
                                {errors.otp && (
                                    <p className="text-red-500 text-xs px-2">{errors.otp.message}</p>
                                )}
                            </div>

                            <div className="w-full space-y-1">
                                <div className="grid gap-2 w-full relative">
                                    <span className="absolute top-[29%] left-3">
                                        <svg
                                            width="14"
                                            height="17"
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                d="M10.3442 6.02925V4.33703C10.3442 2.35634 8.73793 0.750035 6.75724 0.750035C4.77655 0.741365 3.16394 2.33979 3.15527 4.32127V4.33703V6.02925"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.76123 15.3314H3.73877C2.08833 15.3314 0.75 13.9938 0.75 12.3426V8.9621C0.75 7.31086 2.08833 5.97333 3.73877 5.97333H9.76123C11.4117 5.97333 12.75 7.31086 12.75 8.9621V12.3426C12.75 13.9938 11.4117 15.3314 9.76123 15.3314Z"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M6.75029 9.77695V11.5275"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <Input
                                        {...register("newPassword")}
                                        className="p-0 h-[45px] rounded-[12px]! border-0 bg-white px-[21px] flex pl-11 items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus-visible:ring-offset-0 focus:placeholder:text-sub-title
                  shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!"
                                        placeholder="New Password"
                                        type="password"
                                    />
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-xs px-2">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="w-full space-y-1">
                                <div className="grid gap-2 w-full relative">
                                    <span className="absolute top-[29%] left-3">
                                        <svg
                                            width="14"
                                            height="17"
                                            viewBox="0 0 14 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                d="M10.3442 6.02925V4.33703C10.3442 2.35634 8.73793 0.750035 6.75724 0.750035C4.77655 0.741365 3.16394 2.33979 3.15527 4.32127V4.33703V6.02925"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.76123 15.3314H3.73877C2.08833 15.3314 0.75 13.9938 0.75 12.3426V8.9621C0.75 7.31086 2.08833 5.97333 3.73877 5.97333H9.76123C11.4117 5.97333 12.75 7.31086 12.75 8.9621V12.3426C12.75 13.9938 11.4117 15.3314 9.76123 15.3314Z"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M6.75029 9.77695V11.5275"
                                                stroke="#8692A6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <Input
                                        {...register("confirmPassword")}
                                        className="p-0 h-[45px] rounded-[12px]! border-0 bg-white px-[21px] flex pl-11 items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal text-sm! text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus-visible:ring-offset-0 focus:placeholder:text-sub-title
                  shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]!"
                                        placeholder="Confirm Password"
                                        type="password"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs px-2">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <Button
                                onClick={handleSubmit(onSubmit)}
                                disabled={loading}
                                className={cn(
                                    "w-full mt-5 capitalize text-base font-semibold h-[45px] hover:scale-[101%] bg-sidebar-accent active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 flex items-center rounded-[10px]! border border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer text-white shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]"
                                )}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                            <div className="text-sm text-sub-heading font-medium mt-4 flex gap-1">
                                Remember your password?
                                <Link
                                    href={"/login"}
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
