import React from "react";
import { useDataSource, DataFetcher } from "../data/data-fetcher";
import { createStateManager } from "../state/state-management";
import type { DataSourceSpecification } from "../../types/schema/specification";

/**
 * Example: Basic REST API data fetching
 */
export function BasicDataFetchingExample() {
  const dataSource: DataSourceSpecification = {
    id: "users",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    },
    cache: {
      ttl: 300, // Cache for 5 minutes
    },
  };

  const { data, loading, error, refetch } = useDataSource(dataSource);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {Array.isArray(data) &&
          data.map((user: unknown) => {
            if (typeof user === "object" && user !== null && "id" in user && "name" in user) {
              const typedUser = user as { id: string; name: string };
              return <li key={typedUser.id}>{typedUser.name}</li>;
            }
            return null;
          })}
      </ul>
    </div>
  );
}

/**
 * Example: Data fetching with state integration
 */
export function StateIntegratedDataFetchingExample() {
  const stateManager = createStateManager({
    initialState: {
      userId: 1,
      postLimit: 5,
    },
  });

  const dataSource: DataSourceSpecification = {
    id: "user-posts",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/posts?userId={userId}&_limit={postLimit}",
      method: "GET",
    },
    cache: {
      ttl: 60,
      staleWhileRevalidate: 120,
    },
  };

  const { data, loading, error } = useDataSource(dataSource, {
    stateManager,
    dependencies: ["userId", "postLimit"],
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    stateManager.setState({ userId: Number.parseInt(e.target.value) });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    stateManager.setState({ postLimit: Number.parseInt(e.target.value) });
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User Posts</h2>
      <div>
        <label>
          User:
          <select onChange={handleUserChange}>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Limit:
          <select onChange={handleLimitChange}>
            {[5, 10, 20].map((limit) => (
              <option key={limit} value={limit}>
                {limit} posts
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul>
        {Array.isArray(data) &&
          data.map((post: unknown) => {
            if (
              typeof post === "object" &&
              post !== null &&
              "id" in post &&
              "title" in post &&
              "body" in post
            ) {
              const typedPost = post as { id: string; title: string; body: string };
              return (
                <li key={typedPost.id}>
                  <strong>{typedPost.title}</strong>
                  <p>{typedPost.body}</p>
                </li>
              );
            }
            return null;
          })}
      </ul>
    </div>
  );
}

/**
 * Example: Data transformation
 */
export function DataTransformationExample() {
  const dataSource: DataSourceSpecification = {
    id: "filtered-users",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    },
    transforms: [
      {
        type: "filter",
        config: {
          condition: "item.address.city === 'New York'", // This is a simplified example
        },
      },
      {
        type: "map",
        config: {
          expression: "item.name", // This is a simplified example
        },
      },
      {
        type: "sort",
        config: {
          field: "name",
          order: "asc",
        },
      },
    ],
  };

  const { data, loading, error } = useDataSource(dataSource);

  if (loading) return <div>Loading New York users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>New York Users (Sorted)</h2>
      <ul>
        {(data as string[])?.map((name: string, index: number) => <li key={index}>{name}</li>)}
      </ul>
    </div>
  );
}

/**
 * Example: Polling data
 */
export function PollingDataExample() {
  const dataSource: DataSourceSpecification = {
    id: "live-comments",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/comments?_limit=5",
      method: "GET",
    },
    polling: {
      interval: 30, // Poll every 30 seconds
      pauseWhenHidden: true,
    },
  };

  const { data, loading, error } = useDataSource(dataSource);

  if (loading && !data) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Live Comments (Updates every 30s)</h2>
      {loading && data !== null && <div>Refreshing...</div>}
      <ul>
        {(() => {
          if (Array.isArray(data)) {
            return data.map((comment: unknown) => {
              if (
                typeof comment === "object" &&
                comment !== null &&
                "id" in comment &&
                "email" in comment &&
                "body" in comment
              ) {
                const typedComment = comment as { id: string; email: string; body: string };
                return (
                  <li key={typedComment.id}>
                    <strong>{typedComment.email}</strong>: {typedComment.body}
                  </li>
                );
              }
              return null;
            });
          }
          return null;
        })()}
      </ul>
    </div>
  );
}

/**
 * Example: Direct DataFetcher usage (non-React)
 */
export async function directFetcherExample() {
  const fetcher = new DataFetcher({
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 10_000,
  });

  const dataSource: DataSourceSpecification = {
    id: "todos",
    type: "rest",
    config: {
      url: "https://jsonplaceholder.typicode.com/todos?userId=1",
      method: "GET",
    },
    cache: {
      ttl: 120,
    },
  };

  const result = await fetcher.fetch(dataSource);

  if (result.ok) {
    console.log("Todos:", result.val);
  } else {
    console.error("Error fetching todos:", result.val.message);
  }
}

/**
 * Example: GraphQL data fetching (simulated)
 */
export function GraphQLDataExample() {
  const dataSource: DataSourceSpecification = {
    id: "graphql-user",
    type: "graphql",
    config: {
      url: "https://api.example.com/graphql",
      query: `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
            posts {
              title
              createdAt
            }
          }
        }
      `,
      variables: {
        id: "{userId}",
      },
    },
  };

  // Note: This is a simulated example as jsonplaceholder doesn't support GraphQL
  const { data, loading, error } = useDataSource(dataSource, {
    stateManager: createStateManager({ initialState: { userId: "1" } }),
    dependencies: ["userId"],
  });

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>GraphQL User Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

/**
 * Example: Static data source
 */
export function StaticDataExample() {
  const dataSource: DataSourceSpecification = {
    id: "app-config",
    type: "static",
    config: {
      data: {
        appName: "React Jedi Example",
        version: "1.0.0",
        features: {
          darkMode: true,
          animations: true,
          analytics: false,
        },
        navigation: [
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
          { label: "Contact", path: "/contact" },
        ],
      },
    },
  };

  const { data } = useDataSource(dataSource);

  return (
    <div>
      <h2>App Configuration</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

/**
 * Example: Error handling and retry
 */
export function ErrorHandlingExample() {
  const dataSource: DataSourceSpecification = {
    id: "unreliable-api",
    type: "rest",
    config: {
      url: "https://api.example.com/unreliable", // This will fail
      method: "GET",
    },
  };

  const { data, loading, error, refetch } = useDataSource(dataSource, {
    fetcherOptions: {
      maxRetries: 2,
      retryDelay: 500,
    },
  });

  if (loading) return <div>Attempting to fetch data...</div>;

  if (error) {
    return (
      <div>
        <h3>Error occurred:</h3>
        <p>{error.message}</p>
        <p>Source: {error.source}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
