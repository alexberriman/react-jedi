import React, { useState } from 'react';
import { LatestNews } from '@/components/blocks/latest-news';
import type { Article } from '@/components/blocks/latest-news';
import { PageHeader } from '@/components/ui/page-header';
import { ShowcaseWrapper } from '@/components/ui/showcase-wrapper';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/lib/use-toast';

// Sample article data
const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Tech Company Announces Revolutionary AI Assistant',
    excerpt: 'In a groundbreaking announcement today, the tech giant revealed their latest AI technology that promises to transform how we interact with digital devices.',
    category: 'Technology',
    date: '2024-01-15',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    url: '#',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
    excerpt: 'World leaders gather to sign unprecedented climate accord aimed at reducing global carbon emissions by 50% over the next decade.',
    category: 'Environment',
    date: '2024-01-14',
    author: {
      name: 'Michael Torres',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
    url: '#',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Stock Market Hits All-Time High Amid Economic Recovery',
    excerpt: 'Markets surge as investors respond positively to latest economic indicators showing strong growth across multiple sectors.',
    category: 'Business',
    date: '2024-01-13',
    author: {
      name: 'Emily Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    url: '#',
    readTime: '4 min read'
  },
  {
    id: '4',
    title: 'New Study Reveals Benefits of Mediterranean Diet for Brain Health',
    excerpt: 'Researchers find strong correlation between Mediterranean diet adherence and reduced risk of cognitive decline in aging populations.',
    category: 'Health',
    date: '2024-01-12',
    author: {
      name: 'Dr. James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    url: '#',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Space Exploration Milestone: First Commercial Moon Landing Success',
    excerpt: 'Private space company successfully lands spacecraft on lunar surface, marking new era in commercial space exploration.',
    category: 'Technology',
    date: '2024-01-11',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80',
    url: '#',
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Electric Vehicle Sales Surpass Traditional Cars for First Time',
    excerpt: 'Historic shift in automotive industry as EV sales outpace combustion engines in major markets worldwide.',
    category: 'Technology',
    date: '2024-01-10',
    author: {
      name: 'Lisa Park',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    url: '#',
    readTime: '5 min read'
  },
  {
    id: '7',
    title: 'Revolutionary Cancer Treatment Shows Promising Results in Clinical Trials',
    excerpt: 'New immunotherapy approach demonstrates remarkable efficacy in treating previously untreatable forms of cancer.',
    category: 'Health',
    date: '2024-01-09',
    author: {
      name: 'Dr. Rachel Green',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    url: '#',
    readTime: '10 min read'
  },
  {
    id: '8',
    title: 'Global Food Security Initiative Launches to Combat Hunger',
    excerpt: 'International organizations unite to address food insecurity affecting millions worldwide through innovative agricultural solutions.',
    category: 'World',
    date: '2024-01-08',
    author: {
      name: 'Carlos Martinez',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    thumbnail: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&q=80',
    url: '#',
    readTime: '6 min read'
  }
];

export function LatestNewsShowcase() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = (email: string) => {
    toast({
      title: "Newsletter Signup",
      description: `Thank you for subscribing with ${email}!`,
    });
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <PageHeader 
        title="Latest News" 
        description="Display recent articles and news updates in various layouts"
      />

      <Tabs defaultValue="cards-row" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="cards-row">Cards Row</TabsTrigger>
          <TabsTrigger value="featured-list">Featured List</TabsTrigger>
          <TabsTrigger value="minimal-links">Minimal Links</TabsTrigger>
          <TabsTrigger value="with-images">With Images</TabsTrigger>
          <TabsTrigger value="magazine">Magazine</TabsTrigger>
        </TabsList>

        <TabsContent value="cards-row" className="space-y-8">
          <ShowcaseWrapper title="Default Cards Row">
            <LatestNews
              articles={sampleArticles}
              variant="cards-row"
              count={3}
              heading="Latest News"
              description="Stay updated with our latest articles and insights"
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="With Category Tabs">
            <LatestNews
              articles={sampleArticles}
              variant="cards-row"
              count={3}
              heading="News by Category"
              showCategoryTabs
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="With Newsletter">
            <LatestNews
              articles={sampleArticles}
              variant="cards-row"
              count={3}
              heading="Latest Updates"
              showNewsletter
              newsletterHeading="Never Miss an Update"
              newsletterDescription="Subscribe to our newsletter and get the latest news delivered to your inbox"
              onNewsletterSubmit={handleNewsletterSubmit}
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>
        </TabsContent>

        <TabsContent value="featured-list" className="space-y-8">
          <ShowcaseWrapper title="Featured with List">
            <LatestNews
              articles={sampleArticles}
              variant="featured-list"
              count={4}
              heading="Featured Stories"
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="Featured with Categories and Newsletter">
            <LatestNews
              articles={sampleArticles}
              variant="featured-list"
              count={4}
              heading="Top Stories"
              showCategoryTabs
              showNewsletter
              viewAllUrl="/news"
              onNewsletterSubmit={handleNewsletterSubmit}
            />
          </ShowcaseWrapper>
        </TabsContent>

        <TabsContent value="minimal-links" className="space-y-8">
          <ShowcaseWrapper title="Minimal Links Style">
            <LatestNews
              articles={sampleArticles.map(a => ({ ...a, thumbnail: undefined, excerpt: undefined }))}
              variant="minimal-links"
              count={6}
              heading="Recent Updates"
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="Minimal with Categories">
            <LatestNews
              articles={sampleArticles.map(a => ({ ...a, thumbnail: undefined, excerpt: undefined }))}
              variant="minimal-links"
              count={6}
              heading="Quick Links"
              showCategoryTabs
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>
        </TabsContent>

        <TabsContent value="with-images" className="space-y-8">
          <ShowcaseWrapper title="Cards with Prominent Images">
            <LatestNews
              articles={sampleArticles}
              variant="with-images"
              count={3}
              heading="Latest Articles"
              description="Discover our most recent stories"
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="Six Articles Grid">
            <LatestNews
              articles={sampleArticles}
              variant="with-images"
              count={6}
              heading="More Stories"
              description="Explore our extensive collection of articles"
            />
          </ShowcaseWrapper>
        </TabsContent>

        <TabsContent value="magazine" className="space-y-8">
          <ShowcaseWrapper title="Magazine Layout">
            <LatestNews
              articles={sampleArticles}
              variant="magazine"
              count={5}
              heading="Magazine"
              description="Featured stories and latest updates"
              viewAllUrl="/news"
            />
          </ShowcaseWrapper>

          <ShowcaseWrapper title="Compact Magazine">
            <LatestNews
              articles={sampleArticles.slice(0, 3)}
              variant="magazine"
              count={3}
              heading="Editor's Picks"
            />
          </ShowcaseWrapper>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-8">
        <ShowcaseWrapper title="Loading State">
          <div className="flex gap-4">
            <button
              onClick={simulateLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Simulate Loading
            </button>
          </div>
          <LatestNews
            articles={[]}
            variant="cards-row"
            count={3}
            heading="Latest News"
            loading={loading}
          />
        </ShowcaseWrapper>
      </div>
    </div>
  );
}