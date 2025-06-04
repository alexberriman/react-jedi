/**
 * FAQ Block Component
 *
 * A modern, clean FAQ component with carousel-style navigation and smooth animations.
 * Features include search, categories, voting, and beautiful transitions.
 */

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight
} from "lucide-react";
import type { ComponentProps as ReactJediComponentProps } from "../../../types/schema/components";
import type { FAQDef, FAQItem, FAQCategory } from "../../../types/components/faq";
import type { ComponentChildren } from "../../../types/schema/base";
import { render } from "../../../lib/render";
import { isComponentSpec } from "../../../types/schema/guards";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";

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
    <div className={cn("relative max-w-md mx-auto", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
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
    <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className={cn(
          "rounded-full",
          selectedCategory === "all" 
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0" 
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "rounded-full",
            selectedCategory === category.id 
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0" 
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          {category.name}
          {category.count && (
            <Badge variant="secondary" className="ml-2 bg-slate-200 dark:bg-slate-700">
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
    <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <span className="text-sm text-slate-600 dark:text-slate-400">Was this helpful?</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onVote(item.id, true)}
          className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400"
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
          className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400"
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

// FAQ Item component for rendering answers
function FAQAnswer({ answer }: { readonly answer: string | ComponentChildren }) {
  if (typeof answer === "string") {
    return <div className="prose prose-sm max-w-none dark:prose-invert text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: answer }} />;
  }
  
  if (isComponentSpec(answer)) {
    return <>{render(answer)}</>;
  }
  
  return <>{answer as React.ReactNode}</>;
}

// Carousel variant - Main component
function CarouselVariant({
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setExpandedItem(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setExpandedItem(null);
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          exit={animated ? { opacity: 0, y: -20 } : undefined}
          transition={animated ? { duration: 0.3 } : undefined}
        >
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white pr-4">
                  {currentItem.question}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(currentItem.id)}
                  className="flex-shrink-0"
                >
                  {expandedItem === currentItem.id ? (
                    <Minus className="size-5" />
                  ) : (
                    <Plus className="size-5" />
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {expandedItem === currentItem.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <FAQAnswer answer={currentItem.answer} />
                      
                      {voting?.enabled && (
                        <FAQVoting
                          item={currentItem}
                          votes={votes}
                          onVote={onVote}
                          showVoteCount={voting.showVoteCount}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentItem.tags && currentItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentItem.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          className="rounded-full"
        >
          <ChevronLeft className="size-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setExpandedItem(null);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              )}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          className="rounded-full"
        >
          Next
          <ChevronRight className="size-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// Grid variant - Clean card layout
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

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
          <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left group"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.question}
                  </h3>
                  <ArrowRight className={cn(
                    "size-5 text-slate-400 flex-shrink-0 transition-transform",
                    expandedItems.has(item.id) && "rotate-90"
                  )} />
                </div>
              </button>

              <AnimatePresence>
                {expandedItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                      <FAQAnswer answer={item.answer} />
                      
                      {voting?.enabled && (
                        <FAQVoting
                          item={item}
                          votes={votes}
                          onVote={onVote}
                          showVoteCount={voting.showVoteCount}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {item.isPopular && (
                <Badge className="mt-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  Popular
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Contact Support CTA
function ContactSupportCTA({ contactSupport }: { readonly contactSupport: FAQDef["contactSupport"] }) {
  if (!contactSupport?.enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Search className="size-8 text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-slate-900 dark:text-white">
            {contactSupport.title || "Still need help?"}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            {contactSupport.description || "Can't find what you're looking for? Get in touch with our support team."}
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
            {contactSupport.buttonText || "Contact Support"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * FAQBlock - Modern FAQ component with carousel and grid variants
 */
export function FAQBlock({ spec }: FAQBlockProps) {
  const {
    variant = "carousel",
    items = [],
    categories = [],
    search,
    voting,
    contactSupport,
    showCategories = false,
    showSearch = false,
    showPopularFirst = false,
    maxItems,
    animated = true,
    columns = 2,
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

  return (
    <div className={cn("w-full space-y-8", className)} style={style}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Find answers to common questions about our products and services
        </p>
      </div>

      {/* Search and filters */}
      {(showSearch || showCategories) && (
        <div className="space-y-4">
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
        <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
          {finalItems.length} result{finalItems.length === 1 ? "" : "s"} found
        </div>
      )}

      {/* FAQ Content */}
      {finalItems.length === 0 ? (
        <Card className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400">No FAQs found matching your criteria.</p>
        </Card>
      ) : (
        <>
          {(variant === "carousel" || variant === "accordion") && (
            <CarouselVariant
              items={finalItems}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
            />
          )}
          
          {(variant === "grid" || variant === "cards") && (
            <GridVariant
              items={finalItems}
              columns={columns}
              animated={animated}
              voting={votingConfig}
              votes={votes}
              onVote={handleVote}
            />
          )}
        </>
      )}

      {/* Contact Support CTA */}
      {contactConfig?.enabled && (
        <div className="mt-12">
          <ContactSupportCTA contactSupport={contactConfig} />
        </div>
      )}
    </div>
  );
}