"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/components/Toast";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "hello@zafra.com",
    description: "Send us an email anytime!",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Fragrance Lane, Perfume City, PC 12345",
    description: "Our flagship store & headquarters",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 8am-6pm, Sat-Sun: 10am-4pm",
    description: "We're here when you need us",
  },
];

interface InputFieldProps {
  id: string;
  type: "text" | "email";
  placeholder: string;
  register: any;
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  register,
  icon,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-200 hover:border-gray-300"
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
};

export default function ContactPage() {
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // Show validation errors as toast notifications
  useEffect(() => {
    if (errors.name) {
      addToast(errors.name.message || "Invalid name", "error", 3000);
    }
    if (errors.email) {
      addToast(errors.email.message || "Invalid email", "error", 3000);
    }
    if (errors.subject) {
      addToast(errors.subject.message || "Invalid subject", "error", 3000);
    }
    if (errors.message) {
      addToast(errors.message.message || "Invalid message", "error", 4000);
    }
  }, [errors, addToast]);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast(
        "Message sent successfully! We'll get back to you soon.",
        "success",
        5000
      );
      reset();
    } catch (error) {
      addToast("Failed to send message. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
              Have a question about our fragrances? Need help choosing the
              perfect scent? We'd love to hear from you and help you find your
              signature fragrance.
            </p>
          </div>
        </section>

        

        {/* Contact Form & Map Section */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputField
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    register={register("name")}
                    icon={<Mail size={20} />}
                  />

                  <InputField
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    register={register("email")}
                    icon={<Mail size={20} />}
                  />

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-200 hover:border-gray-300"
                      placeholder="Subject"
                      {...register("subject")}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      rows={5}
                      className="w-full px-4 py-4 rounded-xl border-2 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 border-gray-200 hover:border-gray-300 resize-none"
                      placeholder="Your Message"
                      {...register("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:opacity-50 flex items-center justify-center transform hover:scale-[1.02]"
                  >
                    {isSubmitting && (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                    )}
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Map/Location */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our Store
                </h2>
                <p className="text-gray-600 mb-8">
                  Experience our fragrances in person at our flagship store. Our
                  experts are ready to help you find your perfect scent.
                </p>

                {/* Map Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        123 Fragrance Lane
                        <br />
                        Perfume City, PC 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Store Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM
                        <br />
                        Saturday - Sunday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </div>
  );
}
