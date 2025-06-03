import { useState } from "react";
import { JobListings, type JobListing } from "@alexberriman/react-jedi";
import { usePageMetadata } from "../../../../lib/meta";
import { Heading, Text, spacing } from "../../../../components/ui";
import { PageHeader } from "../../../../components/ui/page-header";
import { ShowcaseWrapper } from "../../../../components/ui/showcase-wrapper";
import type { ComponentSpec } from "@alexberriman/react-jedi";

// Use a deterministic approach for generating sample data
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10_000;
  return x - Math.floor(x);
};

// Sample job data generator
const generateSampleJobs = (count: number): JobListing[] => {
  const departments = ["Engineering", "Design", "Marketing", "Sales", "Operations", "Product"];
  const locations = ["San Francisco, CA", "New York, NY", "Remote", "London, UK", "Austin, TX", "Seattle, WA"];
  const types: JobListing["type"][] = ["full-time", "part-time", "contract", "internship", "remote"];
  const levels: JobListing["experienceLevel"][] = ["entry", "mid", "senior", "lead"];
  const companies = ["TechCorp", "Innovation Labs", "Digital Solutions", "StartupCo", "Enterprise Inc"];

  const jobTitles = {
    Engineering: ["Software Engineer", "Senior Frontend Developer", "Backend Engineer", "DevOps Engineer", "Full Stack Developer"],
    Design: ["UI/UX Designer", "Product Designer", "Design Lead", "Visual Designer"],
    Marketing: ["Marketing Manager", "Content Strategist", "Growth Marketer", "Brand Manager"],
    Sales: ["Sales Representative", "Account Executive", "Sales Manager", "Business Development Rep"],
    Operations: ["Operations Manager", "Project Manager", "Business Analyst", "HR Manager"],
    Product: ["Product Manager", "Senior Product Manager", "Technical Product Manager"],
  };

  const benefits = [
    "Health, dental, and vision insurance",
    "401(k) with company match",
    "Unlimited PTO",
    "Remote work options",
    "Professional development budget",
    "Stock options",
    "Parental leave",
  ];

  const requirements = [
    "3+ years of relevant experience",
    "Strong communication skills",
    "Bachelor's degree or equivalent experience",
    "Proven track record of success",
    "Experience with modern technologies",
    "Ability to work in a fast-paced environment",
    "Strong problem-solving skills",
  ];

  return Array.from({ length: count }, (_, i) => {
    const department = departments[i % departments.length];
    const titleOptions = jobTitles[department as keyof typeof jobTitles] || jobTitles.Engineering;
    const titleIndex = Math.floor(seededRandom(i * 2) * titleOptions.length);
    const title = titleOptions[titleIndex];
    const typeIndex = Math.floor(seededRandom(i * 3) * types.length);
    const type = types[typeIndex];
    const levelIndex = Math.floor(seededRandom(i * 5) * levels.length);
    const level = levels[levelIndex];
    const daysAgo = seededRandom(i * 7) * 30;
    const posted = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const featured = seededRandom(i * 11) > 0.7;
    const urgent = featured && seededRandom(i * 13) > 0.6;

    const baseSalary = {
      entry: { min: 60_000, max: 80_000 },
      mid: { min: 80_000, max: 120_000 },
      senior: { min: 120_000, max: 180_000 },
      lead: { min: 150_000, max: 250_000 },
    };

    // Extract nested ternary for better readability
    let salaryMultiplier = 1;
    if (type === "contract") {
      salaryMultiplier = 1.2;
    } else if (type === "internship") {
      salaryMultiplier = 0.3;
    }
    const salary = baseSalary[level];

    return {
      id: `job-${i + 1}`,
      title,
      department,
      location: locations[Math.floor(seededRandom(i * 17) * locations.length)],
      type,
      salaryRange: {
        min: Math.floor(salary.min * salaryMultiplier),
        max: Math.floor(salary.max * salaryMultiplier),
        currency: "$",
        period: type === "contract" ? "hourly" : "yearly",
      },
      description: `We are looking for a talented ${title} to join our ${department} team. This is an exciting opportunity to work on cutting-edge projects and make a real impact. You'll be working with a passionate team dedicated to building innovative solutions that help our customers succeed.`,
      requirements: requirements.slice(0, 5 + Math.floor(seededRandom(i * 19) * 2)),
      responsibilities: [
        "Lead and execute key projects from inception to completion",
        "Collaborate with cross-functional teams to deliver high-quality solutions",
        "Mentor junior team members and contribute to team growth",
        "Drive continuous improvement and innovation",
        "Ensure quality deliverables and maintain high standards",
      ],
      benefits: benefits.slice(0, 5 + Math.floor(seededRandom(i * 23) * 2)),
      posted,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      featured,
      urgent,
      experienceLevel: level,
      companyName: companies[Math.floor(seededRandom(i * 29) * companies.length)],
      applyUrl: "#apply",
    };
  });
};

