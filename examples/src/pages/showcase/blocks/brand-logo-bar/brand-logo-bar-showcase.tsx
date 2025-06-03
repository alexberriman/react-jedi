import { BrandLogoBar, Logo } from "@alexberriman/react-jedi";
import { ShowcaseWrapper } from "@/components/ui/showcase-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Box, Flex } from "@alexberriman/react-jedi";
import { useState } from "react";

// Sample logos for demonstration
const techLogos: Logo[] = [
  {
    id: "1",
    name: "Vercel",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
    href: "https://vercel.com",
  },
  {
    id: "2",
    name: "React",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
    href: "https://react.dev",
  },
  {
    id: "3",
    name: "TypeScript",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg",
    href: "https://www.typescriptlang.org",
  },
  {
    id: "4",
    name: "Tailwind CSS",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
    href: "https://tailwindcss.com",
  },
  {
    id: "5",
    name: "Vite",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vite.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vite.svg",
    href: "https://vitejs.dev",
  },
  {
    id: "6",
    name: "Next.js",
    lightSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
    darkSrc: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
    href: "https://nextjs.org",
  },
];

const enterpriseLogos: Logo[] = [
  {
    id: "e1",
    name: "Microsoft",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    href: "https://microsoft.com",
    width: 140,
    height: 30,
  },
  {
    id: "e2",
    name: "Google",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    href: "https://google.com",
    width: 120,
    height: 40,
  },
  {
    id: "e3",
    name: "Amazon",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    href: "https://amazon.com",
    width: 130,
    height: 40,
  },
  {
    id: "e4",
    name: "Apple",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    darkSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    href: "https://apple.com",
    width: 50,
    height: 60,
  },
  {
    id: "e5",
    name: "Meta",
    lightSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    href: "https://meta.com",
    width: 140,
    height: 30,
  },
];

export function BrandLogoBarShowcase() {
  const [variant, setVariant] = useState<"scrolling" | "grid" | "withHeading" | "grayscale" | "compact">("grid");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [spacing, setSpacing] = useState<"tight" | "normal" | "loose">("normal");
  const [columns, setColumns] = useState<2 | 3 | 4 | 5 | 6>(4);
  const [animated] = useState(true);
  const [logoSet, setLogoSet] = useState<"tech" | "enterprise" | "mixed">("tech");

  let logos: Logo[];
  if (logoSet === "tech") {
    logos = techLogos;
  } else if (logoSet === "enterprise") {
    logos = enterpriseLogos;
  } else {
    logos = [...techLogos, ...enterpriseLogos];
  }

  return (
    <Box className="container mx-auto py-12 space-y-8">
      <ShowcaseWrapper
        title="Brand Logo Bar"
        description="Display trusted brand logos in various layouts with animation support"
      >
        <Box className="space-y-8">
          <Flex className="gap-4 flex-wrap">
            <Box>
              <Label htmlFor="variant">Variant</Label>
              <Select value={variant} onValueChange={(value) => setVariant(value as typeof variant)}>
                <SelectTrigger id="variant" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scrolling">Scrolling Marquee</SelectItem>
                  <SelectItem value="grid">Static Grid</SelectItem>
                  <SelectItem value="withHeading">With Heading</SelectItem>
                  <SelectItem value="grayscale">Grayscale Hover</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            <Box>
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={(value) => setSize(value as typeof size)}>
                <SelectTrigger id="size" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            <Box>
              <Label htmlFor="spacing">Spacing</Label>
              <Select value={spacing} onValueChange={(value) => setSpacing(value as typeof spacing)}>
                <SelectTrigger id="spacing" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tight">Tight</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="loose">Loose</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            {variant !== "scrolling" && (
              <Box>
                <Label htmlFor="columns">Columns</Label>
                <Select value={columns.toString()} onValueChange={(value) => setColumns(Number.parseInt(value) as typeof columns)}>
                  <SelectTrigger id="columns" className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                    <SelectItem value="5">5 Columns</SelectItem>
                    <SelectItem value="6">6 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </Box>
            )}

            <Box>
              <Label htmlFor="logoSet">Logo Set</Label>
              <Select value={logoSet} onValueChange={(value) => setLogoSet(value as typeof logoSet)}>
                <SelectTrigger id="logoSet" className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech Companies</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </Box>
          </Flex>

          <Box className="border rounded-lg p-8 bg-background">
            <BrandLogoBar
              logos={logos}
              variant={variant}
              size={size}
              spacing={spacing}
              columns={columns}
              animated={animated}
              pauseOnHover={true}
              scrollSpeed={30}
            />
          </Box>
        </Box>
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="Interactive Examples"
        description="Different use cases and configurations"
      >
        <Box className="space-y-12">
          <Box>
            <h3 className="text-lg font-semibold mb-4">Scrolling Marquee</h3>
            <BrandLogoBar
              logos={[...techLogos, ...enterpriseLogos]}
              variant="scrolling"
              size="medium"
              spacing="normal"
              pauseOnHover={true}
              scrollSpeed={25}
            />
          </Box>

          <Box>
            <h3 className="text-lg font-semibold mb-4">Grayscale with Hover Effect</h3>
            <BrandLogoBar
              logos={techLogos}
              variant="grayscale"
              size="medium"
              spacing="normal"
              columns={3}
            />
          </Box>

          <Box>
            <h3 className="text-lg font-semibold mb-4">With Custom Heading</h3>
            <BrandLogoBar
              logos={enterpriseLogos}
              variant="withHeading"
              heading="Trusted by Fortune 500 Companies"
              size="large"
              spacing="loose"
              columns={3}
            />
          </Box>

          <Box>
            <h3 className="text-lg font-semibold mb-4">Compact Layout</h3>
            <BrandLogoBar
              logos={techLogos}
              variant="compact"
              size="small"
              spacing="tight"
              columns={6}
            />
          </Box>

          <Box>
            <h3 className="text-lg font-semibold mb-4">Two Column Layout</h3>
            <BrandLogoBar
              logos={enterpriseLogos.slice(0, 4)}
              variant="grid"
              size="large"
              spacing="loose"
              columns={2}
            />
          </Box>

          <Box>
            <h3 className="text-lg font-semibold mb-4">Fast Scrolling</h3>
            <BrandLogoBar
              logos={[...techLogos, ...enterpriseLogos]}
              variant="scrolling"
              size="small"
              spacing="tight"
              scrollSpeed={15}
            />
          </Box>
        </Box>
      </ShowcaseWrapper>

      <ShowcaseWrapper
        title="JSON Specification"
        description="Example specification for React Jedi"
      >
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{JSON.stringify({
            type: "BrandLogoBar",
            props: {
              logos: [
                {
                  id: "1",
                  name: "Company Name",
                  lightSrc: "/logo-light.svg",
                  darkSrc: "/logo-dark.svg",
                  href: "https://company.com"
                }
              ],
              variant: "scrolling",
              size: "medium",
              spacing: "normal",
              pauseOnHover: true,
              scrollSpeed: 30
            }
          }, null, 2)}</code>
        </pre>
      </ShowcaseWrapper>
    </Box>
  );
}