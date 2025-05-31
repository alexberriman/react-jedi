import { render } from "@banja/react-jedi";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import dataFetchingSpecification from "@/schemas/data-fetching-example.json";

export function DataFetchingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Data Fetching Example</h1>
        <p className="text-muted-foreground">
          This example demonstrates how to fetch and bind data using React Jedi&apos;s data source
          integration. Data is fetched from JSONPlaceholder API and bound to components using the
          $data syntax.
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Live Example</h2>
        <div className="border rounded-lg p-4">{render(dataFetchingSpecification)}</div>
      </Card>

      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">Features Demonstrated</h2>
        <ul className="space-y-2">
          <li>• REST API data fetching with caching</li>
          <li>• Static data sources</li>
          <li>• Data binding using $data expressions</li>
          <li>• Conditional rendering based on data availability</li>
          <li>• Polling for automatic updates</li>
          <li>• Dynamic list rendering with map expressions</li>
        </ul>
      </Card>

      <Card className="mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">JSON Specification</h2>
        <CodeBlock language="json">
          {JSON.stringify(dataFetchingSpecification, null, 2)}
        </CodeBlock>
      </Card>
    </div>
  );
}
