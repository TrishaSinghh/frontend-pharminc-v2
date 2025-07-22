"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { SidePanel } from "@/components/auth/SidePanel";
import { SocialAuthButtons } from "@/components/auth/SocialButtons";
import { BackButton } from "@/components/auth/BackButton";

import { useState } from "react";
import { login, createUser, setAuthToken, register } from "@/lib/api";

export default function HealthcareAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const createAccount = async () => {
    try {
      // 1. Register
      await register({
        email: email,
        password: password,
        type: "user", // Kept as "user" as requested
      });

      // 2. Login to get token
      const { token } = await login({
        email: email,
        password: password,
        type: "user",
      });
      setAuthToken(token);

      // 3. Create user profile with healthcare professional details
      await createUser({
        name: `${firstName} ${lastName}`,
        location: location,
        role: "healthcare", // You might want to use this field to distinguish
      });

      alert("Healthcare professional account created successfully!");
      // Redirect or show success message
    } catch (error) {
      console.error("API Error:", error);
      alert("Account creation failed. Please try again.");
    }
  };

  const loginUser = async () => {
    try {
      const { token } = await login({
        email: email,
        password: password,
        type: "user",
      });
      setAuthToken(token);
      alert("Login successful!");
      // Redirect to dashboard or home page
    } catch (error) {
      console.error("API Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex">
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <img
                src="/logo.png"
                alt="PharmInc Logo"
                className="h-12 w-auto rounded-md"
              />
            </Link>
          </div>

          <Tabs defaultValue="signup" className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <BackButton />
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#3B82F6]" />
                <span className="text-sm text-gray-600">
                  Healthcare Professional Registration
                </span>
              </div>
            </div>

            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="professional@healthcare.org"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, Country"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#3B82F6] hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-[#3B82F6] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <Button
                  type="button"
                  className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90"
                  onClick={createAccount}
                >
                  Create Account
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="professional@healthcare.org"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#3B82F6] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button
                  type="button"
                  className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90"
                  onClick={loginUser}
                >
                  Log In
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/healthcare?tab=signup"
                      className="text-[#3B82F6] hover:underline"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <SocialAuthButtons />
        </div>
      </div>

      <SidePanel />
    </div>
  );
}
