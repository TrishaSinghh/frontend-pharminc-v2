"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/SocialButtons";
import { SidePanel } from "@/components/auth/SidePanel";
import { BackButton } from "@/components/auth/BackButton";
import { useState } from "react";
import {
  login,
  createInstitution,
  setAuthToken,
  register,
  getInstitution,
} from "@/lib/api";
import { useRouter } from "next/navigation";

export default function InstitutionAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("hospital"); // Default type

  const router = useRouter();

  const createAccount = async () => {
    try {
      // 1. Register
      await register({
        email: email,
        password: password,
        type: "institution",
      });

      // 2. Login to get token
      const { token } = await login({
        email: email,
        password: password,
        type: "institution",
      });
      setAuthToken(token);

      // 3. Create institution profile
      const { id } = await createInstitution({
        name: name,
        location: location,
        type: type,
      });

      router.push(`/institute/${id}`);
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
        type: "institution",
      });

      const { id } = await getInstitution();
      setAuthToken(token);
      router.push(`/institute/${id}`);
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
                <Building className="h-5 w-5 text-[#3B82F6]" />
                <span className="text-sm text-gray-600">
                  Institution Registration
                </span>
              </div>
            </div>

            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Institution Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. ABC Hospital"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@institution.org"
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
                <div className="space-y-2">
                  <Label htmlFor="type">Institution Type</Label>
                  <select
                    id="type"
                    name="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="research">Research Center</option>
                  </select>
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
                    placeholder="admin@institution.org"
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
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/institution?tab=signup"
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
