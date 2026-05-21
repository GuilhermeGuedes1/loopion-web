import type { RegisterOptions } from "react-hook-form";
import type { LoginData } from "../types/auth";

export const loginFormValidation: Record<
  keyof LoginData,
  RegisterOptions<LoginData>
> = {
  email: {
    required: "Email is required.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address.",
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long.",
    },
  },
};
