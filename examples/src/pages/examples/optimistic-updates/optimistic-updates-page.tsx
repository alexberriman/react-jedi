import { OptimisticUpdateExample } from "../../../../../src/lib/examples/optimistic-update-example";

export function OptimisticUpdatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Optimistic Updates Demo
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Experience instant UI feedback with optimistic updates that sync seamlessly with the server.
        </p>
        
        <OptimisticUpdateExample />
      </div>
    </div>
  );
}