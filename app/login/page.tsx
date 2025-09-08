"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/Toast";

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Infer the TypeScript type from the Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

// --- Reusable Components (within this file) ---

interface InputFieldProps {
  id: string;
  type: "email" | "password";
  placeholder: string;
  register: any; // from react-hook-form
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  register,
  icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={
          isPasswordField ? (isPasswordVisible ? "text" : "password") : type
        }
        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-200 hover:border-gray-300"
        placeholder={placeholder}
        {...register}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

// --- Main Login Page Component ---

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Show validation errors as toast notifications
  useEffect(() => {
    if (errors.email) {
      addToast(errors.email.message || "Invalid email", "error", 3000);
    }
    if (errors.password) {
      addToast(
        errors.password.message || "Password is required",
        "error",
        3000
      );
    }
  }, [errors, addToast]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/auth/login",
        data
      );
      console.log("Login successful:", response.data);

      // Check for both 'token' and 'access_token' from backend
      const authToken = response.data.token || response.data.access_token;

      if (authToken) {
        // Store auth token and user data
        localStorage.setItem("authToken", authToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user || { email: data.email })
        );

        addToast("Login successful! Redirecting...", "success", 2000);

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        addToast("Login failed. No token received.", "error");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid email or password. Please check your credentials.";

      addToast(errorMessage, "error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Zafra
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Please enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              id="email"
              type="email"
              placeholder="Email Address"
              register={register("email")}
              icon={<Mail size={20} />}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              register={register("password")}
              icon={<Lock size={20} />}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 flex items-center justify-center transform hover:scale-[1.02]"
            >
              {isSubmitting && (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
              )}
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/admin/register"
                className="font-semibold text-purple-600 hover:text-purple-800"
              >
                Sign up now
              </Link>
            </p>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
