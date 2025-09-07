"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { useToast } from "@/components/Toast";

// Zod schema for registration validation with password confirmation
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .regex(/^[a-zA-Z\s'-]+$/, "Name must contain only letters and spaces"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum(["admin", "user", "manager"], {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

// Infer the TypeScript type from the Zod schema
type RegisterFormValues = z.infer<typeof registerSchema>;

// --- Reusable Components (within this file) ---

interface InputFieldProps {
  id: string;
  type: "text" | "email" | "password";
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

interface RoleSelectProps {
  id: string;
  register: any;
  icon: React.ReactNode;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ id, register, icon }) => {
  const roles = [
    { value: "user", label: "User", description: "Regular customer access" },
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access",
    },
    {
      value: "manager",
      label: "Manager",
      description: "Product & order management",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <select
        id={id}
        {...register}
        className="w-full pl-12 pr-10 py-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-200 hover:border-gray-300 appearance-none cursor-pointer"
      >
        <option value="" disabled>
          Select your role
        </option>
        {roles.map((role) => (
          <option key={role.value} value={role.value}>
            {role.label} - {role.description}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

// --- Main Registration Page Component ---

export default function RegisterPage() {
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  // Show validation errors as toast notifications
  useEffect(() => {
    if (errors.name) {
      addToast(errors.name.message || "Invalid name", "error", 3000);
    }
    if (errors.email) {
      addToast(errors.email.message || "Invalid email", "error", 3000);
    }
    if (errors.password) {
      addToast(errors.password.message || "Invalid password", "error", 4000);
    }
    if (errors.confirmPassword) {
      addToast(
        errors.confirmPassword.message || "Passwords do not match",
        "error",
        3000
      );
    }
    if (errors.role) {
      addToast(errors.role.message || "Please select a role", "error", 3000);
    }
  }, [errors, addToast]);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const { confirmPassword, ...payload } = data; // Exclude confirmPassword from the payload

      const response = await axios.post(
        "http://localhost:8000/admin/auth/register",
        payload
      );
      console.log("Registration successful:", response.data);
      addToast("Registration successful! Please log in.", "success");
      reset();
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";
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
              Create an Account
            </h1>
            <p className="text-gray-600">
              Join us and start your fragrance journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              id="name"
              type="text"
              placeholder="Full Name"
              register={register("name")}
              icon={<User size={20} />}
            />
            <InputField
              id="email"
              type="email"
              placeholder="Email Address"
              register={register("email")}
              icon={<Mail size={20} />}
            />
            <RoleSelect
              id="role"
              register={register("role")}
              icon={<UserCheck size={20} />}
            />
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              register={register("password")}
              icon={<Lock size={20} />}
            />
            <InputField
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register("confirmPassword")}
              icon={<Lock size={20} />}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 flex items-center justify-center transform hover:scale-[1.02]"
            >
              {isSubmitting && (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
              )}
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-purple-600 hover:text-purple-800"
              >
                Log in here
              </a>
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
