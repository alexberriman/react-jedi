import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhotoFlipCard, PhotoFlipCardGrid } from "./photo-flip-card";

describe("PhotoFlipCard", () => {
  it("renders with required props", () => {
    render(
      <PhotoFlipCard
        frontImage="https://placehold.co/400x400/EEE/31343C"
        frontImageAlt="Test image"
      />
    );
    
    // PhotoFlipCard renders two images (front and back)
    const images = screen.getAllByAltText("Test image");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "https://placehold.co/400x400/EEE/31343C");
    expect(images[1]).toHaveAttribute("src", "https://placehold.co/400x400/EEE/31343C");
  });

  it("renders with title and description", () => {
    render(
      <PhotoFlipCard
        frontImage="https://placehold.co/400x400/EEE/31343C"
        title="Test Title"
        description="Test Description"
      />
    );
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with data-testid", () => {
    render(
      <PhotoFlipCard
        frontImage="https://placehold.co/400x400/EEE/31343C"
        frontImageAlt="Test image"
      />
    );
    
    const card = screen.getByTestId("photo-flip-card");
    expect(card).toBeInTheDocument();
  });
});

describe("PhotoFlipCardGrid", () => {
  it("renders grid with cards", () => {
    const cards = [
      {
        frontImage: "https://placehold.co/400x400/EEE/31343C",
        title: "Card 1",
      },
      {
        frontImage: "https://placehold.co/400x400/EEE/31343C",
        title: "Card 2",
      },
    ];
    
    render(<PhotoFlipCardGrid cards={cards} />);
    
    const grid = screen.getByTestId("photo-flip-card-grid");
    expect(grid).toBeInTheDocument();
    
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  it("applies correct column classes", () => {
    render(<PhotoFlipCardGrid cards={[]} columns="3" />);
    
    const grid = screen.getByTestId("photo-flip-card-grid");
    // Grid uses responsive classes
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("lg:grid-cols-3");
  });

  it("applies correct gap classes", () => {
    render(<PhotoFlipCardGrid cards={[]} gap="md" />);
    
    const grid = screen.getByTestId("photo-flip-card-grid");
    expect(grid).toHaveClass("gap-6");
  });
});