import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";

const slides = [
  {
    id: 1,
    image: carousel1,
    title: "Modern Workspace",
    subtitle: "Contemporary office design",
    description: "Stunning glass architecture with city views"
  },
  {
    id: 2,
    image: carousel2,
    title: "Creative Hub",
    subtitle: "Innovation center",
    description: "Collaborative spaces for modern teams"
  },
  {
    id: 3,
    image: carousel3,
    title: "Luxury Living",
    subtitle: "Premium interiors",
    description: "Elegant residential spaces"
  },
  {
    id: 4,
    image: carousel4,
    title: "Tech Center",
    subtitle: "Futuristic infrastructure",
    description: "Advanced data center technology"
  },
  {
    id: 5,
    image: carousel5,
    title: "Design Studio",
    subtitle: "Creative workspace",
    description: "Inspiring environments for creativity"
  }
];

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              Interactive Carousel Demo
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              Beautiful Carousel
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience smooth transitions and elegant design with our modern carousel component
            </p>
          </div>

          {/* Main Carousel */}
          <div className="max-w-[1440px] mx-auto">
            <Carousel
              setApi={setApi}
              className="w-full animate-scale-in"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={slide.id} className="basis-1/2">
                    <Card className="border-0 bg-card/50 backdrop-blur-sm overflow-hidden group">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Slide Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <div className="animate-fade-in">
                            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30">
                              {slide.subtitle}
                            </Badge>
                            <h3 className="text-3xl font-bold mb-2">
                              {slide.title}
                            </h3>
                            <p className="text-lg opacity-90">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Buttons */}
              <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" />
              <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" />
            </Carousel>

            {/* Custom Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index + 1 === current
                      ? "bg-primary shadow-lg scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                {current} of {count}
              </span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded bg-primary"></div>
              </div>
              <h3 className="font-semibold mb-2">Auto-Play</h3>
              <p className="text-sm text-muted-foreground">
                Automatic slide transitions with smooth animations
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded bg-accent"></div>
              </div>
              <h3 className="font-semibold mb-2">Touch Support</h3>
              <p className="text-sm text-muted-foreground">
                Swipe gestures and keyboard navigation included
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded bg-gradient-to-r from-primary to-accent"></div>
              </div>
              <h3 className="font-semibold mb-2">Responsive</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for all screen sizes and devices
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;