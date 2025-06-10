import React, { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../../ui/dialog";
import { Separator } from "../../ui/separator";
import { motion, Variants } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock, FaBuilding, FaBookmark, FaChevronRight } from "react-icons/fa";

export interface SalaryRange {
  min: number;
  max: number;
  currency?: string;
  period?: "yearly" | "monthly" | "hourly";
}

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "remote";
  salaryRange?: SalaryRange;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  posted: Date | string;
  deadline?: Date | string;
  featured?: boolean;
  urgent?: boolean;
  experienceLevel?: "entry" | "mid" | "senior" | "lead";
  companyName?: string;
  companyLogo?: string;
  applyUrl?: string;
}

export interface JobListingsProps {
  jobs: JobListing[];
  variant?: "grid" | "list" | "featured" | "departments" | "minimal";
  columns?: "1" | "2" | "3" | "4" | "auto";
  gap?: "sm" | "md" | "lg" | "xl";
  showFilters?: boolean;
  showSearch?: boolean;
  showDetailModal?: boolean;
  showSalary?: boolean;
  showRequirements?: boolean;
  departments?: string[];
  locations?: string[];
  animated?: boolean;
  staggerDelay?: number;
  hoverEffect?: "none" | "lift" | "glow" | "scale";
  alignment?: "left" | "center" | "right";
  maxDescriptionLength?: number;
  onApply?: (job: JobListing) => void;
  className?: string;
  children?: React.ReactNode;
}

const columnClasses = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  auto: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

const hoverEffects = {
  none: "",
  lift: "hover:scale-[1.02] hover:shadow-xl transition-all duration-300",
  glow: "hover:shadow-lg hover:shadow-primary/25 transition-all duration-300",
  scale: "hover:scale-105 transition-transform duration-300",
};

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const typeColors = {
  "full-time": "bg-green-500/10 text-green-700 dark:text-green-400",
  "part-time": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "contract": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  "internship": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  "remote": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
};

const experienceLevels = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Lead/Manager",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay || 0,
      ease: "easeOut",
    },
  }),
};

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

const formatSalary = (salaryRange: SalaryRange): string => {
  const { min, max, currency = "$", period = "yearly" } = salaryRange;
  
  const minStr = formatNumber(min);
  const maxStr = formatNumber(max);
  let periodStr = "/year";
  if (period === "monthly") {
    periodStr = "/month";
  } else if (period === "hourly") {
    periodStr = "/hour";
  }

  return `${currency}${minStr} - ${currency}${maxStr}${periodStr}`;
};

const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
  
  return dateObj.toLocaleDateString();
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

