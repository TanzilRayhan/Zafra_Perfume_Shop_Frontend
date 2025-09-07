"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Zafra
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/cart"
              className="p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/admin/register"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-purple-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-purple-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-purple-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/admin/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
