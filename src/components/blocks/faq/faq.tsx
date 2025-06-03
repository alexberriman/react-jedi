/**
 * FAQ Block Component
 *
 * A comprehensive FAQ component with multiple variants and advanced features:
 * - Accordion, grid cards, two-column, categorized, and search variants
 * - Search functionality with highlighting
 * - Category filtering
 * - Voting system for helpful/not helpful
 * - Smooth animations and transitions
 * - Mobile-optimized layouts
 * - Anchor link support
 * - Contact support CTA
 * - Related articles
 */

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  ExternalLink,
  Hash
} from "lucide-react";
import type { ComponentProps as ReactJediComponentProps } from "../../../types/schema/components";
import type { FAQDef, FAQItem, FAQCategory } from "../../../types/components/faq";
import type { ComponentChildren } from "../../../types/schema/base";
import { render } from "../../../lib/render";
import { isComponentSpec } from "../../../types/schema/guards";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

interface FAQBlockProps extends ReactJediComponentProps {
  readonly spec: FAQDef;
}

// Search functionality hook
function useSearch(items: FAQItem[], searchInAnswers = false) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = items.filter(item => {
      const questionMatch = item.question.toLowerCase().includes(query);
      const answerMatch = searchInAnswers && 
        typeof item.answer === "string" && 
        item.answer.toLowerCase().includes(query);
      const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(query));
      
      return questionMatch || answerMatch || tagsMatch;
    });

    setFilteredItems(filtered);
  }, [searchQuery, items, searchInAnswers]);

  return { searchQuery, setSearchQuery, filteredItems };
}

// Category filtering hook
function useCategoryFilter(items: FAQItem[], categories: FAQCategory[]) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item => item.category === selectedCategory);
    setFilteredItems(filtered);
  }, [selectedCategory, items]);

  return { selectedCategory, setSelectedCategory, filteredItems };
}

// Voting functionality hook
function useVoting() {
  const [votes, setVotes] = React.useState<Record<string, { helpful: number; notHelpful: number }>>({});

  const handleVote = React.useCallback((itemId: string, helpful: boolean) => {
    setVotes(prev => ({
      ...prev,
      [itemId]: {
        helpful: helpful ? (prev[itemId]?.helpful || 0) + 1 : (prev[itemId]?.helpful || 0),
        notHelpful: helpful ? (prev[itemId]?.notHelpful || 0) : (prev[itemId]?.notHelpful || 0) + 1,
      }
    }));
  }, []);

  return { votes, handleVote };
}

// Search component
function FAQSearch({ 
  value, 
  onChange, 
  placeholder = "Search FAQs...",
  className 
}: {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

// Category filter component
function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className
}: {
  readonly categories: FAQCategory[];
  readonly selectedCategory: string;
  readonly onCategoryChange: (category: string) => void;
  readonly className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
          {category.count && (
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}

// FAQ Item voting component
function FAQVoting({
  item,
  votes,
  onVote,
  showVoteCount = false
}: {
  readonly item: FAQItem;
  readonly votes: Record<string, { helpful: number; notHelpful: number }>;
  readonly onVote: (itemId: string, helpful: boolean) => void;
  readonly showVoteCount?: boolean;
}) {
  const itemVotes = votes[item.id] || { helpful: 0, notHelpful: 0 };

  return (
    <div className="flex items-center gap-4 pt-4 border-t">
      <span className="text-sm text-muted-foreground">Was this helpful?</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote(item.id, true)}
          className="flex items-center gap-1"
          aria-label="thumbs up"
        >
          <ThumbsUp className="size-4" />
          {showVoteCount && itemVotes.helpful > 0 && (
            <span className="text-xs">{itemVotes.helpful}</span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote(item.id, false)}
          className="flex items-center gap-1"
          aria-label="thumbs down"
        >
          <ThumbsDown className="size-4" />
          {showVoteCount && itemVotes.notHelpful > 0 && (
            <span className="text-xs">{itemVotes.notHelpful}</span>
          )}
        </Button>
      </div>
    </div>
  );
}

// Related articles component
function RelatedArticles({ articles }: { readonly articles: Array<{ title: string; href: string }> }) {
  return (
    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
      <h4 className="font-medium text-sm mb-2">Related Articles</h4>
      <div className="space-y-1">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.href}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            {article.title}
            <ExternalLink className="size-3" />
          </a>
        ))}
      </div>
    </div>
  );
}