interface JobCardProps {
  job: JobListing;
  variant: JobListingsProps["variant"];
  alignment: NonNullable<JobListingsProps["alignment"]>;
  showSalary: boolean;
  showRequirements: boolean;
  showDetailModal: boolean;
  maxDescriptionLength: number;
  hoverEffect: NonNullable<JobListingsProps["hoverEffect"]>;
  animated: boolean;
  animationDelay: number;
  onApply?: (job: JobListing) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  variant,
  alignment,
  showSalary,
  showRequirements,
  showDetailModal,
  maxDescriptionLength,
  hoverEffect,
  animated,
  animationDelay,
  onApply,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = () => {
    if (onApply) {
      onApply(job);
    } else if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    }
    setIsModalOpen(false);
  };

  const renderDetailModal = (): React.ReactElement | null => {
    if (!showDetailModal) return null;

    return (
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {job.companyName && (
                <span className="flex items-center gap-1 text-base">
                  <FaBuilding className="h-4 w-4" />
                  {job.companyName}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaBriefcase className="h-4 w-4" />
                {job.department}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={cn("capitalize", typeColors[job.type])}>
              {job.type.replace("-", " ")}
            </Badge>
            {job.experienceLevel && (
              <Badge variant="secondary">
                {experienceLevels[job.experienceLevel]}
              </Badge>
            )}
            {job.urgent && (
              <Badge variant="destructive">Urgent</Badge>
            )}
            {job.featured && (
              <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
                Featured
              </Badge>
            )}
          </div>

          {showSalary && job.salaryRange && (
            <div className="flex items-center gap-2 text-lg font-medium">
              <FaDollarSign className="h-5 w-5 text-green-600" />
              {formatSalary(job.salaryRange)}
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-2">Job Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FaClock className="h-4 w-4" />
                Posted {formatDate(job.posted)}
              </div>
              {job.deadline && (
                <div className="mt-1">
                  Application deadline: {new Date(job.deadline).toLocaleDateString()}
                </div>
              )}
            </div>
            <Button onClick={handleApply} size="lg">
              Apply Now <FaChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  };

  const renderMinimalVariant = (): React.ReactElement => {
    return (
      <div role="article" className={cn("flex items-center justify-between p-4 border rounded-lg", hoverEffects[hoverEffect])}>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-lg truncate">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <FaBriefcase className="h-3 w-3" />
              {job.department}
            </span>
            <Badge variant="outline" className="text-xs capitalize">
              {job.type.replace("-", " ")}
            </Badge>
          </div>
        </div>
        <Button variant="outline" onClick={handleApply}>
          Apply
        </Button>
      </div>
    );
  };

  const renderListVariant = (): React.ReactElement => {
    return (
      <Card role="article" className={cn("w-full", hoverEffects[hoverEffect])}>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-xl">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  {job.companyName && (
                    <span className="flex items-center gap-1">
                      <FaBuilding className="h-4 w-4" />
                      {job.companyName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase className="h-4 w-4" />
                    {job.department}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground">
                {truncateText(job.description, maxDescriptionLength)}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("capitalize", typeColors[job.type])}>
                  {job.type.replace("-", " ")}
                </Badge>
                {job.experienceLevel && (
                  <Badge variant="secondary">
                    {experienceLevels[job.experienceLevel]}
                  </Badge>
                )}
                {showSalary && job.salaryRange && (
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <FaDollarSign className="h-4 w-4" />
                    {formatSalary(job.salaryRange)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="text-sm text-muted-foreground">
                {formatDate(job.posted)}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <FaBookmark className="h-4 w-4" />
                </Button>
                <Button onClick={handleApply}>
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFeaturedVariant = (): React.ReactElement => {
    return (
      <Card role="article" className={cn("h-full border-2 border-primary/20", hoverEffects[hoverEffect])}>
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
              Featured
            </Badge>
            {job.urgent && <Badge variant="destructive">Urgent</Badge>}
          </div>
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {job.companyName && (
                <span className="flex items-center gap-1">
                  <FaBuilding className="h-4 w-4" />
                  {job.companyName}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaBriefcase className="h-4 w-4" />
                {job.department}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {truncateText(job.description, maxDescriptionLength)}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge className={cn("capitalize", typeColors[job.type])}>
              {job.type.replace("-", " ")}
            </Badge>
            {job.experienceLevel && (
              <Badge variant="secondary">
                {experienceLevels[job.experienceLevel]}
              </Badge>
            )}
          </div>

          {showSalary && job.salaryRange && (
            <div className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
              <FaDollarSign className="h-4 w-4" />
              {formatSalary(job.salaryRange)}
            </div>
          )}

          {showRequirements && job.requirements && job.requirements.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Key Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span className="line-clamp-1">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatDate(job.posted)}
          </span>
          <Button onClick={handleApply}>
            Apply Now <FaChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderDefaultVariant = (): React.ReactElement => {
    return (
      <Card role="article" className={cn("h-full", hoverEffects[hoverEffect])}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
            {job.featured && (
              <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0">
                Featured
              </Badge>
            )}
          </div>
          <CardDescription>
            <div className="flex flex-col gap-2 mt-2">
              {job.companyName && (
                <span className="flex items-center gap-1">
                  <FaBuilding className="h-4 w-4" />
                  {job.companyName}
                </span>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaBriefcase className="h-3 w-3" />
                  {job.department}
                </span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge className={cn("capitalize text-xs", typeColors[job.type])}>
              {job.type.replace("-", " ")}
            </Badge>
            {job.experienceLevel && (
              <Badge variant="secondary" className="text-xs">
                {experienceLevels[job.experienceLevel]}
              </Badge>
            )}
          </div>

          {showSalary && job.salaryRange && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <FaDollarSign className="h-4 w-4" />
              {formatSalary(job.salaryRange)}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3">
          <span className="text-xs text-muted-foreground">
            {formatDate(job.posted)}
          </span>
          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const getCardContent = (): React.ReactElement => {
    if (variant === "minimal") return renderMinimalVariant();
    if (variant === "list") return renderListVariant();
    if (variant === "featured") return renderFeaturedVariant();
    return renderDefaultVariant();
  };

  const wrapWithModalAndAnimation = (content: React.ReactNode): React.ReactElement => {
    const wrappedContent = showDetailModal && variant !== "minimal" ? (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">{content}</div>
        </DialogTrigger>
        {renderDetailModal()}
      </Dialog>
    ) : (
      <>{content}</>
    );

    if (animated) {
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          custom={animationDelay}
          variants={cardVariants}
        >
          {wrappedContent}
        </motion.div>
      );
    }

    return <>{wrappedContent}</>;
  };

  const cardContent = getCardContent();
  return wrapWithModalAndAnimation(cardContent);
};

export const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  variant = "grid",
  columns = "3",
  gap = "md",
  showFilters = true,
  showSearch = true,
  showDetailModal = true,
  showSalary = true,
  showRequirements = false,
  departments,
  locations,
  animated = true,
  staggerDelay = 0.1,
  hoverEffect = "lift",
  alignment = "left",
  maxDescriptionLength = 150,
  onApply,
  className,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "salary">("newest");

  const allDepartments = useMemo(() => {
    if (departments) return departments;
    const depts = new Set(jobs.map(job => job.department).filter(Boolean));
    return [...depts].sort((a, b) => a.localeCompare(b));
  }, [jobs, departments]);

  const allLocations = useMemo(() => {
    if (locations) return locations;
    const locs = new Set(jobs.map(job => job.location).filter(Boolean));
    return [...locs].sort((a, b) => a.localeCompare(b));
  }, [jobs, locations]);

  const jobTypes = ["full-time", "part-time", "contract", "internship", "remote"];

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.companyName && job.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
      const matchesType = selectedType === "all" || job.type === selectedType;

      return matchesSearch && matchesDepartment && matchesLocation && matchesType;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.posted).getTime() - new Date(b.posted).getTime();
      } else if (sortBy === "salary" && a.salaryRange && b.salaryRange) {
        return b.salaryRange.max - a.salaryRange.max;
      }
      return 0;
    });

    // Featured jobs first if not in featured variant
    if (variant !== "featured") {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

    return filtered;
  }, [jobs, searchQuery, selectedDepartment, selectedLocation, selectedType, sortBy, variant]);

  const renderFilters = () => {
    if (!showFilters && !showSearch) return null;

    return (
      <div className="space-y-4 mb-8">
        {showSearch && (
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs by title, company, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {allDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace("-", " ").charAt(0).toUpperCase() + type.replace("-", " ").slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as "newest" | "oldest" | "salary")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                {showSalary && <SelectItem value="salary">Highest Salary</SelectItem>}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? "job" : "jobs"} found
          </p>
          {filteredAndSortedJobs.some(job => job.featured) && variant !== "featured" && (
            <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
              Featured positions available
            </Badge>
          )}
        </div>
      </div>
    );
  };

  if (variant === "departments") {
    return (
      <div className={cn("space-y-8", className)}>
        {renderFilters()}
        <div className="space-y-8">
          {allDepartments.map((dept) => {
            const deptJobs = filteredAndSortedJobs.filter(job => job.department === dept);
            if (deptJobs.length === 0) return null;

            return (
              <div key={dept} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{dept}</h3>
                  <Badge variant="secondary">{deptJobs.length} positions</Badge>
                </div>
                <div className={cn("grid", columnClasses[columns], gapClasses[gap])}>
                  {deptJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      variant="grid"
                      alignment={alignment}
                      showSalary={showSalary}
                      showRequirements={showRequirements}
                      showDetailModal={showDetailModal}
                      maxDescriptionLength={maxDescriptionLength}
                      hoverEffect={hoverEffect}
                      animated={animated}
                      animationDelay={animated ? index * staggerDelay : 0}
                      onApply={onApply}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </div>
    );
  }

  if (variant === "featured") {
    const featuredJobs = filteredAndSortedJobs.filter(job => job.featured);
    const regularJobs = filteredAndSortedJobs.filter(job => !job.featured);

    return (
      <div className={cn("space-y-8", className)}>
        {renderFilters()}
        
        {featuredJobs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Featured Positions</h3>
            <div className={cn("grid", columnClasses[columns], gapClasses[gap])}>
              {featuredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="featured"
                  alignment={alignment}
                  showSalary={showSalary}
                  showRequirements={showRequirements}
                  showDetailModal={showDetailModal}
                  maxDescriptionLength={maxDescriptionLength * 1.5}
                  hoverEffect={hoverEffect}
                  animated={animated}
                  animationDelay={animated ? index * staggerDelay : 0}
                  onApply={onApply}
                />
              ))}
            </div>
          </div>
        )}

        {regularJobs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">All Positions</h3>
            <div className="space-y-4">
              {regularJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  variant="list"
                  alignment={alignment}
                  showSalary={showSalary}
                  showRequirements={showRequirements}
                  showDetailModal={showDetailModal}
                  maxDescriptionLength={maxDescriptionLength}
                  hoverEffect={hoverEffect}
                  animated={animated}
                  animationDelay={animated ? (featuredJobs.length + index) * staggerDelay : 0}
                  onApply={onApply}
                />
              ))}
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }

  const gridClasses = variant === "list" || variant === "minimal" 
    ? "space-y-4" 
    : cn("grid", columnClasses[columns], gapClasses[gap]);

  return (
    <div className={cn("space-y-8", className)}>
      {renderFilters()}
      <div className={gridClasses}>
        {filteredAndSortedJobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            variant={variant}
            alignment={alignment}
            showSalary={showSalary}
            showRequirements={showRequirements}
            showDetailModal={showDetailModal}
            maxDescriptionLength={maxDescriptionLength}
            hoverEffect={hoverEffect}
            animated={animated}
            animationDelay={animated ? index * staggerDelay : 0}
            onApply={onApply}
          />
        ))}
      </div>
      {filteredAndSortedJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setSelectedDepartment("all");
              setSelectedLocation("all");
              setSelectedType("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};

JobListings.displayName = "JobListings";