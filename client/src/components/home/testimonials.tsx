import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    role: "Regular Customer",
    content: "The farm produce from Heywrld Enterprise is exceptionally fresh. I can taste the difference compared to supermarket options. Their delivery is always on time too!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Perfume Enthusiast",
    content: "I've tried many luxury perfumes, but the collection at Heywrld stands out. The fragrances are unique and long-lasting. Absolutely worth every naira!",
    rating: 5
  },
  {
    id: 3,
    name: "Adeola Ogunleye",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    role: "Loyal Customer",
    content: "I appreciate the quality and consistency of Heywrld's products. Whether it's fresh vegetables or exotic perfumes, they never disappoint. Exceptional service!",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    role: "First-time Buyer",
    content: "I was skeptical about ordering farm produce online, but Heywrld exceeded my expectations. Everything arrived fresh and well-packaged. Will definitely order again!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title text-center mb-4">What Our Customers Say</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our customers have to say about their shopping experience with Heywrld Enterprise.
        </p>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="h-full p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="italic text-foreground">{testimonial.content}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
