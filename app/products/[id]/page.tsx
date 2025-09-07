"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
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

const productData = {
  "1": {
    name: "Zafra Classic",
    price: "$89",
    originalPrice: "$120",
    description:
      "Timeless elegance in every drop. A sophisticated blend that captures the essence of traditional craftsmanship with modern sensibilities.",
    longDescription:
      "Zafra Classic is our signature fragrance, carefully crafted with the finest ingredients sourced from around the world. This timeless scent opens with fresh bergamot and citrus notes, develops into a heart of jasmine and rose, and settles into a warm base of sandalwood and vanilla.",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    ingredients: [
      "Bergamot",
      "Jasmine",
      "Rose",
      "Sandalwood",
      "Vanilla",
      "Musk",
    ],
    features: ["Long-lasting", "Unisex", "Cruelty-free", "Natural ingredients"],
  },
  "2": {
    name: "Zafra Premium",
    price: "$145",
    originalPrice: "$180",
    description:
      "Luxury redefined for the modern soul. An exquisite composition that speaks to those who appreciate the finer things in life.",
    longDescription:
      "Zafra Premium represents the pinnacle of luxury fragrance crafting. This sophisticated blend features rare oud wood, complemented by delicate floral notes and finished with a touch of amber.",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    ingredients: ["Oud Wood", "White Lily", "Amber", "Cedarwood", "Bergamot"],
    features: [
      "Premium ingredients",
      "Limited edition",
      "Handcrafted",
      "Gift packaging",
    ],
  },
  "3": {
    name: "Zafra Luxury",
    price: "$230",
    originalPrice: "$280",
    description:
      "The pinnacle of olfactory artistry. A masterpiece that defines luxury and sophistication.",
    longDescription:
      "Zafra Luxury is our most exclusive offering, featuring rare and precious ingredients that create an unforgettable olfactory experience.",
    rating: 5.0,
    reviews: 67,
    inStock: true,
    ingredients: [
      "Rare Saffron",
      "Bulgarian Rose",
      "Agarwood",
      "Frankincense",
      "Ambergris",
    ],
    features: [
      "Ultra-premium",
      "Collector's edition",
      "Certificate of authenticity",
      "Leather presentation box",
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = productData[id as keyof typeof productData] || {
    name: `Zafra Product ${id}`,
    price: "$89",
    originalPrice: "$120",
    description: "A wonderful fragrance experience",
    longDescription: "This is a detailed description of the product.",
    rating: 4.5,
    reviews: 50,
    inStock: true,
    ingredients: ["Various natural ingredients"],
    features: ["High quality", "Long-lasting"],
  };

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
              <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-2xl"></div>
              <button className="absolute top-4 right-4 p-3 bg-white/80 rounded-full hover:bg-white transition-colors duration-200">
                <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
              </button>
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
                {product.price}
              </span>
              <span className="text-2xl text-gray-500 line-through">
                {product.originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Save{" "}
                {Math.round(
                  (1 -
                    parseInt(product.price.replace("$", "")) /
                      parseInt(product.originalPrice.replace("$", ""))) *
                    100
                )}
                %
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">In Stock</span>
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
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 font-semibold">
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
              {["description", "ingredients", "features"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
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
                <h3 className="text-xl font-bold mb-4">Key Ingredients</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="bg-purple-50 p-4 rounded-xl text-center"
                    >
                      <span className="font-medium text-purple-900">
                        {ingredient}
                      </span>
                    </div>
                  ))}
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
