import React from "react";
import { Link } from "react-router-dom";
import { usePageMetadata } from "../../lib/meta";

export const NotFoundPage: React.FC = () => {
  usePageMetadata({
    title: "404 - Page Not Found",
    description: "Page not found - The requested page does not exist.",
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-[180px] sm:text-[240px] font-bold text-white opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-9xl sm:text-[180px] font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">Oops! Page Not Found</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            We looked everywhere for this page, but it seems to have vanished into the digital void.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            to="/showcase/components"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/20 transform transition-all duration-200 hover:scale-105 border border-white/20"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            View Components
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          </div>
          <div className="relative">
            <svg
              className="w-32 h-32 mx-auto text-white/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 14h-2v-4h2m0 8h-2v-2h2m-1-10A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
