export function TestResponsivePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Responsive Breakpoint Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-red-500 sm:bg-yellow-500 md:bg-green-500 lg:bg-blue-500 xl:bg-purple-500 2xl:bg-pink-500 text-white">
          <p>Current breakpoint:</p>
          <p className="block sm:hidden">Default (mobile)</p>
          <p className="hidden sm:block md:hidden">sm (≥640px)</p>
          <p className="hidden md:block lg:hidden">md (≥768px)</p>
          <p className="hidden lg:block xl:hidden">lg (≥1024px)</p>
          <p className="hidden xl:block 2xl:hidden">xl (≥1280px)</p>
          <p className="hidden 2xl:block">2xl (≥1536px)</p>
        </div>
        
        <div>
          <p>Window width: <span id="window-width"></span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-200 dark:bg-gray-800">Column 1</div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800">Column 2</div>
          <div className="p-4 bg-gray-200 dark:bg-gray-800">Column 3</div>
        </div>
        
        <div>
          <button className="md:hidden bg-red-500 text-white px-4 py-2 rounded">
            Visible only on mobile (md:hidden)
          </button>
          <button className="hidden md:block bg-green-500 text-white px-4 py-2 rounded">
            Visible only on desktop (hidden md:block)
          </button>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{__html: `
        function updateWidth() {
          const el = document.getElementById('window-width');
          if (el) el.textContent = window.innerWidth + 'px';
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
      `}} />
    </div>
  );
}