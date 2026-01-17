import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export function HeroSlider() {
  const slides: Slide[] = [
    {
      id: 1,
      title: "AI-Powered Credit Scoring",
      description: "Our advanced algorithms analyze your financial data to provide instant credit decisions.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGwzcRAXaxQs6u14SrShs9U0COKn31TYOWYA&s",
    },
    {
      id: 2,
      title: "Instant Loan Approvals",
      description: "Get approved in minutes, not days. Experience the future of lending today.",
      imageUrl: "https://dnb.com.eg/public/uploads/blog/blog-post/dnb-guide-to-credit-rating-analysis-in-egypt.jpg",
    },
    {
      id: 3,
      title: "Secure & Reliable",
      description: "Bank-grade security ensures your financial information is always protected.",
      imageUrl: "https://dnbuae.com/public/uploads/blog/blog-post/understanding-company-credit-checking-and-credit-scores-for-businesses.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img 
                src={slide.imageUrl} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-2xl md:text-3xl font-black text-center mb-3 text-white">
                {slide.title}
              </h3>
              <p className="text-center text-white/90 max-w-md font-bold">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}