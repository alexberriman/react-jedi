import React from 'react';

export function TestResponsivePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Responsive Breakpoint Test</h1>
      
      {/* Visual indicator of current breakpoint */}
      <div className="mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center font-bold">
          <span className="block sm:hidden">Current: Mobile (default)</span>
          <span className="hidden sm:block md:hidden">Current: Small (sm) - 640px+</span>
          <span className="hidden md:block lg:hidden">Current: Medium (md) - 768px+</span>
          <span className="hidden lg:block xl:hidden">Current: Large (lg) - 1024px+</span>
          <span className="hidden xl:block 2xl:hidden">Current: Extra Large (xl) - 1280px+</span>
          <span className="hidden 2xl:block">Current: 2XL - 1536px+</span>
        </div>
      </div>

      {/* Grid test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Grid Test</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-100 p-4 rounded-lg text-center">
              Item {item}
            </div>
          ))}
        </div>
      </div>

      {/* Color test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Color Test</h2>
        <div className="p-4 rounded-lg text-white font-bold text-center 
          bg-red-500 
          sm:bg-orange-500 
          md:bg-yellow-500 
          lg:bg-green-500 
          xl:bg-blue-500 
          2xl:bg-purple-500">
          This should change color at each breakpoint
        </div>
      </div>

      {/* Visibility test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Visibility Test</h2>
        <div className="space-y-2">
          <div className="block sm:hidden bg-gray-200 p-4 rounded">Mobile only</div>
          <div className="hidden sm:block md:hidden bg-gray-200 p-4 rounded">Small only</div>
          <div className="hidden md:block lg:hidden bg-gray-200 p-4 rounded">Medium only</div>
          <div className="hidden lg:block xl:hidden bg-gray-200 p-4 rounded">Large only</div>
          <div className="hidden xl:block 2xl:hidden bg-gray-200 p-4 rounded">XL only</div>
          <div className="hidden 2xl:block bg-gray-200 p-4 rounded">2XL only</div>
        </div>
      </div>

      {/* Flexbox test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Flexbox Direction Test</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-blue-100 p-4 rounded">Item 1</div>
          <div className="bg-blue-200 p-4 rounded">Item 2</div>
          <div className="bg-blue-300 p-4 rounded">Item 3</div>
        </div>
      </div>

      {/* Text size test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Text Size Test</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          This text should get larger at each breakpoint
        </p>
      </div>

      {/* Viewport info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Viewport Info</h2>
        <div className="text-sm font-mono">
          <div>Window width: <span id="window-width">-</span>px</div>
          <div>Window height: <span id="window-height">-</span>px</div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function updateViewportInfo() {
            document.getElementById('window-width').textContent = window.innerWidth;
            document.getElementById('window-height').textContent = window.innerHeight;
          }
          updateViewportInfo();
          window.addEventListener('resize', updateViewportInfo);
        `
      }} />
    </div>
  );
}