import React from "react";

export const ThemingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 mb-16">
            <div className="relative w-fit">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mb-2">
                Theme System
              </h1>
              <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full blur-sm" />
              <div className="absolute -bottom-4 left-0 w-1/3 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full" />
            </div>
            <p className="text-xl text-zinc-300 max-w-3xl">
              Explore React Jedi's powerful theming capabilities with dynamic theme switching, custom color palettes, and real-time preview.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Theme Examples Coming Soon</h2>
            <p className="text-zinc-400 mb-4">
              This page will showcase dynamic theme switching, custom color schemes, and theme inheritance patterns.
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Multiple theme presets (Default, Dark, Vibrant, Minimal, Corporate)</li>
              <li>Real-time theme switching with preview</li>
              <li>Custom color picker for primary, secondary, and accent colors</li>
              <li>Typography scale demonstrations</li>
              <li>Component variants with different themes</li>
              <li>Border radius and shadow system examples</li>
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-white">Default Theme</h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-blue-500" title="Primary" />
                <div className="w-8 h-8 rounded bg-green-500" title="Secondary" />
                <div className="w-8 h-8 rounded bg-amber-500" title="Accent" />
              </div>
              <p className="text-sm text-zinc-400">Clean and professional look with balanced colors.</p>
            </div>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-white">Dark Theme</h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-blue-400" title="Primary" />
                <div className="w-8 h-8 rounded bg-green-400" title="Secondary" />
                <div className="w-8 h-8 rounded bg-yellow-400" title="Accent" />
              </div>
              <p className="text-sm text-zinc-400">Modern dark mode with adjusted color brightness.</p>
            </div>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-lg font-bold mb-3 text-white">Vibrant Theme</h3>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded bg-pink-500" title="Primary" />
                <div className="w-8 h-8 rounded bg-purple-500" title="Secondary" />
                <div className="w-8 h-8 rounded bg-cyan-500" title="Accent" />
              </div>
              <p className="text-sm text-zinc-400">Bold and energetic with vivid color choices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};