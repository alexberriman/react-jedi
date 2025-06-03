import React, { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { motion, Variants } from "framer-motion";
import { IconType } from "react-icons";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaSearch } from "react-icons/fa";

export interface SocialLink {
  platform: "linkedin" | "twitter" | "email" | "phone" | "custom";
  url: string;
  icon?: IconType;
  label?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  department?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
  location?: string;
  joinDate?: string;
  skills?: string[];
  achievements?: string[];
}

export interface TeamGridProps {
  members: TeamMember[];
  variant?: "grid" | "list" | "minimal" | "cards" | "org-chart";
  columns?: "1" | "2" | "3" | "4" | "5" | "6" | "auto";
  gap?: "sm" | "md" | "lg" | "xl";
  showDepartmentFilter?: boolean;
  showSearch?: boolean;
  showModal?: boolean;
  showSocialLinks?: boolean;
  showContactInfo?: boolean;
  departments?: string[];
  animated?: boolean;
  staggerDelay?: number;
  hoverEffect?: "none" | "lift" | "glow" | "scale" | "tilt";
  avatarSize?: "sm" | "md" | "lg" | "xl";
  alignment?: "left" | "center" | "right";
  showBio?: boolean;
  maxBioLength?: number;
  className?: string;
  children?: React.ReactNode;
}

const avatarSizes = {
  sm: "h-12 w-12",
  md: "h-16 w-16", 
  lg: "h-20 w-20",
  xl: "h-24 w-24",
};

const columnClasses = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  "5": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  "6": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
  tilt: "hover:rotate-1 transition-transform duration-300",
};

