import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import stock1 from "@/assets/stock-carousel-1-1.jpg";
import stock2 from "@/assets/stock-carousel-1-2.jpg";

export function CarouselPreview() {
  const [slide, setSlide] = React.useState<number>(0);
  const slides = [
    { src: stock1, title: "Slide 1" },
    { src: stock2, title: "Slide 2" },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const fallback = { src: stock1, title: "Slide 1" };
  const currentSlide = slides[slide] ?? fallback;

  return (
    <div className="relative w-full max-w-[150px] overflow-hidden rounded-sm border border-border bg-canvas shadow-xs">
      <div className="relative h-16 w-full">
        <img
          src={currentSlide.src}
          alt={currentSlide.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 px-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-white">
            {currentSlide.title}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <ChevronLeft className="h-2.5 w-2.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <ChevronRight className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
