"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  BarChart3,
  Users,
  ShoppingBag,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  created_at: string;
}

interface Order {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  user?: User;
  product?: Product;
}

interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: string;
  changeType?: "positive" | "negative";
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  isLoading,
}) => (
  <div className="bg-white rounded-lg border shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-20 mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-16 mt-2"></div>
          </div>
        ) : (
          <>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <p
                className={`text-sm mt-2 ${
                  changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change} from last month
              </p>
            )}
          </>
        )}
      </div>
      <div className="bg-purple-50 p-3 rounded-full">
        <Icon className="h-6 w-6 text-purple-600" />
      </div>
    </div>
  </div>
);

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div className="bg-white border-r w-64 min-h-screen p-6">
    <div className="mb-8">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Zafra Admin
      </h2>
    </div>

    <nav className="space-y-2">
      <a
        href="/dashboard"
        className="flex items-center px-3 py-2 text-gray-900 bg-purple-50 rounded-lg"
      >
        <BarChart3 className="h-5 w-5 mr-3" />
        Dashboard
      </a>
      <a
        href="/dashboard/users"
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
      >
        <Users className="h-5 w-5 mr-3" />
        Users
      </a>
      <a
        href="/dashboard/orders"
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
      >
        <ShoppingBag className="h-5 w-5 mr-3" />
        Orders
      </a>
      <a
        href="/products"
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
      >
        <ShoppingBag className="h-5 w-5 mr-3" />
        Products
      </a>
      <a
        href="/dashboard/settings"
        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
      >
        <Settings className="h-5 w-5 mr-3" />
        Settings
      </a>
    </nav>

    <div className="mt-auto pt-8">
      <button
        onClick={onLogout}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg w-full"
      >
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  </div>
);

const Header: React.FC = () => (
  <div className="bg-white border-b px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, [router]);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token found:", token); // Debug log

      if (!token) {
        router.push("/login");
        return;
      }

      // For now, just check if token exists and is not expired
      // You can add proper token verification later if needed
      try {
        // Decode JWT to check expiration (basic check)
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (payload.exp && payload.exp < currentTime) {
            throw new Error("Token expired");
          }

          setIsAuthenticated(true);
          console.log("User authenticated with payload:", payload);
        } else {
          // If not a JWT, just accept the token for now
          setIsAuthenticated(true);
          console.log("Token accepted (non-JWT format)");
        }
      } catch (tokenError) {
        console.error("Token validation failed:", tokenError);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        addToast("Session expired. Please log in again.", "warning");
        router.push("/login");
        return;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchDashboardData = async () => {
    setIsDataLoading(true);
    setError(null);

    try {
      const baseURL = "http://localhost:8000/admin";
      const headers = getAuthHeaders();

      // Fetch all data in parallel
      const [usersRes, productsRes, ordersRes, reviewsRes] =
        await Promise.allSettled([
          axios.get(`${baseURL}/users`, { headers }),
          axios.get(`${baseURL}/products`, { headers }),
          axios.get(`${baseURL}/orders`, { headers }),
          axios.get(`${baseURL}/reviews`, { headers }),
        ]);

      // Process users
      let users: User[] = [];
      if (usersRes.status === "fulfilled") {
        users = usersRes.value.data;
      } else {
        console.warn("Users API failed:", usersRes.reason?.message);
      }

      // Process products
      let products: Product[] = [];
      if (productsRes.status === "fulfilled") {
        products = productsRes.value.data;
      } else {
        console.warn("Products API failed:", productsRes.reason?.message);
      }

      // Process orders
      let ordersData: Order[] = [];
      let totalRevenue = 0;
      if (ordersRes.status === "fulfilled") {
        ordersData = ordersRes.value.data;
        setOrders(ordersData.slice(0, 10)); // Show latest 10 orders
        totalRevenue = ordersData.reduce(
          (sum, order) => sum + (order.total_amount || 0),
          0
        );
      } else {
        console.warn("Orders API failed:", ordersRes.reason?.message);
      }

      // Update stats
      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: ordersData.length,
        totalRevenue,
      });

      // Show success toast if at least some data was fetched
      if (users.length || products.length || ordersData.length) {
        addToast("Dashboard data loaded successfully!", "success", 3000);
      }
    } catch (error: any) {
      console.error("Failed to fetch dashboard data:", error);
      setError("Failed to load dashboard data. Using demo data.");
      addToast("Backend not available. Showing demo data.", "warning", 5000);

      // Fall back to demo data
      setStats({
        totalUsers: 2543,
        totalProducts: 24,
        totalOrders: 1423,
        totalRevenue: 52340,
      });

      setOrders([
        {
          id: 1,
          user_id: 1,
          product_id: 1,
          quantity: 1,
          total_amount: 89,
          status: "Completed",
          created_at: "2024-01-15",
          user: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            created_at: "2024-01-01",
          },
          product: {
            id: 1,
            name: "Zafra Classic",
            price: 89,
            description: "Classic fragrance",
            created_at: "2024-01-01",
          },
        },
        {
          id: 2,
          user_id: 2,
          product_id: 2,
          quantity: 1,
          total_amount: 145,
          status: "Processing",
          created_at: "2024-01-14",
          user: {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            created_at: "2024-01-02",
          },
          product: {
            id: 2,
            name: "Zafra Premium",
            price: 145,
            description: "Premium fragrance",
            created_at: "2024-01-02",
          },
        },
      ]);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    addToast("Logged out successfully!", "success", 2000);
    router.push("/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const statsConfig = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Products",
      value: stats.totalProducts.toLocaleString(),
      icon: BarChart3,
      change: "+5%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          {error && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    Backend Connection Issue
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsConfig.map((stat, index) => (
              <StatCard key={index} {...stat} isLoading={isDataLoading} />
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h3>
                <button
                  onClick={() => addToast("Feature coming soon!", "info", 3000)}
                  className="flex items-center px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Order
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isDataLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded w-18"></div>
                        </td>
                      </tr>
                    ))
                  ) : orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.user?.name || `User ${order.user_id}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.product?.name || `Product ${order.product_id}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(order.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
