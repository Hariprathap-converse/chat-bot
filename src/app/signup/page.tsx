"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavChatBot } from "@/Icons/global/home";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FormInput } from "@/components/ui/form-input";

const signupSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z
    .string()
    .regex(/^\+?\d{7,15}$/, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const { setOpen } = useSidebar();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    setOpen(false);
  }, []);

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    try {
      const { authService } = await import("@/services/auth");
      await authService.signup(data);
      toast.success("Account created successfully. Please log in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
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
                Create Account
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4 gap-2 w-full max-w-[450px]">
              <FormInput
                placeholder="First Name"
                {...register("first_name")}
                error={errors.first_name}
              />

              <FormInput
                placeholder="Last Name"
                {...register("last_name")}
                error={errors.last_name}
              />

              <FormInput
                placeholder="Email Address"
                {...register("email")}
                error={errors.email}
              />

              <FormInput
                placeholder="Phone Number"
                {...register("phone_number")}
                error={errors.phone_number}
              />

              <FormInput
                placeholder="Password"
                type="password"
                {...register("password")}
                error={errors.password}
              />

              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className={cn(
                  "w-full mt-5 capitalize text-base font-semibold h-[45px] hover:scale-[101%] bg-sidebar-accent active:translate-y-0.5 backdrop-blur-xl transition-all duration-200 flex items-center !rounded-[10px] border-[1px] border-[hsla(245,96%,70%,1)] bg-[linear-gradient(91.96deg,rgba(116,104,252,0.7)_-16.64%,rgba(116,104,252,0.8)_117.28%)] hover:text-white hover:bg-sidebar-accent cursor-pointer text-white shadow-[0px_2px_10px_0px_hsla(245,100%,90%,1)]",
                )}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
              <div className="text-sm text-sub-heading font-medium mt-4 flex gap-1">
                Already have an account?
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
