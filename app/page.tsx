"use client";

import Link from "next/link";
import { ArrowRight, Star, Shield, Truck, Heart } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Zafra Classic",
    price: "$89",
    image: "/api/placeholder/300/300",
    description: "Timeless elegance in every drop",
  },
  {
    id: 2,
    name: "Zafra Premium",
    price: "$145",
    image: "/api/placeholder/300/300",
    description: "Luxury redefined for the modern soul",
  },
  {
    id: 3,
    name: "Zafra Luxury",
    price: "$230",
    image: "/api/placeholder/300/300",
    description: "The pinnacle of olfactory artistry",
  },
];

const features = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Crafted with the finest ingredients sourced globally",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on orders over $75",
  },
  {
    icon: Heart,
    title: "Satisfaction Guarantee",
    description: "30-day money-back guarantee on all purchases",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to Zafra
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
                Discover the art of fragrance with our exclusive collection of
                premium perfumes. Each scent tells a story, each bottle holds a
                memory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Collections
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our most beloved fragrances, each carefully crafted to
                capture life's most precious moments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-white/20"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&crop=center&q=80`}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-purple-600">
                        {product.price}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="ml-2 text-gray-600">(4.9)</span>
                      </div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center transform hover:scale-[1.02]"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Zafra?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're committed to delivering an exceptional fragrance
                experience with every purchase
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-white/60 backdrop-blur-sm hover:shadow-lg transition duration-300 border border-white/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ready to Find Your Signature Scent?
              </h2>
              <p className="text-xl mb-8 text-gray-600">
                Join thousands of satisfied customers who have found their
                perfect fragrance with Zafra
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
