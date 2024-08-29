"use client";
import { useHandleCredentials } from "./hooks/useHandleCredentials";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";

export default function LogIn() {
  const {
    loading,
    failed,
    // emailError,
    email,
    handleEmailChange,
    setPassword,
    password,
    handlePasswordLogin,
    // checked,
    // handleCheckboxChange
  } = useHandleCredentials();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input
              onChange={(e) => setPassword(e.target.value.trim())}
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            id="login-btn"
            type="submit"
            onClick={handlePasswordLogin}
            className="w-full"
          >
            {loading ? (
              <SymbolIcon className="animate-spin rounded-full mr-2"></SymbolIcon>
            ) : (
              ""
            )}
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
