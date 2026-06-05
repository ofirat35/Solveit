import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { AuthStorage } from "../helpers/Auth/auth-storage";
import { JWTUtils } from "../helpers/Auth/jwt-utils";
import { keycloakService } from "../helpers/Auth/keycloak";

// 1. Base URL Resolution (Kept intact)
const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_API_BASE_URL
      : "http://localhost:5000";
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: `${getBaseUrl()}/api`,
  timeout: 20 * 1000,
});

let refreshPromise: Promise<string | null> | null = null;

async function getValidToken(): Promise<string | null> {
  const token = AuthStorage.getAccessToken();

  if (token && !JWTUtils.isTokenExpired(token)) {
    return token;
  }

  if (!refreshPromise) {
    refreshPromise = keycloakService
      .refreshAccessToken()
      .then((tokens) => tokens?.accessToken ?? null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // authEvents.emit("unauthorized");
    }
    return Promise.reject(error);
  },
);

function logApiError(
  error: unknown,
  endpoint: string,
  silent: boolean = false,
): void {
  if (silent) return;
  if (axios.isAxiosError(error)) {
    const serverErrors = error.response?.data?.errors;
    console.error(
      `[API Error] ${endpoint} | Status: ${error.response?.status}`,
    );

    if (
      serverErrors &&
      Array.isArray(serverErrors) &&
      serverErrors.length > 0
    ) {
      console.error(`[Details]:`, serverErrors[0]);
    } else {
      console.error(`[Message]:`, error.message);
    }
  } else {
    console.error(`[Critical Non-Axios Error]:`, error);
  }
}

async function executeRequest<T>(
  config: AxiosRequestConfig,
  shouldThrow: boolean,
): Promise<T | null> {
  try {
    const response: AxiosResponse<T> = await axiosInstance.request<T>(config);
    return response.data;
  } catch (error) {
    logApiError(error, config.url ?? "Unknown", !shouldThrow);
    if (shouldThrow) throw error;
    return null;
  }
}

export const api = {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig & { shouldThrow?: boolean },
  ): Promise<T | null> =>
    executeRequest<T>(
      { url, method: "GET", ...config },
      config?.shouldThrow ?? true,
    ),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & { shouldThrow?: boolean },
  ): Promise<T | null> =>
    executeRequest<T>(
      { url, method: "POST", data, ...config },
      config?.shouldThrow ?? true,
    ),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & { shouldThrow?: boolean },
  ): Promise<T | null> =>
    executeRequest<T>(
      { url, method: "PUT", data, ...config },
      config?.shouldThrow ?? true,
    ),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig & { shouldThrow?: boolean },
  ): Promise<T | null> =>
    executeRequest<T>(
      { url, method: "DELETE", ...config },
      config?.shouldThrow ?? true,
    ),
};