// FAQ Item component for rendering answers
function FAQAnswer({ answer }: { readonly answer: string | ComponentChildren }) {
  if (typeof answer === "string") {
    return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: answer }} />;
  }
  
  if (isComponentSpec(answer)) {
    return <>{render(answer)}</>;
  }
  
  return <>{answer as React.ReactNode}</>;
}

// Accordion variant
function AccordionVariant({
  items,
  animated = true,
  voting,
  votes,
  onVote,
  openFirst = false,
  allowCollapse = true,
}: {
  readonly items: FAQItem[];
  readonly animated?: boolean;
  readonly voting?: FAQDef["voting"];
  readonly votes: Record<string, { helpful: number; notHelpful: number }>;
  readonly onVote: (itemId: string, helpful: boolean) => void;
  readonly openFirst?: boolean;
  readonly allowCollapse?: boolean;
}) {
  const defaultValue = openFirst ? items[0]?.id : undefined;
  const type = allowCollapse ? "single" : "multiple";

  return (
    <Accordion 
      type={type as "single"}
      defaultValue={defaultValue}
      collapsible={allowCollapse}
      className="w-full"
    >
      {items.map((item, index) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-3">
              {item.anchorId && (
                <Hash className="size-4 text-muted-foreground" />
              )}
              <span>{item.question}</span>
              {item.isPopular && (
                <Badge variant="secondary" className="ml-auto">
                  Popular
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <motion.div
              initial={animated ? { opacity: 0, y: -10 } : undefined}
              animate={animated ? { opacity: 1, y: 0 } : undefined}
              transition={animated ? { duration: 0.3, delay: index * 0.1 } : undefined}
            >
              <FAQAnswer answer={item.answer} />
              
              {item.relatedArticles && item.relatedArticles.length > 0 && (
                <RelatedArticles articles={item.relatedArticles} />
              )}
              
              {voting?.enabled && (
                <FAQVoting
                  item={item}
                  votes={votes}
                  onVote={onVote}
                  showVoteCount={voting.showVoteCount}
                />
              )}
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// Grid variant
function GridVariant({
  items,
  columns = 2,
  animated = true,
  voting,
  votes,
  onVote,
}: {
  readonly items: FAQItem[];
  readonly columns?: 1 | 2 | 3;
  readonly animated?: boolean;
  readonly voting?: FAQDef["voting"];
  readonly votes: Record<string, { helpful: number; notHelpful: number }>;
  readonly onVote: (itemId: string, helpful: boolean) => void;
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <div className={cn("grid gap-6", gridClass)}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={animated ? { duration: 0.3, delay: index * 0.1 } : undefined}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {item.anchorId && (
                  <Hash className="size-4 text-muted-foreground" />
                )}
                {item.question}
                {item.isPopular && (
                  <Badge variant="secondary">Popular</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FAQAnswer answer={item.answer} />
              
              {item.relatedArticles && item.relatedArticles.length > 0 && (
                <RelatedArticles articles={item.relatedArticles} />
              )}
              
              {voting?.enabled && (
                <FAQVoting
                  item={item}
                  votes={votes}
                  onVote={onVote}
                  showVoteCount={voting.showVoteCount}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Two-column variant
function TwoColumnVariant({
  items,
  animated = true,
  voting,
  votes,
  onVote,
}: {
  readonly items: FAQItem[];
  readonly animated?: boolean;
  readonly voting?: FAQDef["voting"];
  readonly votes: Record<string, { helpful: number; notHelpful: number }>;
  readonly onVote: (itemId: string, helpful: boolean) => void;
}) {
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {leftColumn.map((item, index) => (
          <motion.div
            key={item.id}
            initial={animated ? { opacity: 0, x: -20 } : undefined}
            animate={animated ? { opacity: 1, x: 0 } : undefined}
            transition={animated ? { duration: 0.3, delay: index * 0.1 } : undefined}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {item.anchorId && (
                    <Hash className="size-4 text-muted-foreground" />
                  )}
                  {item.question}
                  {item.isPopular && (
                    <Badge variant="secondary">Popular</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FAQAnswer answer={item.answer} />
                
                {item.relatedArticles && item.relatedArticles.length > 0 && (
                  <RelatedArticles articles={item.relatedArticles} />
                )}
                
                {voting?.enabled && (
                  <FAQVoting
                    item={item}
                    votes={votes}
                    onVote={onVote}
                    showVoteCount={voting.showVoteCount}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="space-y-6">
        {rightColumn.map((item, index) => (
          <motion.div
            key={item.id}
            initial={animated ? { opacity: 0, x: 20 } : undefined}
            animate={animated ? { opacity: 1, x: 0 } : undefined}
            transition={animated ? { duration: 0.3, delay: index * 0.1 } : undefined}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {item.anchorId && (
                    <Hash className="size-4 text-muted-foreground" />
                  )}
                  {item.question}
                  {item.isPopular && (
                    <Badge variant="secondary">Popular</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FAQAnswer answer={item.answer} />
                
                {item.relatedArticles && item.relatedArticles.length > 0 && (
                  <RelatedArticles articles={item.relatedArticles} />
                )}
                
                {voting?.enabled && (
                  <FAQVoting
                    item={item}
                    votes={votes}
                    onVote={onVote}
                    showVoteCount={voting.showVoteCount}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Contact Support CTA
function ContactSupportCTA({ contactSupport }: { readonly contactSupport: FAQDef["contactSupport"] }) {
  if (!contactSupport?.enabled) return null;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/20">
      <CardContent className="p-6 text-center">
        <MessageCircle className="size-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-semibold text-lg mb-2">
          {contactSupport.title || "Still need help?"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {contactSupport.description || "Can't find what you're looking for? Get in touch with our support team."}
        </p>
        <Button>
          {contactSupport.buttonText || "Contact Support"}
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * FAQBlock - Comprehensive FAQ component with multiple variants
 */
export function FAQBlock({ spec }: FAQBlockProps) {
  const {
    variant = "accordion",
    items = [],
    categories = [],
    search,
    voting,
    contactSupport,
    showCategories = false,
    showSearch = false,
    showPopularFirst = false,
    allowCollapse = true,
    openFirst = false,
    maxItems,
    animated = true,
    columns = 2,
    spacing = "normal",
  } = spec;

  // Use direct props
  const faqItems = items;
  const faqCategories = categories;
  const searchConfig = search;
  const votingConfig = voting;
  const contactConfig = contactSupport;

  // Hooks for functionality
  const { searchQuery, setSearchQuery, filteredItems: searchFiltered } = useSearch(
    faqItems, 
    searchConfig?.searchInAnswers
  );
  const { selectedCategory, setSelectedCategory, filteredItems: categoryFiltered } = useCategoryFilter(
    showCategories ? searchFiltered : faqItems,
    faqCategories
  );
  const { votes, handleVote } = useVoting();

  // Final filtered items
  const finalItems = React.useMemo(() => {
    let items = showCategories ? categoryFiltered : searchFiltered;
    
    if (showPopularFirst) {
      items = [...items].sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
    }
    
    if (maxItems) {
      items = items.slice(0, maxItems);
    }
    
    return items;
  }, [categoryFiltered, searchFiltered, showCategories, showPopularFirst, maxItems]);

  const className = spec.className as string | undefined;
  const style = spec.style as React.CSSProperties | undefined;

  const spacingClass = {
    compact: "space-y-4",
    normal: "space-y-6",
    relaxed: "space-y-8",
  }[spacing];

  return (
    <div className={cn("w-full", spacingClass, className)} style={style}>
      {/* Header with search and filters */}
      {(showSearch || showCategories) && (
        <div className="space-y-4 mb-8">
          {showSearch && searchConfig?.enabled && (
            <FAQSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchConfig.placeholder}
            />
          )}
          
          {showCategories && faqCategories.length > 0 && (
            <CategoryFilter
              categories={faqCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}
        </div>
      )}

      {/* Results count */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="text-sm text-muted-foreground mb-4">
          {finalItems.length} result{finalItems.length === 1 ? "" : "s"} found
        </div>
      )}

      {/* FAQ Content */}
      {finalItems.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No FAQs found matching your criteria.</p>
        </Card>
      ) : (
        <>
          {variant === "accordion" && (
            <AccordionVariant
              items={finalItems}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
              openFirst={openFirst}
              allowCollapse={allowCollapse}
            />
          )}
          
          {variant === "grid" && (
            <GridVariant
              items={finalItems}
              columns={columns}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
            />
          )}
          
          {variant === "two-column" && (
            <TwoColumnVariant
              items={finalItems}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
            />
          )}
          
          {(variant === "categorized" || variant === "search") && (
            <AccordionVariant
              items={finalItems}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
              openFirst={openFirst}
              allowCollapse={allowCollapse}
            />
          )}
        </>
      )}

      {/* Contact Support CTA */}
      {contactConfig?.enabled && (
        <div className="mt-8">
          <ContactSupportCTA contactSupport={contactConfig} />
        </div>
      )}
    </div>
  );
}