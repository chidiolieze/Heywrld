import { useState } from "react";
import { ShopLayout } from "@/components/layout/shop-layout";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@shared/schema";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Check,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/cart-context";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, getDiscountPercentage, getImageUrl } from "@/lib/utils";
import { ProductCard } from "@/components/product/product-card";

export default function ProductPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [location] = useLocation();
  const { addItem } = useCart();
  
  const productId = location.split('/').pop();
  
  const { data: product, isLoading: isLoadingProduct } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: [`/api/products/related/${productId}`],
    enabled: !!product,
  });
  
  if (isLoadingProduct) {
    return (
      <ShopLayout>
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            <div className="md:w-1/2">
              <div className="bg-gray-200 dark:bg-gray-700 h-[400px] rounded-lg"></div>
              <div className="mt-4 flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 w-20 h-20 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </ShopLayout>
    );
  }
  
  if (!product) {
    return (
      <ShopLayout>
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop">
            <a>
              <Button>Continue Shopping</Button>
            </a>
          </Link>
        </div>
      </ShopLayout>
    );
  }
  
  const categoryName = categories?.find(c => c.id === product.categoryId)?.name || "";
  const discountPercentage = getDiscountPercentage(product.price, product.discountPrice);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity} item${quantity > 1 ? 's' : ''}) has been added to your cart.`,
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };
  
  const handleImageNavigation = (index: number) => {
    if (index >= 0 && index < (product.images?.length || 0)) {
      setActiveImageIndex(index);
    }
  };
  
  return (
    <ShopLayout>
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/">
            <a className="hover:text-primary">Home</a>
          </Link>
          {" > "}
          <Link href="/shop">
            <a className="hover:text-primary">Shop</a>
          </Link>
          {categoryName && (
            <>
              {" > "}
              <Link href={`/shop/${categories?.find(c => c.id === product.categoryId)?.slug}`}>
                <a className="hover:text-primary">{categoryName}</a>
              </Link>
            </>
          )}
          {" > "}
          <span>{product.name}</span>
        </div>
        
        {/* Product Detail */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-[500px]">
              <img
                src={getImageUrl(product.images && product.images[activeImageIndex])}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {discountPercentage && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </div>
              )}
              
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md text-foreground hover:bg-primary hover:text-white transition-colors"
                    onClick={() => handleImageNavigation(activeImageIndex - 1)}
                    disabled={activeImageIndex === 0}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md text-foreground hover:bg-primary hover:text-white transition-colors"
                    onClick={() => handleImageNavigation(activeImageIndex + 1)}
                    disabled={activeImageIndex === (product.images.length - 1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                      index === activeImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">{categoryName}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">4.0 (24 reviews)</span>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                {formatCurrency(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="ml-3 text-lg text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-muted-foreground">
                {product.description || "No description available for this product."}
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className={`h-4 w-4 rounded-full ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className={product.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.quantity > 0 && product.quantity < 10 && (
                  <span className="ml-2 text-sm text-yellow-600 dark:text-yellow-400">
                    (Only {product.quantity} left)
                  </span>
                )}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">SKU:</span> {product.sku}
              </div>
            </div>
            
            {product.quantity > 0 && (
              <div className="mb-8">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    className="border border-input h-10 w-10 flex items-center justify-center rounded-l-md text-lg"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.quantity}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="h-10 w-16 border-y border-input text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    className="border border-input h-10 w-10 flex items-center justify-center rounded-r-md text-lg"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                className="bg-primary hover:bg-primary/90 text-white flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.quantity <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="flex-none">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="flex-none">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Free Delivery</h4>
                  <p className="text-sm text-muted-foreground">For orders over ₦10,000</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground">Powered by Flutterwave</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Quality Guarantee</h4>
                  <p className="text-sm text-muted-foreground">100% authentic products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b mb-6 space-x-8">
              <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="text-lg">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{product.description || "No detailed description available for this product."}</p>
                
                {/* Placeholder content if description is short */}
                {(!product.description || product.description.length < 100) && (
                  <>
                    <p>Experience the quality and excellence that Heywrld Enterprise is known for with our {product.name}.</p>
                    <p>This premium product is carefully sourced to ensure you get nothing but the best. Whether for personal use or as a gift, this item is sure to impress.</p>
                    <p>At Heywrld Enterprise, we stand behind every product we sell, guaranteeing authenticity and quality.</p>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="w-1/2 text-muted-foreground">SKU</span>
                      <span className="w-1/2">{product.sku}</span>
                    </div>
                    <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="w-1/2 text-muted-foreground">Category</span>
                      <span className="w-1/2">{categoryName}</span>
                    </div>
                    {product.categoryId === 2 && ( // Assuming category ID 2 is for perfumes
                      <>
                        <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                          <span className="w-1/2 text-muted-foreground">Fragrance Type</span>
                          <span className="w-1/2">Eau de Parfum</span>
                        </div>
                        <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                          <span className="w-1/2 text-muted-foreground">Volume</span>
                          <span className="w-1/2">100ml</span>
                        </div>
                      </>
                    )}
                    {product.categoryId === 1 && ( // Assuming category ID 1 is for farm produce
                      <>
                        <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                          <span className="w-1/2 text-muted-foreground">Origin</span>
                          <span className="w-1/2">Local Farm</span>
                        </div>
                        <div className="flex border-b border-gray-200 dark:border-gray-700 py-2">
                          <span className="w-1/2 text-muted-foreground">Organic</span>
                          <span className="w-1/2">Yes</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="delivery">
                      <AccordionTrigger>Delivery</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">We offer nationwide delivery across Nigeria.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Lagos: 1-2 business days</li>
                          <li>Other major cities: 2-4 business days</li>
                          <li>Remote areas: 3-7 business days</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="returns">
                      <AccordionTrigger>Returns & Refunds</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">We accept returns within 7 days of delivery.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Items must be unused and in original packaging</li>
                          <li>Perishable items cannot be returned unless damaged</li>
                          <li>Return shipping costs are borne by the customer unless item is defective</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="warranty">
                      <AccordionTrigger>Warranty</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          All products come with a 30-day quality guarantee. If you receive a defective item, please contact our customer service team for replacement or refund.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-4">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">4.0 out of 5</span>
                  <span className="text-sm text-muted-foreground ml-2">(24 reviews)</span>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "2 months ago",
                      comment: "Excellent product! The quality exceeded my expectations. Will definitely purchase again."
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      date: "1 month ago",
                      comment: "Very good product. Delivery was prompt and packaging was secure."
                    },
                    {
                      name: "Michael O.",
                      rating: 3,
                      date: "3 weeks ago",
                      comment: "Decent product for the price. Nothing exceptional but gets the job done."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
