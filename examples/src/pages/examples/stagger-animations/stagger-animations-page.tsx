import React, { useState } from "react";
import {
  AnimationProvider,
  Stagger,
  StaggerList,
  StaggerContainer,
  StaggerItem,
  staggerPresets,
  createComplexStagger,
  createPathStagger,
} from "../../../../../src/lib/animation";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";

const StaggerAnimationsPage = () => {
  const [activeStaggerPreset, setActiveStaggerPreset] =
    useState<keyof typeof staggerPresets>("fadeIn");
  const [staggerDelay, setStaggerDelay] = useState(0.1);
  const [autoStart, setAutoStart] = useState(true);
  const [direction, setDirection] = useState<"forwards" | "backwards">("forwards");
  const [triggerKey, setTriggerKey] = useState(0);
  const [orchestration, setOrchestration] = useState<"stagger" | "sequence" | "cascade">("stagger");
  const [pathType, setPathType] = useState<"arc" | "zigzag" | "spiral" | "wave">("arc");

  // Demo items
  const cardItems = [
    {
      id: 1,
      title: "Modern Design",
      description: "Beautiful, modern UI components for React applications.",
    },
    {
      id: 2,
      title: "Type Safe",
      description: "Fully typed components for a better developer experience.",
    },
    {
      id: 3,
      title: "Performance",
      description: "Optimized for fast rendering and smooth animations.",
    },
    {
      id: 4,
      title: "Customizable",
      description: "Easily theme and extend components to match your brand.",
    },
    { id: 5, title: "Accessible", description: "Built with accessibility in mind for all users." },
    { id: 6, title: "Server-Driven", description: "Define your UI using JSON specifications." },
  ];

  // Example of complex stagger animation
  const complexVariants = createComplexStagger({
    effects: ["fade", "slide", "scale", "rotate", "blur"],
    direction: "up",
    staggerDelay: staggerDelay,
    intensity: 30,
  });

  // Example of path stagger animation
  const pathVariants = createPathStagger({
    path: pathType,
    intensity: 50,
    staggerDelay: staggerDelay,
    childCount: cardItems.length,
  });

  // Re-render with new animations
  const resetAnimation = () => {
    setTriggerKey((prev) => prev + 1);
  };

  return (
    <AnimationProvider>
      <div className="container mx-auto py-10 space-y-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Staggered Animations</h1>
        <p className="text-xl text-muted-foreground">
          Beautiful, synchronized animations for lists and groups of elements
        </p>
      </div>

      {/* Controls */}
      <div className="bg-card p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4">Animation Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Label>Animation Preset</Label>
            <Select
              value={activeStaggerPreset}
              onValueChange={(val) => setActiveStaggerPreset(val as keyof typeof staggerPresets)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(staggerPresets).map((preset) => (
                  <SelectItem key={preset} value={preset}>
                    {preset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Stagger Delay: {staggerDelay.toFixed(2)}s</Label>
            <Slider
              min={0.02}
              max={0.5}
              step={0.01}
              value={[staggerDelay]}
              onValueChange={(val) => setStaggerDelay(val[0])}
            />
          </div>

          <div className="space-y-4">
            <Label>Direction</Label>
            <Select
              value={direction}
              onValueChange={(val) => setDirection(val as "forwards" | "backwards")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forwards">Forwards</SelectItem>
                <SelectItem value="backwards">Backwards</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Orchestration</Label>
            <Select
              value={orchestration}
              onValueChange={(val) => setOrchestration(val as "stagger" | "sequence" | "cascade")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select orchestration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stagger">Stagger</SelectItem>
                <SelectItem value="sequence">Sequence</SelectItem>
                <SelectItem value="cascade">Cascade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Path Type (for Path animation)</Label>
            <Select
              value={pathType}
              onValueChange={(val) => setPathType(val as "arc" | "zigzag" | "spiral" | "wave")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select path type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arc">Arc</SelectItem>
                <SelectItem value="zigzag">Zigzag</SelectItem>
                <SelectItem value="spiral">Spiral</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Auto Start</Label>
            <div className="flex items-center space-x-2">
              <Switch id="auto-start" checked={autoStart} onCheckedChange={setAutoStart} />
              <Label htmlFor="auto-start">{autoStart ? "Enabled" : "Disabled"}</Label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={resetAnimation}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Restart Animation
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basic">Basic Stagger</TabsTrigger>
          <TabsTrigger value="staggerList">StaggerList</TabsTrigger>
          <TabsTrigger value="container">StaggerContainer</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Basic Stagger Animation</h2>
            <Stagger
              key={`basic-${triggerKey}`}
              animation={activeStaggerPreset}
              staggerDelay={staggerDelay}
              direction={direction}
              orchestration={orchestration}
              autoStart={autoStart}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {cardItems.map((item) => (
                <Card key={item.id} className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </Stagger>
          </div>
        </TabsContent>

        <TabsContent value="staggerList" className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">StaggerList Component</h2>
            <StaggerList
              key={`list-${triggerKey}`}
              items={cardItems}
              renderItem={(item) => (
                <Card className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              )}
              keyExtractor={(item) => item.id}
              staggerDelay={staggerDelay}
              animation={activeStaggerPreset}
              direction={direction}
              orchestration={orchestration}
              autoStart={autoStart}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              listType="div"
            />
          </div>
        </TabsContent>

        <TabsContent value="container" className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">StaggerContainer with Items</h2>
            <StaggerContainer
              key={`container-${triggerKey}`}
              staggerDelay={staggerDelay}
              direction={direction}
              autoPlay={autoStart}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {cardItems.map((item) => (
                <StaggerItem key={item.id} variants={staggerPresets[activeStaggerPreset]}>
                  <Card className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Complex Multi-effect Animation</h2>
            <Stagger
              key={`complex-${triggerKey}`}
              staggerVariants={complexVariants}
              staggerDelay={staggerDelay}
              direction={direction}
              orchestration={orchestration}
              autoStart={autoStart}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {cardItems.map((item) => (
                <Card key={item.id} className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </Stagger>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Path-based Animation ({pathType})</h2>
            <Stagger
              key={`path-${triggerKey}-${pathType}`}
              staggerVariants={pathVariants}
              staggerDelay={staggerDelay}
              direction={direction}
              orchestration={orchestration}
              autoStart={autoStart}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {cardItems.map((item) => (
                <Card key={item.id} className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </Stagger>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Usage Example</h2>
        <CodeBlock language="javascript">
          {`// Basic Stagger Example
import { Stagger } from "@alexberriman/react-jedi/animation";

export const MyList = () => (
  <Stagger
    animation="slideUp"
    staggerDelay={0.1}
    direction="forwards"
    orchestration="stagger"
    className="grid grid-cols-3 gap-4"
  >
    <Card>Item 1</Card>
    <Card>Item 2</Card>
    <Card>Item 3</Card>
  </Stagger>
);

// With StaggerList (for arrays of data)
import { StaggerList } from "@alexberriman/react-jedi/animation";

export const MyDataList = () => (
  <StaggerList
    items={myItems}
    renderItem={(item) => <Card>{item.title}</Card>}
    keyExtractor={(item) => item.id}
    animation="bounce"
    staggerDelay={0.1}
    direction="forwards"
    orchestration="cascade"
  />
);`}
        </CodeBlock>
      </div>
    </div>
    </AnimationProvider>
  );
};

export default StaggerAnimationsPage;
