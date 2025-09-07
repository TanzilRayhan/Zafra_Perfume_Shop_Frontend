"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/Toast";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  size: string;
  availability: string;
  features: string[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products?id=${productId}`);
      setProduct(response.data.product);
      setError(null);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const discountPercentage = Math.round(
    (1 - (product?.price || 0) / (product?.originalPrice || 1)) * 100
  );

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        description: product.description,
        category: product.category,
        brand: product.brand,
        size: product.size,
      },
      quantity
    );

    addToast(`${quantity} x ${product.name} added to cart!`, "success", 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    handleAddToCart();
    addToast("Redirecting to checkout...", "info", 2000);
    // You can add redirect to checkout logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Product not found"}</p>
          <Link
            href="/products"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/products"
              className="text-purple-600 hover:text-purple-800"
            >
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/products"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/80 rounded-full hover:bg-white transition-colors duration-200">
                <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              {product.size} • {product.category}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-purple-600">
                ${product.price}
              </span>
              <span className="text-2xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Save {discountPercentage}%
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.availability === "In Stock"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-medium ${
                  product.availability === "In Stock"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {product.availability}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 rounded-l-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 rounded-r-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 font-semibold"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { key: "description", label: "Description" },
                { key: "ingredients", label: "Notes" },
                { key: "features", label: "Features" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Fragrance Notes</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-2">
                      Top Notes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.top.map((note, index) => (
                        <span
                          key={index}
                          className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">
                      Middle Notes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.middle.map((note, index) => (
                        <span
                          key={index}
                          className="bg-pink-50 text-pink-800 px-3 py-1 rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">
                      Base Notes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.base.map((note, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "features" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
