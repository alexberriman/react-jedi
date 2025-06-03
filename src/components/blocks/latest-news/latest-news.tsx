import React, { useState, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Calendar, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Skeleton } from '../../ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Input } from '../../ui/input';

export interface Article {
  readonly id: string;
  readonly title: string;
  readonly excerpt?: string;
  readonly category?: string;
  readonly date: string;
  readonly author?: {
    readonly name: string;
    readonly avatar?: string;
  };
  readonly thumbnail?: string;
  readonly url: string;
  readonly readTime?: string;
  readonly featured?: boolean;
}

export interface LatestNewsProperties {
  /** Articles to display */
  readonly articles: Article[];
  /** Display variant */
  readonly variant?: 'featured-list' | 'cards-row' | 'minimal-links' | 'with-images' | 'magazine';
  /** Number of articles to show (3-6) */
  readonly count?: number;
  /** Show category tabs for filtering */
  readonly showCategoryTabs?: boolean;
  /** Categories for tabs (auto-detected if not provided) */
  readonly categories?: string[];
  /** Show newsletter signup */
  readonly showNewsletter?: boolean;
  /** Newsletter heading */
  readonly newsletterHeading?: string;
  /** Newsletter description */
  readonly newsletterDescription?: string;
  /** View all link */
  readonly viewAllUrl?: string;
  /** View all text */
  readonly viewAllText?: string;
  /** Loading state */
  readonly loading?: boolean;
  /** Section heading */
  readonly heading?: string;
  /** Section description */
  readonly description?: string;
  /** Additional CSS classes */
  readonly className?: string;
  /** Newsletter submit handler */
  readonly onNewsletterSubmit?: (email: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function ArticleSkeleton({ variant }: { readonly variant: string }) {
  if (variant === 'minimal-links') {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

function NewsletterSignup({ 
  heading = "Stay Updated",
  description = "Get the latest news delivered to your inbox",
  onSubmit
}: {
  readonly heading?: string;
  readonly description?: string;
  readonly onSubmit?: (email: string) => void;
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onSubmit) {
      onSubmit(email);
      setEmail('');
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">{heading}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}

export function LatestNews({
  articles,
  variant = 'cards-row',
  count = 3,
  showCategoryTabs = false,
  categories,
  showNewsletter = false,
  newsletterHeading,
  newsletterDescription,
  viewAllUrl,
  viewAllText = 'View All Articles',
  loading = false,
  heading = 'Latest News',
  description,
  className,
  onNewsletterSubmit,
  ...properties
}: LatestNewsProperties) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Auto-detect categories if not provided
  const detectedCategories = useMemo(() => {
    if (categories) return categories;
    const cats = new Set(articles.map(a => a.category).filter(Boolean));
    return [...cats] as string[];
  }, [articles, categories]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles.slice(0, count);
    return articles
      .filter(article => article.category === selectedCategory)
      .slice(0, count);
  }, [articles, selectedCategory, count]);

  // Featured article for featured-list variant
  const featuredArticle = variant === 'featured-list' ? filteredArticles[0] : null;
  const listArticles = variant === 'featured-list' ? filteredArticles.slice(1) : filteredArticles;

  if (loading) {
    return (
      <section className={cn("space-y-6", className)} {...properties}>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            {description && <Skeleton className="h-4 w-64" />}
          </div>
        </div>
        <div className={cn(
          "grid gap-6",
          variant === 'cards-row' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          variant === 'magazine' && "grid-cols-1 lg:grid-cols-3"
        )}>
          {Array.from({ length: count }).map((_, i) => (
            <ArticleSkeleton key={i} variant={variant} />
          ))}
        </div>
      </section>
    );
  }

  const renderArticle = (article: Article, index: number) => {
    switch (variant) {
      case 'minimal-links': {
        return (
          <a
            key={article.id}
            href={article.url}
            className="group block space-y-1 p-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <time>{formatDate(article.date)}</time>
              {article.category && (
                <>
                  <span>•</span>
                  <span>{article.category}</span>
                </>
              )}
            </div>
          </a>
        );
      }

      case 'with-images': {
        return (
          <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <a href={article.url} className="block">
              {article.thumbnail && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-4 space-y-3">
                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <time>{formatDate(article.date)}</time>
                  {article.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </a>
          </Card>
        );
      }

      case 'magazine': {
        return (
          <article key={article.id} className={cn(
            "group",
            index === 0 && "lg:col-span-2 lg:row-span-2"
          )}>
            <a href={article.url} className="block space-y-3">
              {article.thumbnail && (
                <div className={cn(
                  "aspect-[16/9] overflow-hidden rounded-lg",
                  index === 0 && "lg:aspect-[2/1]"
                )}>
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="space-y-2">
                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
                <h3 className={cn(
                  "font-semibold line-clamp-2 group-hover:text-primary transition-colors",
                  index === 0 && "text-xl lg:text-2xl"
                )}>
                  {article.title}
                </h3>
                {(index === 0 || article.excerpt) && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {article.author && (
                    <div className="flex items-center gap-2">
                      {article.author.avatar && (
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={article.author.avatar} alt={article.author.name} />
                          <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <span>{article.author.name}</span>
                    </div>
                  )}
                  <time>{formatDate(article.date)}</time>
                </div>
              </div>
            </a>
          </article>
        );
      }

      default: { // cards-row
        return (
          <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <a href={article.url} className="block">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  {article.category && (
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                  )}
                  <time className="text-xs text-muted-foreground">
                    {formatDate(article.date)}
                  </time>
                </div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                {article.author && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {article.author.avatar && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={article.author.avatar} alt={article.author.name} />
                        <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <span>By {article.author.name}</span>
                  </div>
                )}
              </CardContent>
            </a>
          </Card>
        );
      }
    }
  };

  const content = (
    <>
      {variant === 'featured-list' && featuredArticle && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <a href={featuredArticle.url} className="group">
            {featuredArticle.thumbnail && (
              <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                <img
                  src={featuredArticle.thumbnail}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="space-y-3">
              {featuredArticle.category && (
                <Badge variant="default">{featuredArticle.category}</Badge>
              )}
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {featuredArticle.title}
              </h3>
              {featuredArticle.excerpt && (
                <p className="text-muted-foreground line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {featuredArticle.author && (
                  <div className="flex items-center gap-2">
                    {featuredArticle.author.avatar && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={featuredArticle.author.avatar} alt={featuredArticle.author.name} />
                        <AvatarFallback>{featuredArticle.author.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <span>{featuredArticle.author.name}</span>
                  </div>
                )}
                <time>{formatDate(featuredArticle.date)}</time>
                {featuredArticle.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                )}
              </div>
            </div>
          </a>
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              More Articles
            </h4>
            {listArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                className="group flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h5>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <time>{formatDate(article.date)}</time>
                    {article.category && (
                      <>
                        <span>•</span>
                        <span>{article.category}</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {variant !== 'featured-list' && (
        <div className={cn(
          "grid gap-6",
          variant === 'cards-row' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          variant === 'minimal-links' && "grid-cols-1 md:grid-cols-2",
          variant === 'with-images' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          variant === 'magazine' && "grid-cols-1 lg:grid-cols-3"
        )}>
          {listArticles.map((article, index) => renderArticle(article, index))}
        </div>
      )}
    </>
  );

  return (
    <section className={cn("space-y-6", className)} {...properties}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{heading}</h2>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {viewAllUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={viewAllUrl} className="group">
              {viewAllText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        )}
      </div>

      {showCategoryTabs && detectedCategories.length > 0 ? (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {detectedCategories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={selectedCategory} className="mt-6">
            {content}
          </TabsContent>
        </Tabs>
      ) : (
        content
      )}

      {showNewsletter && (
        <NewsletterSignup
          heading={newsletterHeading}
          description={newsletterDescription}
          onSubmit={onNewsletterSubmit}
        />
      )}
    </section>
  );
}