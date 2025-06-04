import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export interface Author {
  name: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  author: Author;
  thumbnail?: string;
  url: string;
  readTime?: string;
  featured?: boolean;
}

export interface LatestNewsProps {
  readonly articles: Article[];
  readonly variant?: 'cards-row' | 'featured-list' | 'minimal-links' | 'with-images' | 'magazine';
  readonly count?: number;
  readonly heading?: string;
  readonly description?: string;
  readonly viewAllUrl?: string;
  readonly showCategoryTabs?: boolean;
  readonly showNewsletter?: boolean;
  readonly newsletterHeading?: string;
  readonly newsletterDescription?: string;
  readonly onNewsletterSubmit?: (email: string) => void;
  readonly loading?: boolean;
  readonly className?: string;
}

export function LatestNews({
  articles,
  variant = 'cards-row',
  count = 3,
  heading,
  description,
  viewAllUrl,
  showCategoryTabs = false,
  showNewsletter = false,
  newsletterHeading = 'Subscribe to our newsletter',
  newsletterDescription = 'Get the latest news delivered to your inbox',
  onNewsletterSubmit,
  loading = false,
  className
}: LatestNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState('');

  // Get unique categories
  const categories = ['all', ...new Set(articles.map(a => a.category))];

  // Filter articles by category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  // Limit articles by count
  const displayArticles = filteredArticles.slice(0, count);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onNewsletterSubmit) {
      onNewsletterSubmit(email);
      setEmail('');
    }
  };

  const renderSkeleton = () => {
    switch (variant) {
      case 'cards-row': {
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      }
      case 'minimal-links': {
        return (
          <div className="space-y-2">
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        );
      }
      default: {
        return (
          <div className="grid gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        );
      }
    }
  };

  const renderArticle = (article: Article, index: number) => {
    switch (variant) {
      case 'cards-row': {
        return (
          <Card key={article.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            {article.thumbnail && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader className={cn("flex-grow", article.thumbnail && "pt-0")}>
              <Badge variant="secondary" className="w-fit mb-2">
                {article.category}
              </Badge>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              {article.excerpt && (
                <CardDescription className="line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              )}
            </CardFooter>
          </Card>
        );
      }

      case 'featured-list': {
        if (index === 0 && article.featured) {
          return (
            <div key={article.id} className="grid gap-6 lg:grid-cols-2 mb-8">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-3">
                  {article.category}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{article.author.name}</span>
                  <span>•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                  {article.readTime && (
                    <>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }
        return (
          <div key={article.id} className="flex gap-4 py-4 border-b last:border-0">
            {article.thumbnail && (
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-grow">
              <Badge variant="outline" className="mb-2">
                {article.category}
              </Badge>
              <h4 className="font-semibold line-clamp-2">{article.title}</h4>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        );
      }

      case 'minimal-links': {
        return (
          <a 
            key={article.id} 
            href={article.url}
            className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/50 transition-colors px-2 -mx-2 rounded"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                {article.category}
              </Badge>
              <h4 className="font-medium line-clamp-1">{article.title}</h4>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{new Date(article.date).toLocaleDateString()}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </a>
        );
      }

      case 'with-images': {
        return (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4 pt-0">
              <Badge variant="secondary" className="mb-2">
                {article.category}
              </Badge>
              <h4 className="font-semibold line-clamp-2 mb-2">{article.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {article.author.avatar && (
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        );
      }

      case 'magazine': {
        if (index === 0 && count > 3) {
          return (
            <Card key={article.id} className="lg:col-span-2 lg:row-span-2 overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-square overflow-hidden">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 pt-0">
                <Badge className="mb-3">
                  {article.category}
                </Badge>
                <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-sm">
                  {article.author.avatar && (
                    <img 
                      src={article.author.avatar} 
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-muted-foreground">
                      {new Date(article.date).toLocaleDateString()} • {article.readTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }
        return (
          <Card key={article.id} className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 pt-0">
              <Badge variant="secondary" className="text-xs mb-2">
                {article.category}
              </Badge>
              <h4 className="font-semibold line-clamp-2">{article.title}</h4>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        );
      }

      default: {
        return null;
      }
    }
  };

  const getGridClassName = () => {
    switch (variant) {
      case 'cards-row': {
        return 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';
      }
      case 'with-images': {
        return count > 3 ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-6 md:grid-cols-3';
      }
      case 'magazine': {
        return 'grid gap-6 lg:grid-cols-3';
      }
      default: {
        return '';
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {heading && <h2 className="text-3xl font-bold">{heading}</h2>}
          {viewAllUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a href={viewAllUrl}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Category Tabs */}
      {showCategoryTabs && !loading && articles.length > 0 && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category === 'all' ? 'All' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Articles */}
      {loading ? (
        renderSkeleton()
      ) : (
        <div className={getGridClassName()}>
          {displayArticles.map((article, index) => renderArticle(article, index))}
        </div>
      )}

      {/* Newsletter */}
      {showNewsletter && (
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">{newsletterHeading}</h3>
            <p className="text-muted-foreground mb-6">{newsletterDescription}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}