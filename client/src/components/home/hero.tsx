import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-dark py-20 md:py-28">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Fresh Farm Produce & Luxury Perfumes
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Experience the finest quality products delivered directly to your doorstep.
            From farm-fresh produce to exotic fragrances, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <a>
                <Button size="lg" className="bg-secondary hover:bg-secondary-dark text-foreground w-full sm:w-auto">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                  Learn More
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
