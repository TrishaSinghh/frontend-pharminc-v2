"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope } from "lucide-react";
import { SidePanel } from "@/components/auth/SidePanel";
import { SocialAuthButtons } from "@/components/auth/SocialButtons";
import { BackButton } from "@/components/auth/BackButton";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, createUser, setAuthToken, register, getUser } from "@/lib/api";

export default function DoctorAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");

  const router = useRouter();

  const createAccount = async () => {
    try {
      await register({
        email: email,
        password: password,
        type: "user",
      });

      const { token } = await login({
        email: email,
        password: password,
        type: "user",
      });
      setAuthToken(token);

      const { id } = await createUser({
        name: `${firstName} ${lastName}`,
        location: location,
        role: "doctor",
      });

      router.push(`/profile/${id}`);
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
      const { id } = await getUser();
      router.push(`/profile/${id}`);
    } catch (error) {
      console.error("API Error:", error);
      alert("Login failed. Please try again.");
      return;
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
                <Stethoscope className="h-5 w-5 text-[#3B82F6]" />
                <span className="text-sm text-gray-600">
                  Doctor Registration
                </span>
              </div>
            </div>

            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Dr. Anil"
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Kumar"
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.org"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, Country"
                    required
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
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
              </form>
            </TabsContent>

            <TabsContent value="login">
              <section className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.org"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
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
              </section>
            </TabsContent>
          </Tabs>

          <SocialAuthButtons />
        </div>
      </div>

      <SidePanel />
    </div>
  );
}
