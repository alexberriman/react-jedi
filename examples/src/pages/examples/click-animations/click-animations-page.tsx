import React from "react";
import { motion } from "framer-motion";
import {
  useClickAnimation,
  useClickPreset,
  clickPresets,
  ClickButton,
  ClickCard,
  ClickIcon,
  type ClickPreset,
  AnimationProvider,
} from "@banja/react-jedi";
import { DocumentationPageTemplate } from "../../documentation/documentation-page-template";

// Icon components for demos
const HeartIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Demo components
const ClickPresetDemo = () => {
  const presetKeys = Object.keys(clickPresets) as ClickPreset[];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Click Animation Presets</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {presetKeys.map((preset) => {
          const PresetCard = () => {
            const animation = useClickPreset(preset);

            return (
              <motion.div
                {...animation}
                className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg shadow cursor-pointer text-center"
              >
                <div className="font-semibold">{preset}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Click to test</div>
              </motion.div>
            );
          };

          return <PresetCard key={preset} />;
        })}
      </div>
    </div>
  );
};

const ComponentExamples = () => {
  const [buttonClicks, setButtonClicks] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Click Button Component</h3>
        <div className="flex flex-wrap gap-4">
          <ClickButton onClick={() => setButtonClicks(buttonClicks + 1)}>
            Default ({buttonClicks} clicks)
          </ClickButton>
          <ClickButton variant="secondary" preset="jelly">
            Secondary Jelly
          </ClickButton>
          <ClickButton variant="ghost" preset="bounce" size="lg">
            Large Ghost Bounce
          </ClickButton>
          <ClickButton variant="danger" preset="pulse" size="sm">
            Small Danger Pulse
          </ClickButton>
          <ClickButton disabled>Disabled</ClickButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Click Card Component</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ClickCard
            preset="bounce"
            header={<h4 className="font-semibold">Basic Plan</h4>}
            footer={<div className="text-sm text-gray-500">Starting at $9/mo</div>}
            onClick={() => setSelectedCard("basic")}
            className={selectedCard === "basic" ? "ring-2 ring-blue-500" : ""}
          >
            <ul className="text-sm space-y-1 my-4">
              <li>✓ 1 User</li>
              <li>✓ 10GB Storage</li>
              <li>✓ Basic Support</li>
            </ul>
          </ClickCard>

          <ClickCard
            preset="press"
            header={<h4 className="font-semibold">Pro Plan</h4>}
            footer={<div className="text-sm text-gray-500">Starting at $29/mo</div>}
            onClick={() => setSelectedCard("pro")}
            className={selectedCard === "pro" ? "ring-2 ring-blue-500" : ""}
          >
            <ul className="text-sm space-y-1 my-4">
              <li>✓ 5 Users</li>
              <li>✓ 100GB Storage</li>
              <li>✓ Priority Support</li>
            </ul>
          </ClickCard>

          <ClickCard
            preset="jelly"
            header={<h4 className="font-semibold">Enterprise</h4>}
            footer={<div className="text-sm text-gray-500">Contact us</div>}
            onClick={() => setSelectedCard("enterprise")}
            className={selectedCard === "enterprise" ? "ring-2 ring-blue-500" : ""}
          >
            <ul className="text-sm space-y-1 my-4">
              <li>✓ Unlimited Users</li>
              <li>✓ Unlimited Storage</li>
              <li>✓ 24/7 Support</li>
            </ul>
          </ClickCard>
        </div>
        {selectedCard && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            Selected: {selectedCard} plan
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Click Icon Component</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <ClickIcon icon={<HeartIcon />} preset="pulse" className="text-red-500" />
            <ClickIcon icon={<StarIcon />} preset="jelly" className="text-yellow-500" />
            <ClickIcon icon={<HeartIcon />} preset="bounce" size="lg" className="text-pink-500" />
            <ClickIcon icon={<StarIcon />} preset="pop" size="sm" className="text-orange-500" />
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Star Rating</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <ClickIcon
                  key={star}
                  icon={<StarIcon />}
                  preset="jelly"
                  className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            {rating > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                You rated: {rating} stars
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomAnimationPlayground = () => {
  const [config, setConfig] = React.useState({
    scale: 0.92,
    rotate: -2,
    brightness: 0.85,
    translateY: 2,
  });

  const animation = useClickAnimation(config);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Custom Animation Playground</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Scale: {config.scale}</label>
            <input
              type="range"
              min="0.5"
              max="1.2"
              step="0.01"
              value={config.scale}
              onChange={(e) => setConfig({ ...config, scale: Number.parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rotate: {config.rotate}°</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              value={config.rotate}
              onChange={(e) => setConfig({ ...config, rotate: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Brightness: {config.brightness}
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={config.brightness}
              onChange={(e) =>
                setConfig({ ...config, brightness: Number.parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Translate Y: {config.translateY}px
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={config.translateY}
              onChange={(e) => setConfig({ ...config, translateY: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <motion.button
            {...animation}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl shadow-xl cursor-pointer text-lg"
          >
            Test Animation
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export const ClickAnimationsPage: React.FC = () => {
  return (
    <AnimationProvider>
      <DocumentationPageTemplate
        title="Click Animations"
        description="Add interactive click animations to your components with React Jedi's click animation system."
        sections={[
          {
            title: "Click Animation Presets",
            description: "Pre-built click animation presets for common interaction patterns.",
            content: <ClickPresetDemo />,
            code: `import { useClickPreset, ClickButton, ClickCard, ClickIcon } from '@banja/react-jedi';

// Using presets with hooks
const MyComponent = () => {
  const bounceAnimation = useClickPreset('bounce');
  
  return (
    <motion.div {...bounceAnimation}>
      Click me!
    </motion.div>
  );
};

// Using pre-built components
<ClickButton preset="press">
  Click Me
</ClickButton>

<ClickCard preset="bounce">
  Card Content
</ClickCard>

<ClickIcon 
  icon={<HeartIcon />} 
  preset="pulse" 
/>`,
          },
          {
            title: "Component Examples",
            description: "Pre-built click animation components for common UI patterns.",
            content: <ComponentExamples />,
            code: `import { ClickButton, ClickCard, ClickIcon } from '@banja/react-jedi';

// Button with variants and sizes
<ClickButton 
  variant="primary"
  size="lg"
  preset="bounce"
  onClick={handleClick}
>
  Large Primary Button
</ClickButton>

// Interactive card
<ClickCard
  preset="press"
  header={<h4>Card Title</h4>}
  footer={<p>Card Footer</p>}
  onClick={handleCardClick}
>
  Card content goes here
</ClickCard>

// Icon with animation
<ClickIcon
  icon={<StarIcon />}
  preset="jelly"
  size="md"
  onClick={handleIconClick}
/>`,
          },
          {
            title: "Custom Animation Configuration",
            description: "Create custom click animations with fine-grained control.",
            content: <CustomAnimationPlayground />,
            code: `import { useClickAnimation } from '@banja/react-jedi';

const MyComponent = () => {
  const clickAnimation = useClickAnimation({
    scale: 0.9,
    rotate: -5,
    brightness: 0.85,
    shadow: "inset 0 2px 6px rgba(0,0,0,0.2)",
    translateY: 3,
  });
  
  return (
    <motion.button {...clickAnimation}>
      Custom Animation
    </motion.button>
  );
};`,
          },
        ]}
      />
    </AnimationProvider>
  );
};
