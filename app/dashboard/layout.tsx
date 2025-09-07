import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Zafra Perfume",
  description: "Admin dashboard for Zafra Perfume",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
