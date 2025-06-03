export * from "./carousel";
export * from "./carousel-block";

// Re-export the CarouselBlock as both CarouselBlock and Carousel for flexibility
export { CarouselBlock as Carousel } from "./carousel-block";