# Data Fetching in React Jedi

React Jedi provides a powerful data fetching system that integrates seamlessly with the JSON specification-based rendering. This system supports multiple data sources, caching, transformations, and reactive updates.

## Features

- **REST API Support**: Fetch data from RESTful endpoints
- **GraphQL Support**: Query GraphQL APIs  
- **Static Data**: Use predefined static data
- **WebSocket Support**: Real-time data updates
- **Function Execution**: Custom data fetching logic
- **Caching**: Built-in cache management with TTL
- **Transformations**: Apply transformations to fetched data
- **Retries**: Automatic retry with exponential backoff
- **Deduplication**: Prevent duplicate concurrent requests

## Basic Usage

### Define Data Sources in Specifications

```typescript
const spec = {
  data: [
    {
      id: "users",
      type: "rest",
      config: {
        url: "https://api.example.com/users",
        method: "GET",
      },
    },
  ],
  type: "container",
  children: [
    {
      type: "list",
      props: {
        items: "$data.users",
      },
    },
  ],
};
```

### Data Binding

Bind fetched data to component props using the `$data` prefix:

```typescript
{
  type: "text",
  props: {
    children: "$data.users[0].name",
  },
}
```

### Transformations

Apply transformations to fetched data:

```typescript
{
  id: "users",
  type: "rest",
  config: {
    url: "https://api.example.com/users",
  },
  transforms: [
    {
      type: "map",
      config: {
        expression: "item.name",
      },
    },
    {
      type: "filter",
      config: {
        expression: "item.active",
      },
    },
  ],
}
```

## Advanced Features

### Polling

Enable automatic data refresh:

```typescript
{
  id: "liveData",
  type: "rest",
  config: {
    url: "https://api.example.com/live",
  },
  polling: {
    interval: 30, // seconds
    pauseWhenHidden: true,
  },
}
```

### Caching

Configure cache behavior:

```typescript
{
  id: "cachedData",
  type: "rest",
  config: {
    url: "https://api.example.com/data",
  },
  cache: {
    ttl: 300, // 5 minutes
    staleWhileRevalidate: true,
  },
}
```

### Error Handling

Handle errors gracefully:

```typescript
{
  type: "text",
  props: {
    children: "$data.users || 'Failed to load users'",
  },
}
```

## API Reference

### DataSourceSpecification

```typescript
interface DataSourceSpecification {
  id: string;
  type: "rest" | "graphql" | "static" | "websocket" | "function";
  config: DataSourceConfig;
  cache?: CacheConfig;
  retry?: RetryConfig;
  polling?: PollingConfig;
  transforms?: TransformConfig[];
  dependencies?: string[];
}
```

### DataFetcher Class

The `DataFetcher` class handles all data fetching operations:

```typescript
const fetcher = new DataFetcher({
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000,
  headers: {
    "Authorization": "Bearer token",
  },
});

const result = await fetcher.fetch(dataSourceSpec);
```

### useDataSource Hook

For React components:

```typescript
const { data, loading, error, refetch } = useDataSource(spec);
```

## Examples

See the examples directory for complete implementations:

- Basic REST API fetching
- GraphQL queries  
- Real-time WebSocket connections
- Data transformations
- Error handling patterns