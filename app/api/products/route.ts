import { NextResponse } from "next/server";

// Extended product data with more details
const products = [
  {
    id: "1",
    name: "Zafra Classic",
    price: 89,
    originalPrice: 120,
    description: "Timeless elegance in every drop",
    longDescription:
      "Zafra Classic embodies timeless sophistication with its carefully balanced blend of bergamot, jasmine, and sandalwood. This signature fragrance opens with bright citrus notes that gradually give way to a heart of delicate florals, finishing with warm woody undertones that linger beautifully throughout the day.",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Classic",
    brand: "Zafra",
    size: "50ml",
    availability: "In Stock",
    features: ["Long-lasting", "Unisex", "Natural Ingredients"],
    notes: {
      top: ["Bergamot", "Lemon", "Pink Pepper"],
      middle: ["Jasmine", "Rose", "Lily of the Valley"],
      base: ["Sandalwood", "Musk", "Amber"],
    },
  },
  {
    id: "2",
    name: "Zafra Premium",
    price: 145,
    originalPrice: 180,
    description: "Luxury redefined for the modern soul",
    longDescription:
      "Zafra Premium represents the perfect fusion of contemporary elegance and classic luxury. This sophisticated fragrance features rare oud wood, exotic spices, and precious florals, creating an unforgettable olfactory experience that speaks to the refined taste of the modern connoisseur.",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Premium",
    brand: "Zafra",
    size: "75ml",
    availability: "In Stock",
    features: ["Premium Quality", "Luxury Packaging", "Exclusive Blend"],
    notes: {
      top: ["Saffron", "Cardamom", "Orange Blossom"],
      middle: ["Oud Wood", "Damascus Rose", "Iris"],
      base: ["Vanilla", "Patchouli", "White Musk"],
    },
  },
  {
    id: "3",
    name: "Zafra Luxury",
    price: 230,
    originalPrice: 280,
    description: "The pinnacle of olfactory artistry",
    longDescription:
      "Zafra Luxury represents the absolute pinnacle of our craftmanship. This extraordinary fragrance features the rarest ingredients from around the world, including precious ambergris, rare orris root, and aged sandalwood. Each bottle is a masterpiece that embodies decades of perfumery expertise.",
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Luxury",
    brand: "Zafra",
    size: "100ml",
    availability: "Limited Edition",
    features: [
      "Ultra-Premium",
      "Hand-crafted",
      "Limited Edition",
      "Collector's Item",
    ],
    notes: {
      top: ["Rare Bergamot", "Black Pepper", "Elemi"],
      middle: ["Orris Root", "Bulgarian Rose", "Ylang-Ylang"],
      base: ["Ambergris", "Aged Sandalwood", "Vetiver"],
    },
  },
  {
    id: "4",
    name: "Zafra Essence",
    price: 65,
    originalPrice: 85,
    description: "Pure essence of sophistication",
    longDescription:
      "Zafra Essence captures the pure, unadulterated beauty of nature's finest aromatics. This fresh and vibrant fragrance is perfect for daily wear, featuring clean citrus notes, fresh florals, and a subtle woody base that provides just the right amount of depth and character.",
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Fresh",
    brand: "Zafra",
    size: "30ml",
    availability: "In Stock",
    features: ["Fresh & Light", "Perfect for Daily Wear", "Affordable Luxury"],
    notes: {
      top: ["Grapefruit", "Green Apple", "Mint"],
      middle: ["White Tea", "Peony", "Freesia"],
      base: ["Cedar", "White Musk", "Blonde Woods"],
    },
  },
  {
    id: "5",
    name: "Zafra Royal",
    price: 195,
    originalPrice: 240,
    description: "Fit for royalty, crafted for you",
    longDescription:
      "Zafra Royal is an opulent fragrance inspired by the grandeur of royal courts. This majestic scent combines precious gold essence, rare spices, and exotic florals to create a truly regal olfactory experience that commands attention and admiration wherever you go.",
    rating: 4.9,
    reviews: 93,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Royal",
    brand: "Zafra",
    size: "75ml",
    availability: "In Stock",
    features: ["Royal Inspired", "Gold Infused", "Majestic Blend"],
    notes: {
      top: ["Golden Citrus", "Royal Saffron", "Pink Peppercorn"],
      middle: ["Royal Jasmine", "Turkish Rose", "Magnolia"],
      base: ["Golden Amber", "Royal Oud", "Precious Musk"],
    },
  },
  {
    id: "6",
    name: "Zafra Noir",
    price: 175,
    originalPrice: 220,
    description: "Mystery and allure in perfect harmony",
    longDescription:
      "Zafra Noir is a seductive and mysterious fragrance that embodies the allure of the night. This dark and enchanting scent features rich spices, smoky incense, and deep woody notes that create an irresistible aura of sophistication and intrigue.",
    rating: 4.8,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop&crop=center&q=80",
    category: "Oriental",
    brand: "Zafra",
    size: "50ml",
    availability: "In Stock",
    features: ["Mysterious", "Evening Wear", "Seductive"],
    notes: {
      top: ["Black Pepper", "Dark Chocolate", "Smoky Incense"],
      middle: ["Dark Rose", "Plum", "Cinnamon"],
      base: ["Dark Oud", "Tobacco", "Vanilla Bean"],
    },
  },
];

// GET: Fetch all products or a specific product by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  try {
    // If ID is provided, return specific product
    if (id) {
      const product = products.find((p) => p.id === id);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ product });
    }

    // If category filter is provided
    if (category) {
      const filteredProducts = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return NextResponse.json({ products: filteredProducts });
    }

    // If featured products are requested
    if (featured === "true") {
      const featuredProducts = products.slice(0, 3); // Return first 3 as featured
      return NextResponse.json({ products: featuredProducts });
    }

    // Return all products
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Add a new product (for admin use)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate new ID
    const newId = (
      Math.max(...products.map((p) => parseInt(p.id))) + 1
    ).toString();

    const newProduct = {
      id: newId,
      ...body,
      rating: 0,
      reviews: 0,
      availability: "In Stock",
    };

    products.push(newProduct);

    return NextResponse.json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 400 }
    );
  }
}

// PUT: Update a product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products[productIndex] = { ...products[productIndex], ...updateData };

    return NextResponse.json({
      message: "Product updated successfully",
      product: products[productIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 }
    );
  }
}

// DELETE: Remove a product
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products.splice(productIndex, 1);

  return NextResponse.json({
    message: "Product deleted successfully",
  });
}
