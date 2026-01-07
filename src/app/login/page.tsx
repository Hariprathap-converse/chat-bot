"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NavChatBot } from "@/Icons/global/home";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { setOpen } = useSidebar();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setOpen(false);
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { authService } = await import("@/services/auth");
      const Cookies = (await import("js-cookie")).default;
      const response = await authService.login(data.email, data.password);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      Cookies.set("token", response.access_token, { expires: 7 }); 
      toast.success("Logged in successfully");
      router.push("/chat");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid bg-white items-center grid-cols-1 lg:grid-cols-2 w-full ">
      <div className="hidden lg:block h-full w-full pl-2">
        <img
          src="/backgroundImage.png"
          alt="Image"
          className="object-fit w-full h-[940px] "
        />
      </div>
      <div className="w-full h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-[590px] h-auto py-10 backdrop-blur-[40px] bg-white rounded-[55px] border-0 shadow-none ring-3 px-6 sm:px-10 ring-white">
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-5">
              <span className="pl-1 flex gap-2 items-center justify-center transition-all duration-300">
                <NavChatBot className={"h-10 w-10"} />
                <span className="bg-[linear-gradient(180deg,#7468FC_0%,#FF8FD9_100%)] bg-clip-text text-transparent font-semibold text-[27px] ">
                  OpsBot
                </span>
              </span>
              <span className="text-sub-heading font-semibold text-[25px] leading-[150%] tracking-normal">
                Welcome Back!
              </span>
            </div>
          </CardHeader>
          <CardContent className=" flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-4 gap-2 w-full max-w-[450px]"
            >
              <div className="w-full space-y-1">
                <div className="grid gap-2  w-full relative ">
                  <span className="absolute top-[29%] left-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M11.935 5.90076L8.97279 8.30945C8.41313 8.75345 7.62571 8.75345 7.06605 8.30945L4.07886 5.90076"
                        stroke="#8692A6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.2725 14C13.3001 14.0056 14.6666 12.3397 14.6666 10.2922V5.71334C14.6666 3.66588 13.3001 2 11.2725 2H4.72734C2.69978 2 1.33325 3.66588 1.33325 5.71334V10.2922C1.33325 12.3397 2.69978 14.0056 4.72734 14H11.2725Z"
                        stroke="#8692A6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <Input
                    {...register("email")}
                    className=" p-0 h-[45px] !rounded-[12px] border-0 bg-white px-[21px] flex pl-11 items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal !text-sm text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground focus:ring-offset-0    focus-visible:ring-offset-0  focus:placeholder:text-sub-title
                  !shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]"
                    placeholder="Enter your email "
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm pt-1 px-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1">
                <div className="grid gap-2  w-full relative ">
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
                    {...register("password")}
                    className=" p-0 h-[45px] !rounded-[12px] border-0 bg-white px-[21px] flex pl-11 items-center
                placeholder:font-normal placeholder:text-sm placeholder:text-foreground
                leading-[150%] tracking-normal font-normal !text-sm text-heading outline-none
                focus:ring-1 focus:ring-accent-foreground focus-visible:ring-1 focus-visible:ring-accent-foreground  focus-visible:ring-offset-0  focus:placeholder:text-sub-title
                  !shadow-[1px_1px_4px_1px_hsla(245,96%,70%,0.2)]"
                    placeholder="Enter your password"
                    type="password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm pt-1 px-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex w-full items-center justify-between pl-2">
                <div className=" group flex items-center gap-2 ">
                  <Checkbox
                    id="reminder"
                    className="cursor-pointer border-0 ring-1  ring-accent group-hover:scale-105"
                  />
                  <Label
                    htmlFor="reminder"
                    className="text-sub-heading cursor-pointer group-hover:scale-[101%] transition-all duration-100"
                  >
                    Remember me
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={"/forgot-password"}>
                    <Label className="text-dark-circle hover:scale-[101%] cursor-pointer ">
                      Forgot password ?
                    </Label>
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  " w-full mt-5 capitalize text-base font-semibold h-[45px]  hover:scale-[101%]  bg-sidebar-accent  active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 flex items-center !rounded-[10px]  border-[1px] border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer  text-white   shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]",
                )}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
              <div className="text-sm text-sub-heading font-medium mt-4 flex gap-1">
                Don't have an account ?
                <Link
                  href={"/signup"}
                  className="text-dark-circle font-medium  hover:scale-[103%]"
                >
                  Register
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
