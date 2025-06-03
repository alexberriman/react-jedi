import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Search, ChevronLeft, ChevronRight, ArrowRight, Zap, TrendingUp, Code, Calendar, Users, Globe } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';

export interface ProjectStats {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  projectUrl?: string;
  featuredImage: string;
  galleryImages?: string[];
  beforeAfterImages?: {
    before: string;
    after: string;
  };
  completedDate: string;
  duration?: string;
  results?: ProjectStats[];
  testimonial?: {
    content: string;
    author: string;
    role?: string;
    company?: string;
  };
  isFeatured?: boolean;
  slug: string;
}

export interface PortfolioCaseStudiesProperties {
  projects: CaseStudy[];
  variant?: 'grid' | 'detailed-cards' | 'before-after' | 'client-spotlight' | 'timeline';
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  showLoadMore?: boolean;
  projectsPerPage?: number;
  sortOptions?: Array<{ label: string; value: 'date-desc' | 'date-asc' | 'featured' }>;
  categories?: string[];
  onLoadMore?: () => void;
  onViewDetails?: (project: CaseStudy) => void;
  loading?: boolean;
  featuredProjectIds?: string[];
  className?: string;
  enableLightbox?: boolean;
}

function ProjectCard({ project, onViewDetails }: { readonly project: CaseStudy; readonly onViewDetails?: (project: CaseStudy) => void }) {
  return (
    <Card className={cn('overflow-hidden hover:shadow-xl transition-all duration-300 group', project.isFeatured && 'ring-2 ring-primary')}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.featuredImage} 
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {project.isFeatured && (
          <Badge className="absolute top-3 left-3" variant="default">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-normal">
            {project.category}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(project.completedDate), 'MMM yyyy')}
          </span>
        </div>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.client}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        {project.results && project.results.length > 0 && (
          <div className="flex items-center gap-4 pt-2">
            {project.results.slice(0, 2).map((stat, index) => (
              <div key={index} className="flex items-center gap-1.5">
                {stat.icon || <TrendingUp className="h-4 w-4 text-primary" />}
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
        <Button 
          className="w-full group/btn" 
          variant="outline"
          onClick={() => onViewDetails?.(project)}
        >
          View Case Study
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

function DetailedProjectCard({ project, onViewDetails }: { readonly project: CaseStudy; readonly onViewDetails?: (project: CaseStudy) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-video md:aspect-auto">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {project.isFeatured && (
            <Badge className="absolute top-3 left-3" variant="default">
              Featured Project
            </Badge>
          )}
        </div>
        <div className="p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{project.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {format(new Date(project.completedDate), 'MMMM yyyy')}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-1">{project.client}</p>
              {project.duration && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.duration} project
                </p>
              )}
            </div>
            <p className="text-muted-foreground">
              {project.longDescription || project.description}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-2">Technologies Used:</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              {project.results && project.results.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Key Results:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {project.results.map((stat, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {stat.icon || <Zap className="h-4 w-4 text-primary" />}
                        <div>
                          <p className="text-lg font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button 
              className="flex-1" 
              onClick={() => onViewDetails?.(project)}
            >
              View Full Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {project.projectUrl && (
              <Button 
                variant="outline"
                onClick={() => window.open(project.projectUrl, '_blank')}
              >
                <Globe className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function BeforeAfterCard({ project, onViewDetails }: { readonly project: CaseStudy; readonly onViewDetails?: (project: CaseStudy) => void }) {
  const [showAfter, setShowAfter] = useState(false);
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.beforeAfterImages ? (
          <>
            <img 
              src={project.beforeAfterImages.before} 
              alt={`${project.title} - Before`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                showAfter ? "opacity-0" : "opacity-100"
              )}
            />
            <img 
              src={project.beforeAfterImages.after} 
              alt={`${project.title} - After`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                showAfter ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="absolute top-3 left-3 right-3 flex justify-between">
              <Badge variant={showAfter ? "secondary" : "default"}>
                {showAfter ? "After" : "Before"}
              </Badge>
              {project.isFeatured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-3 right-3"
              onClick={() => setShowAfter(!showAfter)}
            >
              {showAfter ? "Show Before" : "Show After"}
            </Button>
          </>
        ) : (
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{project.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {format(new Date(project.completedDate), 'MMM yyyy')}
          </span>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.client}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        {project.results && project.results.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {project.results.slice(0, 2).map((stat, index) => (
              <div key={index} className="text-center p-2 bg-muted rounded-md">
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => onViewDetails?.(project)}
        >
          View Full Case Study
        </Button>
      </CardContent>
    </Card>
  );
}

function ClientSpotlightCard({ project, onViewDetails }: { readonly project: CaseStudy; readonly onViewDetails?: (project: CaseStudy) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{project.client}</h3>
            <Badge variant="secondary">{project.category}</Badge>
          </div>
          {project.isFeatured && (
            <Badge variant="default">Featured</Badge>
          )}
        </div>
        
        <div className="aspect-video overflow-hidden rounded-lg mb-6">
          <img 
            src={project.featuredImage} 
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">{project.title}</h4>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>

          {project.testimonial && (
            <blockquote className="border-l-2 border-primary pl-4 italic">
              <p className="text-sm mb-2">&ldquo;{project.testimonial.content}&rdquo;</p>
              <footer className="text-xs text-muted-foreground">
                — {project.testimonial.author}
                {project.testimonial.role && `, ${project.testimonial.role}`}
              </footer>
            </blockquote>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(project.completedDate), 'MMMM yyyy')}
            </div>
            <Button 
              size="sm"
              onClick={() => onViewDetails?.(project)}
            >
              Read More
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TimelineProjectCard({ project, index, total, onViewDetails }: { 
  readonly project: CaseStudy; 
  readonly index: number;
  readonly total: number;
  readonly onViewDetails?: (project: CaseStudy) => void;
}) {
  const isLeft = index % 2 === 0;
  
  return (
    <div className={cn(
      "relative flex items-center justify-between mb-8",
      isLeft ? "flex-row" : "flex-row-reverse"
    )}>
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
      
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
      
      {/* Content */}
      <div className={cn(
        "w-[calc(50%-2rem)]",
        isLeft ? "pr-8 text-right" : "pl-8"
      )}>
        <Card className="inline-block text-left hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{project.category}</Badge>
              {project.isFeatured && <Badge variant="default">Featured</Badge>}
            </div>
            <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {project.client} • {format(new Date(project.completedDate), 'MMMM yyyy')}
            </p>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewDetails?.(project)}
            >
              View Details
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Date label on opposite side */}
      <div className={cn(
        "w-[calc(50%-2rem)]",
        isLeft ? "pl-8" : "pr-8 text-right"
      )}>
        <p className="text-lg font-semibold">
          {format(new Date(project.completedDate), 'yyyy')}
        </p>
      </div>
    </div>
  );
}

function ProjectSkeleton({ variant }: { readonly variant: PortfolioCaseStudiesProperties['variant'] }) {
  if (variant === 'timeline') {
    return (
      <div className="relative mb-8">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        <div className="flex items-center justify-between">
          <div className="w-[calc(50%-2rem)] pr-8">
            <Card className="inline-block">
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-8 w-24" />
              </div>
            </Card>
          </div>
          <div className="w-[calc(50%-2rem)] pl-8">
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed-cards') {
    return (
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <Skeleton className="aspect-video" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export function PortfolioCaseStudies({
  projects,
  variant = 'grid',
  showFilters = true,
  showSearch = true,
  showPagination = true,
  showLoadMore = false,
  projectsPerPage = 9,
  sortOptions = [
    { label: 'Newest First', value: 'date-desc' },
    { label: 'Oldest First', value: 'date-asc' },
    { label: 'Featured', value: 'featured' }
  ],
  categories = [],
  onLoadMore,
  onViewDetails,
  loading = false,
  featuredProjectIds = [],
  className,
  enableLightbox = true,
  ...properties
}: Readonly<PortfolioCaseStudiesProperties>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories from projects if not provided
  const allCategories = useMemo(() => {
    if (categories.length > 0) return categories;
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [projects, categories]);

  // Mark featured projects
  const projectsWithFeatured = useMemo(() => {
    return projects.map(project => ({
      ...project,
      isFeatured: featuredProjectIds.includes(project.id) || project.isFeatured
    }));
  }, [projects, featuredProjectIds]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsWithFeatured;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    const sorted = [...filtered];
    switch (sortBy) {
      case 'date-asc': {
        sorted.sort((a, b) => new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime());
        break;
      }
      case 'date-desc': {
        sorted.sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime());
        break;
      }
      case 'featured': {
        sorted.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
        });
        break;
      }
    }

    return sorted;
  }, [projectsWithFeatured, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);
  const paginatedProjects = useMemo(() => {
    if (!showPagination && !showLoadMore) return filteredAndSortedProjects;
    
    const start = (currentPage - 1) * projectsPerPage;
    const end = showLoadMore ? currentPage * projectsPerPage : start + projectsPerPage;
    return filteredAndSortedProjects.slice(0, end);
  }, [filteredAndSortedProjects, currentPage, projectsPerPage, showPagination, showLoadMore]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const renderProjects = (): React.ReactNode => {
    if (loading) {
      return Array.from({ length: projectsPerPage }).map((_, index) => (
        <ProjectSkeleton key={index} variant={variant} />
      ));
    }

    if (paginatedProjects.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">No projects found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      );
    }

    switch (variant) {
      case 'detailed-cards': {
        return (
          <div className="col-span-full space-y-6">
            {paginatedProjects.map(project => (
              <DetailedProjectCard key={project.id} project={project} onViewDetails={onViewDetails} />
            ))}
          </div>
        );
      }

      case 'before-after': {
        return paginatedProjects.map(project => (
          <BeforeAfterCard key={project.id} project={project} onViewDetails={onViewDetails} />
        ));
      }

      case 'client-spotlight': {
        return paginatedProjects.map(project => (
          <ClientSpotlightCard key={project.id} project={project} onViewDetails={onViewDetails} />
        ));
      }

      case 'timeline': {
        return (
          <div className="col-span-full relative">
            {paginatedProjects.map((project, index) => (
              <TimelineProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                total={paginatedProjects.length}
                onViewDetails={onViewDetails}
              />
            ))}
            {/* End marker */}
            <div className="absolute left-1/2 bottom-0 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2" />
          </div>
        );
      }

      default: {
        return paginatedProjects.map(project => (
          <ProjectCard key={project.id} project={project} onViewDetails={onViewDetails} />
        ));
      }
    }
  };

  let gridColumns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  if (variant === 'detailed-cards' || variant === 'timeline') {
    gridColumns = 'grid-cols-1';
  } else if (variant === 'client-spotlight') {
    gridColumns = 'grid-cols-1 md:grid-cols-2';
  }
  
  const gridClass = cn('grid gap-6', gridColumns);

  return (
    <div className={cn('', className)} {...properties}>
      {(showFilters || showSearch) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {showSearch && (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects, clients, or technologies..."
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
        {renderProjects()}
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

      {showLoadMore && currentPage * projectsPerPage < filteredAndSortedProjects.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              onLoadMore?.();
            }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Projects'}
          </Button>
        </div>
      )}
    </div>
  );
}