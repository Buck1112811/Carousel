import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
  const [swiperRef, setSwiperRef] = useState<SwiperType>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(slides.length);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrent(swiper.realIndex);
  };

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
          <div className="max-w-[1440px] mx-auto relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== 'boolean') {
                  if (swiper.params.navigation) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }
              }}
              onSwiper={setSwiperRef}
              onSlideChange={handleSlideChange}
              keyboard={{
                enabled: true,
              }}
              className="w-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <Card className="border-0 bg-gradient-to-br from-slate-900/90 to-black/80 backdrop-blur-sm overflow-hidden group relative h-[400px] shadow-2xl">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                        <div className="text-primary/80 text-sm font-medium mb-2 tracking-wider uppercase">
                          {slide.subtitle}
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-3 leading-tight">
                          {slide.title}
                        </h3>
                        <p className="text-white/90 text-lg leading-relaxed mb-4">
                          {slide.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="h-px bg-primary flex-1 max-w-[60px]"></div>
                          <span className="text-primary text-sm font-medium">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Accent Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/30 to-transparent"></div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation */}
            <Button
              ref={prevRef}
              variant="outline"
              size="icon"
              className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              ref={nextRef}
              variant="outline"
              size="icon"
              className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 border-white/20 text-white hover:bg-black/80 backdrop-blur-sm shadow-xl"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef?.slideToLoop(index)}
                  className={`h-1 transition-all duration-500 ${
                    index === current
                      ? "bg-primary w-12 shadow-lg shadow-primary/50"
                      : "bg-white/30 w-6 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
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