const alignmentClasses = {
  left: "text-left items-start",
  center: "text-center items-center", 
  right: "text-right items-end",
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

const getSocialIcon = (platform: string): IconType => {
  switch (platform) {
    case "linkedin": {
      return FaLinkedin;
    }
    case "twitter": {
      return FaTwitter;
    }
    case "email": {
      return FaEnvelope;
    }
    case "phone": {
      return FaPhone;
    }
    default: {
      return FaEnvelope;
    }
  }
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const truncateBio = (bio: string, maxLength: number): string => {
  if (bio.length <= maxLength) return bio;
  return bio.slice(0, maxLength).trim() + "...";
};

interface TeamMemberCardProps {
  member: TeamMember;
  variant: TeamGridProps["variant"];
  avatarSize: NonNullable<TeamGridProps["avatarSize"]>;
  alignment: NonNullable<TeamGridProps["alignment"]>;
  showSocialLinks: boolean;
  showContactInfo: boolean;
  showModal: boolean;
  showBio: boolean;
  maxBioLength: number;
  hoverEffect: NonNullable<TeamGridProps["hoverEffect"]>;
  animated: boolean;
  animationDelay: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  variant,
  avatarSize,
  alignment,
  showSocialLinks,
  showContactInfo,
  showModal,
  showBio,
  maxBioLength,
  hoverEffect,
  animated,
  animationDelay,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderSocialLinks = (): React.ReactElement => {
    if (!showSocialLinks || !member.socialLinks?.length) return <></>;

    return (
      <div className="flex gap-2 justify-center mt-3">
        {member.socialLinks.map((link, index) => {
          const IconComponent = link.icon || getSocialIcon(link.platform);
          const handleClick = () => {
            if (link.platform === "email") {
              globalThis.location.href = `mailto:${link.url}`;
            } else if (link.platform === "phone") {
              globalThis.location.href = `tel:${link.url}`;
            } else {
              window.open(link.url, "_blank", "noopener,noreferrer");
            }
          };

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={handleClick}
              className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
              aria-label={link.label || `${member.name} ${link.platform}`}
            >
              <IconComponent className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
    );
  };

  const renderContactInfo = (): React.ReactElement => {
    if (!showContactInfo) return <></>;

    return (
      <div className="space-y-1 text-sm text-muted-foreground">
        {member.email && (
          <div className="flex items-center gap-2">
            <FaEnvelope className="h-3 w-3" />
            <span className="truncate">{member.email}</span>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center gap-2">
            <FaPhone className="h-3 w-3" />
            <span>{member.phone}</span>
          </div>
        )}
      </div>
    );
  };

  const renderDetailedModal = (): React.ReactElement | null => {
    if (!showModal) return null;

    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="h-32 w-32 mx-auto sm:mx-0">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-2xl">{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{member.role}</h3>
                {member.department && (
                  <Badge variant="secondary" className="mt-1">
                    {member.department}
                  </Badge>
                )}
              </div>
              {member.location && (
                <p className="text-sm text-muted-foreground">📍 {member.location}</p>
              )}
              {member.joinDate && (
                <p className="text-sm text-muted-foreground">🗓️ Joined {member.joinDate}</p>
              )}
            </div>
          </div>

          {member.bio && (
            <div>
              <h4 className="font-medium mb-2">About</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          )}

          {member.skills && member.skills.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {member.achievements && member.achievements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Achievements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {member.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {renderContactInfo()}
            {renderSocialLinks()}
          </div>
        </div>
      </DialogContent>
    );
  };

  const renderMinimalVariant = (): React.ReactElement => {
    const content = (
      <div className={cn("flex items-center gap-3 p-3 rounded-lg", hoverEffects[hoverEffect])}>
        <Avatar className={avatarSizes[avatarSize]}>
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium truncate">{member.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{member.role}</p>
          {member.department && (
            <Badge variant="outline" className="text-xs mt-1">
              {member.department}
            </Badge>
          )}
        </div>
        {renderSocialLinks()}
      </div>
    );

    return content;
  };

  const renderListVariant = (): React.ReactElement => {
    const content = (
      <Card className={cn("w-full", hoverEffects[hoverEffect])}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className={avatarSizes[avatarSize]}>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
                {member.department && (
                  <Badge variant="secondary" className="mt-1">
                    {member.department}
                  </Badge>
                )}
              </div>
              {showBio && member.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {truncateBio(member.bio, maxBioLength)}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 items-start">
                {renderContactInfo()}
                {renderSocialLinks()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );

    return content;
  };

  const renderDefaultVariant = (): React.ReactElement => {
    const content = (
      <Card className={cn("h-full", hoverEffects[hoverEffect])}>
        <CardHeader className={cn("text-center space-y-4", alignmentClasses[alignment])}>
          <Avatar className={cn(avatarSizes[avatarSize], "mx-auto")}>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
            {member.department && (
              <Badge variant="secondary" className="text-xs">
                {member.department}
              </Badge>
            )}
          </div>
        </CardHeader>
        {(showBio && member.bio) || showContactInfo || showSocialLinks ? (
          <CardContent className={cn("pt-0 space-y-3", alignmentClasses[alignment])}>
            {showBio && member.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {truncateBio(member.bio, maxBioLength)}
              </p>
            )}
            {renderContactInfo()}
            {renderSocialLinks()}
          </CardContent>
        ) : null}
      </Card>
    );

    return content;
  };

  const getCardContent = (): React.ReactElement => {
    if (variant === "minimal") return renderMinimalVariant();
    if (variant === "list") return renderListVariant();
    return renderDefaultVariant();
  };

  const wrapWithModalAndAnimation = (content: React.ReactNode): React.ReactElement => {
    const wrappedContent = showModal ? (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">{content}</div>
        </DialogTrigger>
        {renderDetailedModal()}
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
 

export const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  variant = "grid",
  columns = "3",
  gap = "md",
  showDepartmentFilter = true,
  showSearch = true,
  showModal = true,
  showSocialLinks = true,
  showContactInfo = false,
  departments,
  animated = true,
  staggerDelay = 0.1,
  hoverEffect = "lift",
  avatarSize = "md",
  alignment = "center",
  showBio = true,
  maxBioLength = 120,
  className,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const allDepartments = useMemo(() => {
    if (departments) return departments;
    const depts = new Set(members.map(member => member.department).filter(Boolean));
    return [...depts] as string[];
  }, [members, departments]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = !searchQuery || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = selectedDepartment === "all" || 
        member.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [members, searchQuery, selectedDepartment]);

  const renderFilters = () => {
    if (!showSearch && !showDepartmentFilter) return null;

    return (
      <div className="mb-8 space-y-4">
        {showSearch && (
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {showDepartmentFilter && allDepartments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDepartment === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment("all")}
            >
              All Departments
            </Button>
            {allDepartments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (variant === "org-chart") {
    return (
      <div className={cn("space-y-8", className)}>
        {renderFilters()}
        <div className="space-y-6">
          {allDepartments.map((dept) => {
            const deptMembers = filteredMembers.filter(member => member.department === dept);
            if (deptMembers.length === 0) return null;

            return (
              <div key={dept} className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">{dept}</h3>
                <div className={cn("grid", columnClasses[columns], gapClasses[gap])}>
                  {deptMembers.map((member, index) => (
                    <TeamMemberCard
                      key={member.id || `${member.name}-${index}`}
                      member={member}
                      variant="cards"
                      avatarSize={avatarSize}
                      alignment={alignment}
                      showSocialLinks={showSocialLinks}
                      showContactInfo={showContactInfo}
                      showModal={showModal}
                      showBio={showBio}
                      maxBioLength={maxBioLength}
                      hoverEffect={hoverEffect}
                      animated={animated}
                      animationDelay={animated ? index * staggerDelay : 0}
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

  const gridClasses = variant === "list" ? "space-y-4" : cn("grid", columnClasses[columns], gapClasses[gap]);

  return (
    <div className={cn("space-y-8", className)}>
      {renderFilters()}
      <div className={gridClasses}>
        {filteredMembers.map((member, index) => (
          <TeamMemberCard
            key={member.id || `${member.name}-${index}`}
            member={member}
            variant={variant}
            avatarSize={avatarSize}
            alignment={alignment}
            showSocialLinks={showSocialLinks}
            showContactInfo={showContactInfo}
            showModal={showModal}
            showBio={showBio}
            maxBioLength={maxBioLength}
            hoverEffect={hoverEffect}
            animated={animated}
            animationDelay={animated ? index * staggerDelay : 0}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

TeamGrid.displayName = "TeamGrid";