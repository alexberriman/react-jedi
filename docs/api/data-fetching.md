# Data Fetching API

The React Jedi library includes a powerful data fetching system that integrates with the Server-Driven UI architecture. This system handles different data source types, implements caching, retry logic, and provides a React hook for easy integration.

## Overview

The data fetching system supports:

- Multiple data source types (REST, GraphQL, static, WebSocket, function)
- Request caching with TTL and stale-while-revalidate
- Automatic retry with exponential backoff
- Request deduplication
- Data transformations
- Polling support
- React hook integration with the state system

## Core Components

### DataFetcher Class

The `DataFetcher` class is the core of the data fetching system. It handles fetching data from various sources and applying transformations.

```typescript
const fetcher = new DataFetcher({
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 30000,
  headers: {
    'Authorization': 'Bearer token'
  }
});

const result = await fetcher.fetch(dataSourceSpec);
```

### useDataSource Hook

The `useDataSource` hook provides React integration:

```typescript
function MyComponent() {
  const { data, loading, error, refetch } = useDataSource(dataSourceSpec, {
    stateManager,
    dependencies: ['userId'],
    enabled: true
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

## Data Source Types

### REST API

```json
{
  "id": "users",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/users/{userId}",
    "method": "GET",
    "headers": {
      "Accept": "application/json"
    },
    "params": {
      "active": "true"
    }
  },
  "cache": {
    "ttl": 300,
    "staleWhileRevalidate": 600
  }
}
```

### GraphQL

```json
{
  "id": "user-data",
  "type": "graphql",
  "config": {
    "url": "https://api.example.com/graphql",
    "query": "query GetUser($id: ID!) { user(id: $id) { name email } }",
    "variables": {
      "id": "{userId}"
    }
  }
}
```

### Static Data

```json
{
  "id": "static-config",
  "type": "static",
  "config": {
    "data": {
      "settings": {
        "theme": "dark",
        "language": "en"
      }
    }
  }
}
```

## Data Transformations

Transform the fetched data before it's returned:

```json
{
  "id": "users",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/users"
  },
  "transforms": [
    {
      "type": "filter",
      "config": {
        "condition": "item.age > 18"
      }
    },
    {
      "type": "sort",
      "config": {
        "field": "name",
        "order": "asc"
      }
    },
    {
      "type": "slice",
      "config": {
        "start": 0,
        "end": 10
      }
    }
  ]
}
```

## Caching

Configure caching behavior:

```json
{
  "id": "cached-data",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/data"
  },
  "cache": {
    "ttl": 300,  // Time to live in seconds
    "staleWhileRevalidate": 600  // Serve stale data while revalidating
  }
}
```

## Polling

Enable automatic data refresh:

```json
{
  "id": "live-data",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/live"
  },
  "polling": {
    "interval": 30,  // Refresh every 30 seconds
    "pauseWhenHidden": true  // Pause when tab is not visible
  }
}
```

## Error Handling

The system uses functional error handling with `Result` types:

```typescript
const result = await fetcher.fetch(spec);

if (result.ok) {
  console.log('Data:', result.val);
} else {
  console.error('Error:', result.val.message);
}
```

## Integration with State System

The `useDataSource` hook integrates with the React Jedi state system:

```typescript
const { data } = useDataSource(spec, {
  stateManager,
  dependencies: ['userId', 'filters'],  // Refetch when these state values change
});
```

## Cache Management

Manage the cache programmatically:

```typescript
import { cacheManager } from '@react-jedi/core';

// Clear all cache
cacheManager.clearCache();

// Remove specific entry
cacheManager.evictEntry(cacheKey);

// Get cache statistics
const size = cacheManager.getCacheSize();

// Purge expired entries
const purged = cacheManager.purgeExpired();
```

## Request Deduplication

The system automatically deduplicates concurrent requests to the same resource:

```typescript
// These will share the same network request
const promise1 = fetcher.fetch(spec);
const promise2 = fetcher.fetch(spec);
const promise3 = fetcher.fetch(spec);

const results = await Promise.all([promise1, promise2, promise3]);
```

## Best Practices

1. **Configure appropriate cache TTL**: Balance freshness with performance
2. **Use stale-while-revalidate**: Improve perceived performance
3. **Enable polling judiciously**: Consider server load and battery usage
4. **Transform data at the source**: Use transformations to reduce data size
5. **Handle errors gracefully**: Always check the Result before using data
6. **Use dependencies wisely**: Only refetch when necessary
7. **Implement proper loading states**: Show skeletons or spinners

## Example: Complete Data Source

```json
{
  "id": "user-posts",
  "type": "rest",
  "config": {
    "url": "https://api.example.com/users/{userId}/posts",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer {token}"
    },
    "params": {
      "limit": "10",
      "sort": "created_at"
    }
  },
  "cache": {
    "ttl": 60,
    "staleWhileRevalidate": 300
  },
  "transforms": [
    {
      "type": "filter",
      "config": {
        "condition": "item.published === true"
      }
    },
    {
      "type": "map",
      "config": {
        "expression": "{ id: item.id, title: item.title, excerpt: item.excerpt }"
      }
    },
    {
      "type": "sort",
      "config": {
        "field": "created_at",
        "order": "desc"
      }
    }
  ],
  "polling": {
    "interval": 60,
    "pauseWhenHidden": true
  }
}
```

## TypeScript Types

```typescript
interface DataFetcherOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  headers?: Record<string, string>;
}

interface DataFetcherResponse<T = unknown> {
  data: T | null;
  loading: boolean;
  error: DataFetchError | null;
  refetch: () => void;
}

interface CacheConfig {
  ttl: number;
  staleWhileRevalidate?: number;
}

interface PollingConfig {
  interval: number;
  pauseWhenHidden?: boolean;
}
```