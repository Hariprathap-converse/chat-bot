import { z } from "zod";

const API_URL = "http://localhost:8000";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

interface UserCreate {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
}

interface UserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

export const authService = {
    async login(username: string, password: string): Promise<AuthResponse> {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData,
            });

            const result: ApiResponse<AuthResponse> = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Login failed");
            }

            if (!result.data) {
                throw new Error("No data received from server");
            }

            return result.data;
        } catch (error: any) {
            throw new Error(error.message || "Login failed");
        }
    },

    async forgotPassword(email: string): Promise<string> {
        try {
            const response = await fetch(
                `${API_URL}/auth/forgot-password?email=${encodeURIComponent(email)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result: ApiResponse<null> = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Failed to send reset link");
            }

            return result.message;
        } catch (error: any) {
            throw new Error(error.message || "Failed to send reset link");
        }
    },

    async resetPassword(
        email: string,
        otp: string,
        newPassword: string
    ): Promise<string> {
        try {
            const response = await fetch(
                `${API_URL}/auth/reset-password?email=${encodeURIComponent(
                    email
                )}&otp=${encodeURIComponent(otp)}&new_password=${encodeURIComponent(
                    newPassword
                )}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result: ApiResponse<null> = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Failed to reset password");
            }

            return result.message;
        } catch (error: any) {
            throw new Error(error.message || "Failed to reset password");
        }
    },

    async signup(payload: UserCreate): Promise<UserResponse> {
        try {
            const response = await fetch(`${API_URL}/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result: ApiResponse<UserResponse> = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Signup failed");
            }

            if (!result.data) {
                throw new Error("No data received from server");
            }

            return result.data;
        } catch (error: any) {
            throw new Error(error.message || "Signup failed");
        }
    },
};
