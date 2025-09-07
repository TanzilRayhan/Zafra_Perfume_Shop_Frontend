"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/Toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  description: string;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Zafra Classic",
    price: 89,
    originalPrice: 120,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop&crop=center&q=80",
    quantity: 2,
    description: "Timeless elegance in every drop",
  },
  {
    id: "2",
    name: "Zafra Premium",
    price: 145,
    originalPrice: 180,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=200&h=200&fit=crop&crop=center&q=80",
    quantity: 1,
    description: "Luxury redefined for the modern soul",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { addToast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    addToast("Item removed from cart", "success", 2000);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 75 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    addToast("Checkout functionality coming soon!", "info", 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any fragrances to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <p className="text-xl text-gray-700">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-2xl font-bold text-purple-600">
                            ${item.price}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Save ${item.originalPrice - item.price}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="pt-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl h-fit">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">You Save</span>
                    <span className="font-semibold text-green-600">
                      -${savings.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  {subtotal < 75 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        Add <strong>${(75 - subtotal).toFixed(2)}</strong> more
                        for free shipping!
                      </p>
                    </div>
                  )}

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>Secure checkout powered by SSL encryption</p>
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
