"use client";

import Link from "next/link";
import { ArrowRight, Heart, Award, Leaf, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Fragrance",
    description:
      "We are driven by our love for creating unforgettable scent experiences that touch the soul and create lasting memories.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every bottle represents our commitment to excellence, using only the finest ingredients sourced from around the world.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description:
      "We're dedicated to environmental responsibility, using eco-friendly packaging and supporting sustainable sourcing.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We believe in building relationships that last as long as our fragrances.",
  },
];

const milestones = [
  {
    year: "2010",
    event: "Zafra founded with a vision to redefine luxury fragrance",
  },
  { year: "2015", event: "Launched our first signature collection" },
  { year: "2018", event: "Expanded internationally to 15 countries" },
  { year: "2020", event: "Introduced eco-friendly packaging initiative" },
  { year: "2023", event: "Reached 1 million satisfied customers worldwide" },
  { year: "2024", event: "Launched premium artisan collection" },
];

export default function AboutPage() {
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
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Zafra
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-4xl mx-auto">
              Since 2010, we've been crafting exceptional fragrances that tell
              stories, evoke emotions, and create unforgettable moments. Every
              bottle represents our passion for the art of perfumery.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Zafra was born from a simple belief: that fragrance has the
                  power to transform moments into memories. Our founders,
                  passionate about the ancient art of perfumery, set out to
                  create scents that would speak to the soul and celebrate
                  individuality.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Today, we continue to honor this vision by carefully crafting
                  each fragrance with premium ingredients, innovative
                  techniques, and an unwavering commitment to quality that has
                  made Zafra a trusted name in luxury perfumes.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105"
                >
                  Explore Our Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=400&fit=crop&crop=center&q=80"
                    alt="Zafra perfume collection"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do, from sourcing
                ingredients to delivering exceptional customer experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-lg transition duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600">
                Key milestones that shaped Zafra into what it is today
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-lg text-gray-700 font-medium">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Join Our Story
              </h2>
              <p className="text-xl mb-8 text-gray-600">
                Become part of the Zafra family and discover fragrances that
                celebrate your unique story
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
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
