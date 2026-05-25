import axios from "axios";
import { Platform } from "react-native";
import { AuthStorage } from "../helpers/Auth/auth-storage";
import { JWTUtils } from "../helpers/Auth/jwt-utils";
import { keycloakService } from "../helpers/Auth/keycloak";
// import { authEvents } from "../helpers/events/authEvents";

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_API_BASE_URL
      : "http://localhost:5000";
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL;
};

const api = axios.create({
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

api.interceptors.request.use(
  async (config) => {
    const token = await getValidToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // authEvents.emit("unauthorized");
    }
    return Promise.reject(error);
  },
);

export { api };
