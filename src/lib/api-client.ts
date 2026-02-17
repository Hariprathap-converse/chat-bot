import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { requiresAuth = true, ...fetchOptions } = options;

  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401 && requiresAuth) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("Session expired. Please login again.");
      }

      try {
        // Attempt to refresh token
        // Assuming the refresh endpoint expects the refresh token in the header as Bearer
        // or as a query param or body. Standard is often authorization header or body.
        // I will try with Authorization header first as it's common for "refresh" endpoints too
        // or just a post request.
        // Let's assume standard Bearer for now as per "set the new access token".
        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!refreshRes.ok) {
          throw new Error("Refresh failed");
        }

        const refreshData = await refreshRes.json();

        // Assuming refreshData returns { access_token: "..." } or similar structure to login
        // I'll assume it returns the new access token in the data or main body.
        // Let's assume the standard { access_token, ... }

        const newAccessToken =
          refreshData.access_token || refreshData.data?.access_token;
        const newRefreshToken =
          refreshData.refresh_token || refreshData.data?.refresh_token;

        if (newAccessToken) {
          setTokens(newAccessToken, newRefreshToken || refreshToken); // Keep old refresh token if not allowed to rotate

          // Retry original request
          headers["Authorization"] = `Bearer ${newAccessToken}`;
          const retryResponse = await fetch(url, {
            ...fetchOptions,
            headers,
          });

          // Handle retry response
          const retryResult = await retryResponse.json();
          if (!retryResponse.ok) {
            throw new Error(
              retryResult.message || "Request failed after refresh path",
            );
          }
          return retryResult;
        } else {
          throw new Error("No access token returned from refresh");
        }
      } catch (refreshError) {
        // If refresh fails, log out
        clearTokens();
        // Optional: Redirect to login
        if (typeof window !== "undefined") {
          // window.location.href = "/login"; // Uncomment if redirect is desired immediately
          // Or just throw to let the caller handle it
          toast.error("Session expired. Please login again.");
        }
        throw new Error("Session expired");
      }
    }

    const data = await response.json();

    if (!response.ok) {
      // Check if it's a known API error format
      throw new Error(data.message || `Error ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error("API Call Error:", error);
    throw error;
  }
}
