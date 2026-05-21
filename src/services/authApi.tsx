import type { LoginData, LoginResponse, MeResponse } from "../types/auth";
import { api } from "./axios";
import { getToken } from "../utils/storage";

export async function signIn(data: LoginData): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
}

export async function me(): Promise<MeResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("Token not found. User might not be authenticated.");
  }

  try {
    const response = await api.get<MeResponse>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Me error:", error);
    throw error;
  }
}
