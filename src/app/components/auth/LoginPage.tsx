import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormError } from "../ui/FormError";

import { loginFormValidation } from "../../../validations/auth";
import type { LoginData } from "../../../types/auth";
import { useForm } from "react-hook-form";
import { signIn, loginDemo } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";
import { useState } from "react";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginData) => {
    try {
      setLoginError("");
      setIsSubmitting(true);

      const response = await signIn(data);

      await login(response.access_token);

      navigate("/customers");
    } catch (error) {
      console.error("Login error:", error);

      setLoginError("E-mail or password is invalid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoginError("");
      setIsSubmitting(true);

      const response = await loginDemo();

      await login(response.accessToken);

      navigate("/customers");
    } catch (error) {
      console.error("Demo login error:", error);

      setLoginError("Unable to start demo mode.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-accent-foreground" />
            </div>
            <h1 className="text-2xl text-white">Loopin</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Automated customer retention platform
          </p>
        </div>

        <Card className="border-border backdrop-blur-xl bg-card/50">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription className="text-sm">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/70">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email", loginFormValidation.email)}
                />
                <FormError
                  id="email-error"
                  message={errors.email?.message?.toString()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/70">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  {...register("password", loginFormValidation.password)}
                />
                <FormError
                  id="password-error"
                  message={errors.password?.message?.toString()}
                />
              </div>
              <FormError id="login-error" message={loginError} />
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer">
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={handleDemoLogin}
                  className="w-full h-11 cursor-pointer hover:text-white">
                  Test demo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
