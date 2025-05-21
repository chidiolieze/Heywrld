import { ShopLayout } from "@/components/layout/shop-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Users, Award, Clock } from "lucide-react";

export default function About() {
  return (
    <ShopLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Heywrld Enterprise</h1>
            <p className="text-xl mb-6 text-gray-100">
              We're on a mission to deliver the finest quality farm produce and luxury perfumes directly to your doorstep.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Heywrld Enterprise was founded in 2018 with a simple vision: to bridge the gap between quality products and Nigerian consumers. We noticed that finding authentic farm produce and luxury perfumes was often challenging, with many consumers having to settle for inferior products.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                We started by establishing direct relationships with local farmers and international perfume manufacturers to ensure we could provide the highest quality products at fair prices.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we've grown to serve thousands of satisfied customers across Nigeria, maintaining our commitment to quality, authenticity, and exceptional customer service.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Heywrld Enterprise story" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-lg text-muted-foreground">
              At Heywrld Enterprise, we're guided by a strong set of principles that shape everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on the quality of our products. From farm to doorstep, we ensure only the best reaches our customers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Our customers are at the heart of everything we do. We're committed to providing exceptional service and addressing all needs promptly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reliability</h3>
              <p className="text-muted-foreground">
                We understand the importance of timely delivery and consistent quality. You can count on us to deliver what we promise, when we promise.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Why choose Heywrld" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Why Choose Heywrld Enterprise</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Direct Sourcing</h3>
                    <p className="text-muted-foreground">We source our produce directly from farms and our perfumes from reputable manufacturers, ensuring quality and authenticity.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Nationwide Delivery</h3>
                    <p className="text-muted-foreground">We deliver to all major cities across Nigeria, bringing quality products to your doorstep.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Payment Options</h3>
                    <p className="text-muted-foreground">With Flutterwave integration, your payments are secure. We also offer payment on delivery for your convenience.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Customer-First Approach</h3>
                    <p className="text-muted-foreground">Our dedicated customer service team is always ready to assist with any queries or issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals behind Heywrld Enterprise who work tirelessly to bring quality products to your doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Oluwaseun Adeyemi",
                position: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Chioma Okafor",
                position: "Head of Operations",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Emeka Nwosu",
                position: "Logistics Manager",
                image: "https://randomuser.me/api/portraits/men/67.jpg"
              },
              {
                name: "Amina Ibrahim",
                position: "Customer Relations",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Heywrld Difference</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust us for their quality farm produce and perfumes needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop">
              <a>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  Shop Now
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
