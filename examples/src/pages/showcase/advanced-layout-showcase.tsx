import { usePageMetadata } from "../../lib/meta";
import { PageHeader } from "../../components/ui/page-header";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Heading,
  Masonry,
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
  ScrollArea,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@banja/react-jedi";
import { useState } from "react";

export function AdvancedLayoutShowcase() {
  usePageMetadata({
    title: "Advanced Layouts",
    description:
      "Advanced layout components in React Jedi. Explore Stack, Grid, Resizable panels, and more with interactive examples.",
  });

  const [activeSection, setActiveSection] = useState("all");

  const sections = [
    { id: "all", label: "All Components" },
    { id: "box", label: "Box" },
    { id: "container", label: "Container" },
    { id: "grid", label: "Grid" },
    { id: "flex", label: "Flex" },
    { id: "stack", label: "Stack" },
    { id: "group", label: "Group" },
    { id: "center", label: "Center" },
    { id: "spacer", label: "Spacer" },
    { id: "simple-grid", label: "SimpleGrid" },
    { id: "masonry", label: "Masonry" },
    { id: "aspect-ratio", label: "AspectRatio" },
    { id: "scroll-area", label: "ScrollArea" },
    { id: "resizable", label: "Resizable" },
  ];

  const renderSection = (id: string) => {
    if (activeSection !== "all" && activeSection !== id) return null;

    switch (id) {
      case "box": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Box Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-sm sm:text-base text-muted-foreground transition-colors">
                A Box is the most basic layout component. It renders a div with styling props.
              </Text>

              <div className="space-y-4">
                <Box className="p-4 bg-primary text-primary-foreground rounded-lg transition-colors">
                  Box with custom styling
                </Box>

                <Box className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-zinc-900 dark:text-white rounded-xl shadow-lg transition-colors">
                  Box with gradient background
                </Box>

                <Box className="p-4 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded transition-colors">
                  Box with dashed border
                </Box>
              </div>
            </CardContent>
          </Card>
        );
      }

      case "container": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Container Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-sm sm:text-base text-muted-foreground transition-colors">
                Container is a layout component that wraps content with responsive max-width and
                padding.
              </Text>

              <Container className="bg-muted rounded p-4 transition-colors">
                <Text>
                  This content is wrapped in a Container with max-width and responsive padding.
                </Text>
              </Container>

              <Container size="sm" className="mt-4 bg-muted rounded p-4 transition-colors">
                <Text>Small Container (max-width: 24rem)</Text>
              </Container>

              <Container size="lg" className="mt-4 bg-muted rounded p-4 transition-colors">
                <Text>Large Container (max-width: 64rem)</Text>
              </Container>
            </CardContent>
          </Card>
        );
      }

      case "grid": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Grid Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Grid component creates powerful CSS Grid layouts with responsive columns.
              </Text>

              <Grid columns="3" gap="4" className="mb-6">
                <Box className="p-4 bg-blue-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Column 1
                </Box>
                <Box className="p-4 bg-blue-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Column 2
                </Box>
                <Box className="p-4 bg-blue-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Column 3
                </Box>
              </Grid>

              <Text className="mb-2">Responsive Grid:</Text>
              <Grid columns={{ default: "1", md: "2", lg: "3" }} gap="4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Box
                    key={i}
                    className="p-8 bg-gradient-to-br from-purple-500 to-indigo-500 text-zinc-900 dark:text-white rounded-lg shadow-md transition-colors"
                  >
                    Item {i + 1}
                  </Box>
                ))}
              </Grid>
            </CardContent>
          </Card>
        );
      }

      case "flex": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Flex Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Flex component provides flexbox layouts with alignment and direction controls.
              </Text>

              <Text className="mb-2">Horizontal Flex:</Text>
              <Flex gap="4" className="mb-6">
                <Box className="p-4 bg-green-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Item 1
                </Box>
                <Box className="p-4 bg-green-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Item 2
                </Box>
                <Box className="p-4 bg-green-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Item 3
                </Box>
              </Flex>

              <Text className="mb-2">Vertical Flex:</Text>
              <Flex direction="column" gap="2" className="mb-6">
                <Box className="p-4 bg-purple-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Top
                </Box>
                <Box className="p-4 bg-purple-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Middle
                </Box>
                <Box className="p-4 bg-purple-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Bottom
                </Box>
              </Flex>

              <Text className="mb-2">Justified Flex:</Text>
              <Flex justify="between" align="center">
                <Badge variant="secondary">Start</Badge>
                <Text>Center Content</Text>
                <Badge variant="secondary">End</Badge>
              </Flex>
            </CardContent>
          </Card>
        );
      }

      case "stack": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Stack Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Stack arranges children vertically or horizontally with consistent spacing.
              </Text>

              <Text className="mb-2">Vertical Stack (default):</Text>
              <Stack spacing="md" className="mb-6">
                <Box className="p-4 bg-yellow-500 text-black rounded transition-colors">First</Box>
                <Box className="p-4 bg-yellow-500 text-black rounded transition-colors">Second</Box>
                <Box className="p-4 bg-yellow-500 text-black rounded transition-colors">Third</Box>
              </Stack>

              <Text className="mb-2">Horizontal Stack:</Text>
              <Stack direction="horizontal" spacing="lg">
                <Button>Button 1</Button>
                <Button variant="outline">Button 2</Button>
                <Button variant="ghost">Button 3</Button>
              </Stack>
            </CardContent>
          </Card>
        );
      }

      case "group": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Group Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Group arranges elements inline with consistent horizontal spacing.
              </Text>

              <Group spacing="sm" className="mb-4">
                <Badge>Tag 1</Badge>
                <Badge variant="secondary">Tag 2</Badge>
                <Badge variant="outline">Tag 3</Badge>
                <Badge variant="destructive">Tag 4</Badge>
              </Group>

              <Group spacing="lg">
                <Button size="sm">Save</Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm" variant="ghost">
                  Reset
                </Button>
              </Group>
            </CardContent>
          </Card>
        );
      }

      case "center": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Center Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Center component centers its children both horizontally and vertically.
              </Text>

              <Center className="h-40 bg-gray-100 rounded-lg transition-colors">
                <Box className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-900 dark:text-white rounded-lg shadow-lg transition-colors">
                  Perfectly Centered Content
                </Box>
              </Center>

              <Center className="mt-4 h-32 bg-gray-900 rounded-lg transition-colors">
                <Text className="text-zinc-900 dark:text-white text-2xl font-bold transition-colors">
                  ✨ Centered ✨
                </Text>
              </Center>
            </CardContent>
          </Card>
        );
      }

      case "spacer": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Spacer Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Spacer adds flexible or fixed spacing between elements.
              </Text>

              <Flex align="center" className="mb-6">
                <Button>Start</Button>
                <Spacer />
                <Button>End</Button>
              </Flex>

              <Stack>
                <Box className="p-4 bg-indigo-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Top
                </Box>
                <Spacer size="lg" />
                <Box className="p-4 bg-indigo-500 text-zinc-900 dark:text-white rounded transition-colors">
                  Bottom with Large Spacer
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );
      }

      case "simple-grid": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>SimpleGrid Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                SimpleGrid creates responsive grids with equal-sized columns.
              </Text>

              <SimpleGrid columns={{ default: 2, md: 3, lg: 4 }} gap="4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <AspectRatio key={i} ratio={1}>
                    <Box className="h-full bg-gradient-to-br from-pink-500 to-purple-500 text-zinc-900 dark:text-white rounded-lg flex items-center justify-center font-bold transition-colors">
                      {i + 1}
                    </Box>
                  </AspectRatio>
                ))}
              </SimpleGrid>
            </CardContent>
          </Card>
        );
      }

      case "masonry": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Masonry Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Masonry creates Pinterest-style grid layouts where items flow vertically.
              </Text>

              <Masonry columns={{ default: 2, md: 3, lg: 4 }} gap="4">
                {[
                  { h: 140, gradient: "from-blue-500 to-purple-500" },
                  { h: 200, gradient: "from-green-500 to-teal-500" },
                  { h: 160, gradient: "from-red-500 to-pink-500" },
                  { h: 180, gradient: "from-yellow-500 to-orange-500" },
                  { h: 220, gradient: "from-indigo-500 to-purple-500" },
                  { h: 150, gradient: "from-pink-500 to-rose-500" },
                  { h: 190, gradient: "from-cyan-500 to-blue-500" },
                  { h: 170, gradient: "from-violet-500 to-purple-500" },
                ].map((item, i) => (
                  <Box
                    key={i}
                    className={`bg-gradient-to-br ${item.gradient} text-zinc-900 dark:text-white rounded-lg flex items-center justify-center font-bold shadow-lg`}
                    style={{ height: `${item.h}px` }}
                  >
                    Item {i + 1}
                  </Box>
                ))}
              </Masonry>
            </CardContent>
          </Card>
        );
      }

      case "aspect-ratio": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>AspectRatio Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                AspectRatio maintains consistent width/height ratios for responsive content.
              </Text>

              <Grid columns="3" gap="4">
                <div>
                  <Text className="mb-2 text-sm transition-colors">16:9</Text>
                  <AspectRatio ratio={16 / 9}>
                    <Box className="h-full bg-blue-500 rounded flex items-center justify-center text-zinc-900 dark:text-white transition-colors">
                      16:9
                    </Box>
                  </AspectRatio>
                </div>

                <div>
                  <Text className="mb-2 text-sm transition-colors">1:1</Text>
                  <AspectRatio ratio={1}>
                    <Box className="h-full bg-green-500 rounded flex items-center justify-center text-zinc-900 dark:text-white transition-colors">
                      1:1
                    </Box>
                  </AspectRatio>
                </div>

                <div>
                  <Text className="mb-2 text-sm transition-colors">4:3</Text>
                  <AspectRatio ratio={4 / 3}>
                    <Box className="h-full bg-purple-500 rounded flex items-center justify-center text-zinc-900 dark:text-white transition-colors">
                      4:3
                    </Box>
                  </AspectRatio>
                </div>
              </Grid>
            </CardContent>
          </Card>
        );
      }

      case "scroll-area": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>ScrollArea Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                ScrollArea provides beautiful scrollbars for overflowing content.
              </Text>

              <ScrollArea className="h-72 rounded-lg border p-4">
                <Stack spacing="md">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Box
                      key={i}
                      className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-zinc-900 dark:text-white rounded transition-colors"
                    >
                      Scrollable Item {i + 1}
                    </Box>
                  ))}
                </Stack>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      }

      case "resizable": {
        return (
          <Card>
            <CardHeader>
              <CardTitle>Resizable Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4 text-muted-foreground transition-colors">
                Resizable creates adjustable panels with drag handles.
              </Text>

              <div className="h-64">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50}>
                    <Box className="h-full p-4 bg-blue-500 text-zinc-900 dark:text-white rounded-l transition-colors">
                      Left Panel
                    </Box>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <Box className="h-full p-4 bg-purple-500 text-zinc-900 dark:text-white rounded-r transition-colors">
                      Right Panel
                    </Box>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </CardContent>
          </Card>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeader 
        title="Advanced Layout Components"
        description="Explore our comprehensive collection of layout components for building modern, responsive interfaces"
      />

      <div className="container mx-auto px-4 py-8">
        <Group spacing="sm" className="mb-8 flex-wrap justify-center">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {section.label}
            </Button>
          ))}
        </Group>

        <Stack spacing="xl">
          {sections.slice(1).map((section) => (
            <div key={section.id}>{renderSection(section.id)}</div>
          ))}
        </Stack>
      </div>
    </div>
  );
}
