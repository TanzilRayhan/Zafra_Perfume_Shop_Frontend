"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Zafra Classic",
    price: "$89",
    originalPrice: "$120",
    description: "Timeless elegance in every drop",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "2",
    name: "Zafra Premium",
    price: "$145",
    originalPrice: "$180",
    description: "Luxury redefined for the modern soul",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "3",
    name: "Zafra Luxury",
    price: "$230",
    originalPrice: "$280",
    description: "The pinnacle of olfactory artistry",
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "4",
    name: "Zafra Essence",
    price: "$65",
    originalPrice: "$85",
    description: "Pure essence of sophistication",
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "5",
    name: "Zafra Royal",
    price: "$195",
    originalPrice: "$240",
    description: "Fit for royalty, crafted for you",
    rating: 4.9,
    reviews: 93,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=300&fit=crop&crop=center&q=80",
  },
  {
    id: "6",
    name: "Zafra Noir",
    price: "$175",
    originalPrice: "$220",
    description: "Mystery and allure in perfect harmony",
    rating: 4.8,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop&crop=center&q=80",
  },
];

export default function ProductsPage() {
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
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Discover our exquisite range of premium fragrances, each carefully
              crafted to tell your unique story
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-white/20"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save{" "}
                    {Math.round(
                      (1 -
                        parseInt(product.price.replace("$", "")) /
                          parseInt(product.originalPrice.replace("$", ""))) *
                        100
                    )}
                    %
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">
                        {product.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 text-center transform hover:scale-[1.02]"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get notified about new arrivals and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:outline-none transition-all duration-200"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
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
    </div>
  );
}
