import React from "react";
import {
  AnimationProvider,
  Drag,
  DragCard,
  DragListItem,
  dragPresets,
} from "../../../../lib/animation";
// import { Page } from "../../../components/layout/page";

export const DragAnimationsPage: React.FC = () => {
  const [draggingState, setDraggingState] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleDragStart = (id: string) => {
    setDraggingState((prev) => ({ ...prev, [id]: true }));
  };

  const handleDragEnd = (id: string) => {
    setDraggingState((prev) => ({ ...prev, [id]: false }));
  };

  const presetExamples = Object.entries(dragPresets).map(([name, config]) => ({
    name,
    config,
  }));

  const items = [
    { id: "1", title: "Task 1", description: "Build new feature", priority: "high" },
    { id: "2", title: "Task 2", description: "Fix reported bug", priority: "medium" },
    { id: "3", title: "Task 3", description: "Update documentation", priority: "low" },
    { id: "4", title: "Task 4", description: "Write tests", priority: "medium" },
  ];

  return (
    <AnimationProvider>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Drag Animations</h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore the drag animation system with various presets and customization options.
              These animations provide interactive drag behaviors with smooth physics-based motion.
            </p>
          </section>

          {/* Basic Drag Examples */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Drag Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-4">Free Drag</h4>
                <div className="h-48 relative border-2 border-dashed border-gray-300 rounded-lg">
                  <Drag>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
                      Drag
                    </div>
                  </Drag>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium mb-4">X-Axis Only</h4>
                <div className="h-48 relative border-2 border-dashed border-gray-300 rounded-lg flex items-center">
                  <Drag axis="x">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
                      X
                    </div>
                  </Drag>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium mb-4">Y-Axis Only</h4>
                <div className="h-48 relative border-2 border-dashed border-gray-300 rounded-lg flex justify-center">
                  <Drag axis="y">
                    <div className="w-20 h-20 bg-gradient-to-b from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
                      Y
                    </div>
                  </Drag>
                </div>
              </div>
            </div>
          </section>

          {/* Constraint Examples */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Constrained Dragging</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-4">Bounded Area</h4>
                <div className="h-64 relative border-2 border-dashed border-gray-300 rounded-lg">
                  <Drag
                    dragConstraints={{
                      left: -100,
                      right: 100,
                      top: -80,
                      bottom: 80,
                    }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
                      Bounds
                    </div>
                  </Drag>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium mb-4">Elastic Bounds</h4>
                <div className="h-64 relative border-2 border-dashed border-gray-300 rounded-lg">
                  <Drag
                    dragConstraints={{
                      left: -50,
                      right: 50,
                      top: -50,
                      bottom: 50,
                    }}
                    dragElastic={0.5}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">
                      Elastic
                    </div>
                  </Drag>
                </div>
              </div>
            </div>
          </section>

          {/* Preset Showcase */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Animation Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {presetExamples.map(({ name }) => (
                <div key={name} className="text-center">
                  <h4 className="text-sm font-medium mb-2 capitalize">{name}</h4>
                  <div className="h-32 relative bg-gray-50 rounded-lg flex items-center justify-center">
                    <Drag preset={name as keyof typeof dragPresets}>
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow">
                        {name}
                      </div>
                    </Drag>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Draggable Cards */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Draggable Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DragCard variant="elevated" preset="smooth">
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900">Elevated Card</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Smooth drag with shadow effects
                  </p>
                </div>
              </DragCard>

              <DragCard variant="outlined" preset="elastic">
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900">Outlined Card</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Elastic spring animation
                  </p>
                </div>
              </DragCard>

              <DragCard variant="flat" preset="ghost">
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900">Flat Card</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Ghost effect on drag
                  </p>
                </div>
              </DragCard>

              <DragCard variant="interactive" preset="magnetic">
                <div className="p-2">
                  <h4 className="font-semibold text-gray-900">Interactive</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Magnetic snap animation
                  </p>
                </div>
              </DragCard>
            </div>
          </section>

          {/* Draggable List */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Draggable List Items</h3>
            <div className="max-w-2xl">
              <div className="space-y-2">
                {items.map((item) => (
                  <DragListItem
                    key={item.id}
                    handle
                    preset="smooth"
                    onDragStart={() => handleDragStart(item.id)}
                    onDragEnd={() => handleDragEnd(item.id)}
                  >
                    <div
                      className={`
                        transition-opacity duration-200
                        ${draggingState[item.id] ? "opacity-70" : "opacity-100"}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span
                          className={`
                            px-2 py-1 text-xs font-medium rounded-full
                            ${
                              item.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : item.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          `}
                        >
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  </DragListItem>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Example */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Drag Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-4">Snap to Origin</h4>
                <div className="h-64 relative bg-gray-50 rounded-lg flex items-center justify-center">
                  <Drag dragSnapToOrigin preset="elastic">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                      Snap
                    </div>
                  </Drag>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">No Momentum</h4>
                <div className="h-64 relative bg-gray-50 rounded-lg flex items-center justify-center">
                  <Drag dragMomentum={false} preset="smooth">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                      Static
                    </div>
                  </Drag>
                </div>
              </div>
            </div>
          </section>

          {/* Custom Animation */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Custom Drag Animation</h3>
            <div className="text-center">
              <div className="h-64 relative bg-gray-50 rounded-lg flex items-center justify-center">
                <Drag
                  animation={{
                    scale: 1.15,
                    rotate: 8,
                    shadow: "0 30px 60px rgba(124, 58, 237, 0.3)",
                    brightness: 1.2,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                    },
                  }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
                    Custom
                  </div>
                </Drag>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Custom animation with scale, rotation, shadow, and brightness effects
              </p>
            </div>
          </section>
        </div>
      </div>
    </AnimationProvider>
  );
};