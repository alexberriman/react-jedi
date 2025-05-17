import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useDataSource } from "./data-fetcher";
import { createStateManager, useStateValue } from "../state/state-management";
import type { DataSourceSpecification } from "../../types/schema/specification";

// Example component that uses data fetching
const DataFetcherExample: React.FC<{
  dataSource: DataSourceSpecification;
  showRawData?: boolean;
}> = ({ dataSource, showRawData = false }) => {
  const { data, loading, error, refetch } = useDataSource(dataSource);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-red-800 font-semibold">Error</h3>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded">
      <div className="mb-4">
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      {showRawData ? (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div>
          {Array.isArray(data) ? (
            <ul className="space-y-2">
              {data.slice(0, 5).map((item: unknown, index) => (
                <li key={index} className="p-2 bg-gray-50 rounded">
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p>{JSON.stringify(data)}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Component with state integration
const StateIntegratedExample: React.FC = () => {
  const stateManager = React.useMemo(
    () =>
      createStateManager({
        initialState: {
          userId: 1,
          limit: 5,
        },
      }),
    []
  );

  const [userId, setUserId] = useStateValue(stateManager, "userId");
  const [limit, setLimit] = useStateValue(stateManager, "limit");

  const dataSource: DataSourceSpecification = {
    id: "user-posts",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/posts?userId={userId}&_limit={limit}",
      method: "GET",
    },
    cache: {
      ttl: 60,
    },
  };

  const { data, loading, error } = useDataSource(dataSource, {
    stateManager,
    dependencies: ["userId", "limit"],
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 p-4 bg-gray-100 rounded">
        <label>
          User ID:
          <select
            value={userId as number}
            onChange={(e) => setUserId(Number.parseInt(e.target.value))}
            className="ml-2 px-2 py-1 border rounded"
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Limit:
          <select
            value={limit as number}
            onChange={(e) => setLimit(Number.parseInt(e.target.value))}
            className="ml-2 px-2 py-1 border rounded"
          >
            {[5, 10, 15, 20].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error.message}</p>
        </div>
      )}

      {data && (
        <div className="space-y-2">
          {(data as unknown[]).map((post: unknown & { id: string; title: string; body: string }) => (
            <div key={post.id} className="p-3 bg-white border rounded">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const meta: Meta = {
  title: "Core/DataFetcher",
  parameters: {
    docs: {
      description: {
        component:
          "The DataFetcher provides a powerful system for fetching data from various sources with caching, retry logic, and transformations.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataFetcherExample>;

export const RestAPI: Story = {
  render: () => (
    <DataFetcherExample
      dataSource={{
        id: "users",
        type: "rest",
        config: {
          url: "https://jsonplaceholder.typicode.com/users",
          method: "GET",
        },
        cache: {
          ttl: 300,
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic REST API data fetching with caching.",
      },
    },
  },
};

export const WithTransformations: Story = {
  render: () => (
    <DataFetcherExample
      dataSource={{
        id: "filtered-posts",
        type: "rest",
        config: {
          url: "https://jsonplaceholder.typicode.com/posts",
          method: "GET",
        },
        transforms: [
          {
            type: "slice",
            config: {
              start: 0,
              end: 10,
            },
          },
          {
            type: "map",
            config: {
              expression: "item.title",
            },
          },
        ],
      }}
      showRawData
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Data fetching with transformations applied to the response.",
      },
    },
  },
};

export const StaticData: Story = {
  render: () => (
    <DataFetcherExample
      dataSource={{
        id: "config",
        type: "static",
        config: {
          data: {
            appName: "React Jedi",
            version: "1.0.0",
            features: {
              darkMode: true,
              animations: true,
            },
          },
        },
      }}
      showRawData
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Static data source for configuration or mock data.",
      },
    },
  },
};

export const ErrorHandling: Story = {
  render: () => (
    <DataFetcherExample
      dataSource={{
        id: "error-example",
        type: "rest",
        config: {
          url: "https://invalid-url-that-will-fail.com/api",
          method: "GET",
        },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing error handling and retry functionality.",
      },
    },
  },
};

export const StateIntegration: Story = {
  render: () => <StateIntegratedExample />,
  parameters: {
    docs: {
      description: {
        story:
          "Data fetching integrated with the state management system. The data refetches automatically when state dependencies change.",
      },
    },
  },
};

export const Polling: Story = {
  render: () => (
    <div>
      <p className="mb-4 text-gray-600">
        This data source polls every 10 seconds for updates.
      </p>
      <DataFetcherExample
        dataSource={{
          id: "polling-comments",
          type: "rest",
          config: {
            url: "https://jsonplaceholder.typicode.com/comments?_limit=5",
            method: "GET",
          },
          polling: {
            interval: 10,
            pauseWhenHidden: true,
          },
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example with polling enabled. The data refreshes automatically at the specified interval.",
      },
    },
  },
};

export const CacheWithStaleWhileRevalidate: Story = {
  render: () => (
    <div>
      <p className="mb-4 text-gray-600">
        This example uses stale-while-revalidate caching. The cached data is
        served immediately while fresh data is fetched in the background.
      </p>
      <DataFetcherExample
        dataSource={{
          id: "swr-todos",
          type: "rest",
          config: {
            url: "https://jsonplaceholder.typicode.com/todos?_limit=5",
            method: "GET",
          },
          cache: {
            ttl: 5, // Short TTL for demo
            staleWhileRevalidate: 60,
          },
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates stale-while-revalidate caching strategy for improved perceived performance.",
      },
    },
  },
};