const sampleJobs = generateSampleJobs(20);

export function JobListingsShowcasePage() {
  usePageMetadata({
    title: "Job Listings Block",
    description: "Display job openings with filtering, search, and multiple layout options",
  });

  const [variant, setVariant] = useState<"grid" | "list" | "featured" | "departments" | "minimal">("grid");
  const [columns, setColumns] = useState<"1" | "2" | "3" | "4">("3");
  const [showSalary, setShowSalary] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [animated, setAnimated] = useState(true);

  const variantOptions = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
    { value: "featured", label: "Featured" },
    { value: "departments", label: "Departments" },
    { value: "minimal", label: "Minimal" },
  ];

  const columnOptions = [
    { value: "1", label: "1 Column" },
    { value: "2", label: "2 Columns" },
    { value: "3", label: "3 Columns" },
    { value: "4", label: "4 Columns" },
  ];

  const controls = [
    {
      type: "select" as const,
      label: "Variant",
      value: variant,
      onChange: setVariant,
      options: variantOptions,
    },
    {
      type: "select" as const,
      label: "Columns",
      value: columns,
      onChange: setColumns,
      options: columnOptions,
      hidden: variant === "list" || variant === "minimal",
    },
    {
      type: "toggle" as const,
      label: "Show Salary",
      value: showSalary,
      onChange: setShowSalary,
    },
    {
      type: "toggle" as const,
      label: "Show Filters",
      value: showFilters,
      onChange: setShowFilters,
    },
    {
      type: "toggle" as const,
      label: "Animated",
      value: animated,
      onChange: setAnimated,
    },
  ];

  const spec: ComponentSpec = {
    type: "JobListings",
    props: {
      jobs: sampleJobs,
      variant,
      columns,
      showSalary,
      showFilters,
      showSearch: showFilters,
      animated,
      onApply: (job: JobListing) => {
        console.log("Applied to:", job);
        alert(`Applied to: ${job.title} at ${job.companyName}`);
      },
    },
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Job Listings"
        description="Display job openings with advanced filtering, search functionality, and multiple layout variants. Perfect for career pages and job boards."
      />

      <div className="container mx-auto px-4 py-8">
        <div className={spacing.default}>
          {/* Feature Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-8">
            <Heading as="h2" size="section" className="mb-4">
              Key Features
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Text className="font-semibold mb-2">🔍 Advanced Filtering</Text>
                <Text size="small" variant="muted">
                  Filter by department, location, job type, and sort by date or salary
                </Text>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Text className="font-semibold mb-2">📱 Responsive Layouts</Text>
                <Text size="small" variant="muted">
                  Multiple variants optimized for all screen sizes
                </Text>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Text className="font-semibold mb-2">✨ Rich Details</Text>
                <Text size="small" variant="muted">
                  Show salary ranges, requirements, benefits, and more
                </Text>
              </div>
            </div>
          </div>

          {/* Live Demo */}
          <ShowcaseWrapper
            title="Live Demo"
            description="Try different variants and configurations"
            controls={controls}
            spec={spec}
          >
            <JobListings
              jobs={sampleJobs}
              variant={variant}
              columns={columns}
              showSalary={showSalary}
              showFilters={showFilters}
              showSearch={showFilters}
              animated={animated}
              onApply={(job) => {
                console.log("Applied to:", job);
                alert(`Applied to: ${job.title} at ${job.companyName}`);
              }}
            />
          </ShowcaseWrapper>

          {/* Variant Examples */}
          <div className="space-y-12 mt-12">
            <section>
              <Heading as="h2" size="section" className="mb-6">
                Variant Examples
              </Heading>

              {/* Grid Variant */}
              <div className="mb-12">
                <Heading as="h3" size="subsection" className="mb-4">
                  Grid Variant
                </Heading>
                <Text variant="muted" className="mb-6">
                  Default card-based grid layout with customizable columns
                </Text>
                <JobListings
                  jobs={sampleJobs.slice(0, 6)}
                  variant="grid"
                  columns="3"
                  showFilters={false}
                />
              </div>

              {/* List Variant */}
              <div className="mb-12">
                <Heading as="h3" size="subsection" className="mb-4">
                  List Variant
                </Heading>
                <Text variant="muted" className="mb-6">
                  Detailed list view with more information visible at a glance
                </Text>
                <JobListings
                  jobs={sampleJobs.slice(0, 3)}
                  variant="list"
                  showFilters={false}
                />
              </div>

              {/* Featured Variant */}
              <div className="mb-12">
                <Heading as="h3" size="subsection" className="mb-4">
                  Featured Variant
                </Heading>
                <Text variant="muted" className="mb-6">
                  Highlight important positions with enhanced styling
                </Text>
                <JobListings
                  jobs={sampleJobs.slice(0, 6).map((job, i) => ({
                    ...job,
                    featured: i < 3,
                    urgent: i === 0,
                  }))}
                  variant="featured"
                  columns="3"
                  showFilters={false}
                />
              </div>

              {/* Departments Variant */}
              <div className="mb-12">
                <Heading as="h3" size="subsection" className="mb-4">
                  Departments Variant
                </Heading>
                <Text variant="muted" className="mb-6">
                  Group jobs by department for easy navigation
                </Text>
                <JobListings
                  jobs={sampleJobs.slice(0, 8)}
                  variant="departments"
                  columns="2"
                  showFilters={false}
                />
              </div>

              {/* Minimal Variant */}
              <div className="mb-12">
                <Heading as="h3" size="subsection" className="mb-4">
                  Minimal Variant
                </Heading>
                <Text variant="muted" className="mb-6">
                  Compact list for space-constrained layouts
                </Text>
                <JobListings
                  jobs={sampleJobs.slice(0, 5)}
                  variant="minimal"
                  showFilters={false}
                  showSalary={false}
                />
              </div>
            </section>
          </div>

          {/* Usage Example */}
          <section className="mt-12">
            <Heading as="h2" size="section" className="mb-6">
              Usage Example
            </Heading>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`{
  type: "JobListings",
  props: {
    jobs: [
      {
        id: "1",
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "full-time",
        salaryRange: {
          min: 150000,
          max: 200000,
          currency: "$",
          period: "yearly"
        },
        description: "Join our team to build amazing products...",
        requirements: [
          "5+ years of React experience",
          "Strong TypeScript skills",
          "Experience with modern frontend tools"
        ],
        posted: "2024-01-15",
        featured: true,
        experienceLevel: "senior",
        companyName: "TechCorp"
      }
    ],
    variant: "grid",
    columns: "3",
    showFilters: true,
    showSearch: true,
    showSalary: true,
    animated: true
  }
}`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}