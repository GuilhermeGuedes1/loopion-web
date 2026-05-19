import { useState } from "react";
import { useNavigate } from "react-router";
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

export function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "loopinUser",
      JSON.stringify({
        name: name || "User Name",
        company: company || "Loopin Co.",
        email: email || "user@example.com",
      }),
    );
    navigate("/customers");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-accent-foreground" />
            </div>
            <h1 className="text-2xl">Loopin</h1>
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
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/70">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground/70">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/70">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-input border-border focus-visible:ring-accent"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button className="text-accent hover:text-accent/80 font-medium transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
