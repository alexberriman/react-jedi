import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Search, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage?: string;
  category: string;
  tags?: string[];
  author: Author;
  publishDate: string;
  readTime: number;
  isFeatured?: boolean;
  slug: string;
}

export interface BlogPostGridProperties {
  posts: BlogPost[];
  variant?: 'cards' | 'minimal' | 'magazine' | 'with-sidebar' | 'masonry';
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  showLoadMore?: boolean;
  postsPerPage?: number;
  sortOptions?: Array<{ label: string; value: 'date-desc' | 'date-asc' | 'popularity' }>;
  categories?: string[];
  onLoadMore?: () => void;
  loading?: boolean;
  featuredPostIds?: string[];
  className?: string;
  sidebarContent?: React.ReactNode;
}

function BlogPostCard({ post, className }: { readonly post: BlogPost; readonly className?: string }) {
  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="font-normal">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} min read
          </span>
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-muted-foreground">
                {format(new Date(post.publishDate), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          {post.isFeatured && (
            <Badge variant="default">Featured</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function BlogPostListItem({ post }: { readonly post: BlogPost }) {
  return (
    <div className="flex gap-4 p-4 border-b last:border-0 hover:bg-muted/50 transition-colors">
      {post.featuredImage && (
        <div className="hidden sm:block h-24 w-32 flex-shrink-0 overflow-hidden rounded-md">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="font-normal">
            {post.category}
          </Badge>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.publishDate), 'MMM d, yyyy')}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} min read
          </span>
          {post.isFeatured && <Badge variant="default">Featured</Badge>}
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-3 w-3" />
          <span>{post.author.name}</span>
        </div>
      </div>
    </div>
  );
}

function BlogPostMagazineCard({ post, isLarge = false }: { readonly post: BlogPost; readonly isLarge?: boolean }) {
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-lg',
      isLarge ? 'col-span-2 row-span-2' : ''
    )}>
      {post.featuredImage && (
        <div className={cn(
          'overflow-hidden',
          isLarge ? 'aspect-[16/10]' : 'aspect-video'
        )}>
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 p-6 text-white',
        isLarge ? 'p-8' : 'p-4'
      )}>
        <Badge variant="secondary" className="mb-2">
          {post.category}
        </Badge>
        <h3 className={cn(
          'font-bold mb-2',
          isLarge ? 'text-3xl' : 'text-xl',
          'line-clamp-2'
        )}>
          {post.title}
        </h3>
        {isLarge && (
          <p className="text-sm text-white/80 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-white/80">
          <span>{post.author.name}</span>
          <span>•</span>
          <span>{format(new Date(post.publishDate), 'MMM d, yyyy')}</span>
          {post.isFeatured && (
            <>
              <span>•</span>
              <Badge variant="default" className="bg-white text-black">Featured</Badge>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogPostSkeleton({ variant }: { readonly variant: BlogPostGridProperties['variant'] }) {
  if (variant === 'minimal') {
    return (
      <div className="flex gap-4 p-4">
        <Skeleton className="hidden sm:block h-24 w-32 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogPostGrid({
  posts,
  variant = 'cards',
  showFilters = true,
  showSearch = true,
  showPagination = true,
  showLoadMore = false,
  postsPerPage = 9,
  sortOptions = [
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' },
    { label: 'Most Popular', value: 'popularity' }
  ],
  categories = [],
  onLoadMore,
  loading = false,
  featuredPostIds = [],
  className,
  sidebarContent,
  ...properties
}: BlogPostGridProperties) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories from posts if not provided
  const allCategories = useMemo(() => {
    if (categories.length > 0) return categories;
    const uniqueCategories = [...new Set(posts.map(post => post.category))];
    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [posts, categories]);

  // Mark featured posts
  const postsWithFeatured = useMemo(() => {
    return posts.map(post => ({
      ...post,
      isFeatured: featuredPostIds.includes(post.id) || post.isFeatured
    }));
  }, [posts, featuredPostIds]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = postsWithFeatured;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date-asc': {
        sorted.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
        break;
      }
      case 'date-desc': {
        sorted.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
      }
      case 'popularity': {
        // For demo, featured posts are considered more popular
        sorted.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        });
        break;
      }
    }

    return sorted;
  }, [postsWithFeatured, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    if (!showPagination && !showLoadMore) return filteredAndSortedPosts;
    
    const start = (currentPage - 1) * postsPerPage;
    const end = showLoadMore ? currentPage * postsPerPage : start + postsPerPage;
    return filteredAndSortedPosts.slice(0, end);
  }, [filteredAndSortedPosts, currentPage, postsPerPage, showPagination, showLoadMore]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const renderPosts = (): React.ReactNode => {
    if (loading) {
      return Array.from({ length: postsPerPage }).map((_, index) => (
        <BlogPostSkeleton key={index} variant={variant} />
      ));
    }

    if (paginatedPosts.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No posts found matching your criteria.</p>
        </div>
      );
    }

    switch (variant) {
      case 'minimal': {
        return [
          <div key="minimal-list" className="col-span-full border rounded-lg overflow-hidden">
            {paginatedPosts.map(post => (
              <BlogPostListItem key={post.id} post={post} />
            ))}
          </div>
        ];
      }

      case 'magazine': {
        return paginatedPosts.map((post, index) => (
          <BlogPostMagazineCard 
            key={post.id} 
            post={post} 
            isLarge={index === 0}
          />
        ));
      }

      case 'masonry': {
        return paginatedPosts.map((post, index) => (
          <div 
            key={post.id}
            className={cn(
              index % 3 === 0 ? 'lg:row-span-2' : '',
              'break-inside-avoid'
            )}
          >
            <BlogPostCard post={post} />
          </div>
        ));
      }

      default: {
        return paginatedPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ));
      }
    }
  };

  let gridColumns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  if (variant === 'minimal') {
    gridColumns = 'grid-cols-1';
  } else if (variant === 'masonry') {
    gridColumns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto';
  }
  
  const gridClass = cn('grid gap-6', gridColumns);

  const content = (
    <>
      {(showFilters || showSearch) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          {showFilters && (
            <>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      )}

      <div className={gridClass}>
        {renderPosts()}
      </div>

      {showPagination && totalPages > 1 && !showLoadMore && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {showLoadMore && currentPage * postsPerPage < filteredAndSortedPosts.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              onLoadMore?.();
            }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );

  if (variant === 'with-sidebar' && sidebarContent) {
    return (
      <div className={cn('grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8', className)} {...properties}>
        <div>{content}</div>
        <aside className="space-y-6">
          {sidebarContent}
        </aside>
      </div>
    );
  }

  return (
    <div className={cn('', className)} {...properties}>
      {content}
    </div>
  );
}