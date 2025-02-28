import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Star, 
  Heart
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data - will be replaced with Supabase data later
const product = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  description: "Our premium cotton t-shirt is made from 100% organic cotton, providing exceptional comfort and durability. Perfect for everyday wear, this versatile piece features a classic fit and is available in multiple colors and sizes.",
  features: [
    "100% organic cotton",
    "Classic fit",
    "Pre-shrunk fabric",
    "Reinforced stitching",
    "Machine washable"
  ],
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Navy", value: "#0a192f" },
    { name: "Red", value: "#e11d48" }
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  reviews: [
    { id: 1, user: "Alex Johnson", rating: 5, comment: "Excellent quality and fits perfectly. Will definitely buy more!", date: "2023-10-15" },
    { id: 2, user: "Sam Smith", rating: 4, comment: "Great shirt, very comfortable. Slightly larger than expected.", date: "2023-09-28" },
    { id: 3, user: "Taylor Wilson", rating: 5, comment: "Love the material and the color is exactly as shown.", date: "2023-09-10" }
  ],
  relatedProducts: [
    { id: 2, name: "Slim Fit Jeans", price: 49.99, image: "/placeholder.svg", rating: 4.5 },
    { id: 3, name: "Casual Hoodie", price: 39.99, image: "/placeholder.svg", rating: 4.7 },
    { id: 4, name: "Canvas Sneakers", price: 59.99, image: "/placeholder.svg", rating: 4.3 },
    { id: 5, name: "Denim Jacket", price: 69.99, image: "/placeholder.svg", rating: 4.8 }
  ]
};

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to Medium
  const [quantity, setQuantity] = useState(1);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Calculate average rating
  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / Clothing / T-Shirts / {product.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden w-20 h-20 border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">New Arrival</Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-2">Color: {selectedColor.name}</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor.name === color.name
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-1 ring-border"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Size: {selectedSize}</h3>
              <button className="text-sm text-primary hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                className="h-10 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1 gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger 
            value="details" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="features" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            Features
          </TabsTrigger>
          <TabsTrigger 
            value="reviews" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            Reviews ({product.reviews.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <p className="text-muted-foreground">
              Our premium cotton t-shirt is designed for maximum comfort and durability. 
              Made from 100% organic cotton, it's soft against the skin and breathable for all-day wear.
              The classic fit is versatile enough for any occasion, whether you're dressing up or keeping it casual.
            </p>
            <p className="text-muted-foreground">
              Each shirt is pre-shrunk to ensure a consistent fit wash after wash, and features reinforced 
              stitching at the seams for added durability. Available in multiple colors and sizes, 
              this t-shirt is a wardrobe essential that combines quality, comfort, and style.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="features" className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{review.user}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Quick Add
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{item.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;