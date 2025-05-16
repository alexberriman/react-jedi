import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";
import { Card, CardContent } from "../card";

const meta: Meta<ComponentProps<typeof Carousel>> = {
  title: "Components/UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Carousel orientation",
    },
    opts: {
      control: { type: "object" },
      description: "Carousel options (loop, align, etc.)",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic carousel with cards
export const Basic: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

// Carousel with loop enabled
export const WithLoop: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

// Multiple items visible at once
export const MultipleItems: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto p-8">
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

// Vertical carousel
export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-2xl mx-auto p-8">
      <Carousel orientation="vertical" className="w-full max-w-md">
        <CarouselContent className="h-[400px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex h-[120px] items-center justify-center p-6">
                  <span className="text-2xl font-semibold">Item {index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

// Without navigation arrows
export const WithoutArrows: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
};

// With custom content
export const CustomContent: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto p-8">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {[
            {
              title: "Modern Design",
              desc: "Beautiful and responsive interfaces",
              color: "bg-blue-500",
            },
            {
              title: "Fast Performance",
              desc: "Optimized for speed and efficiency",
              color: "bg-green-500",
            },
            {
              title: "Easy to Use",
              desc: "Intuitive API and documentation",
              color: "bg-purple-500",
            },
            { title: "Flexible", desc: "Customizable to fit your needs", color: "bg-orange-500" },
            { title: "Reliable", desc: "Battle-tested in production", color: "bg-red-500" },
          ].map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className={`${item.color} border-none text-white`}>
                <CardContent className="flex flex-col justify-between h-48 p-6">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-lg opacity-90">{item.desc}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="secondary" />
        <CarouselNext variant="secondary" />
      </Carousel>
    </div>
  ),
};

// Center aligned items
export const CenterAligned: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Carousel opts={{ align: "center" }} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-4/5">
              <Card className="h-64">
                <CardContent className="flex items-center justify-center h-full p-6">
                  <span className="text-4xl font-semibold">Slide {index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
