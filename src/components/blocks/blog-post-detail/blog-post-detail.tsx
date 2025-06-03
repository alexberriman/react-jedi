import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaRedditAlien, 
  FaEnvelope,
  FaLink,
  FaGithub
} from 'react-icons/fa'
import { cn } from '../../../lib/utils'
import { Card } from '../../ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar'
import { Badge } from '../../ui/badge'
import { Image } from '../../ui/image'

export interface RelatedPost {
  id: string
  title: string
  excerpt: string
  image?: string
  url: string
  readTime?: number
  category?: string
}

export interface PostNavigationLink {
  title: string
  url: string
}

export interface BlogPostAuthor {
  name: string
  avatar?: string
  bio?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface BlogPostDetailProps {
  variant?: 'centered' | 'with-sidebar' | 'magazine' | 'minimal'
  title: string
  content: string
  heroImage?: {
    src: string
    alt: string
    caption?: string
  }
  author: BlogPostAuthor
  publishDate: string
  readTime?: number
  categories?: string[]
  tags?: string[]
  relatedPosts?: RelatedPost[]
  prevPost?: PostNavigationLink
  nextPost?: PostNavigationLink
  showComments?: boolean
  showShareButtons?: boolean
  showToc?: boolean
  showProgressBar?: boolean
  animated?: boolean
  className?: string
}

interface TableOfContentsItem {
  id: string
  text: string
  level: number
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi
  const toc: TableOfContentsItem[] = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = Number.parseInt(match[1])
    const text = match[2].trim()
    const id = text.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')
    toc.push({ id, text, level })
  }
  
  return toc
}

function ReadingProgressBar({ show, animated }: { readonly show: boolean; readonly animated: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!show) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [show])

  if (!show) return null

  const ProgressComponent = animated ? motion.div : 'div'
  const progressProps = animated ? {
    initial: { scaleX: 0 },
    animate: { scaleX: progress / 100 },
    transition: { duration: 0.1 }
  } : {
    style: { transform: `scaleX(${progress / 100})` }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/20">
      <ProgressComponent
        className="h-full bg-primary origin-left"
        {...progressProps}
      />
    </div>
  )
}

function TableOfContents({ items, animated }: { readonly items: readonly TableOfContentsItem[]; readonly animated: boolean }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map(item => document.querySelector(`#${CSS.escape(item.id)}`)).filter(Boolean)
      
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveId(heading.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const handleClick = useCallback((id: string) => {
    const element = document.querySelector(`#${CSS.escape(id)}`)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const Component = animated ? motion.div : 'div'
  const componentProps = animated ? {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.3 }
  } : {}

  return (
    <Component className="space-y-2" {...componentProps}>
      <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li 
              key={item.id} 
              style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "text-sm text-left w-full hover:text-primary transition-colors",
                  activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Component>
  )
}

function ShareButtons({ url, title, animated }: { readonly url: string; readonly title: string; readonly animated: boolean }) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    globalThis.setTimeout(() => setCopied(false), 2000)
  }

  const buttons = [
    { icon: FaTwitter, href: shareLinks.twitter, label: 'Twitter' },
    { icon: FaFacebookF, href: shareLinks.facebook, label: 'Facebook' },
    { icon: FaLinkedinIn, href: shareLinks.linkedin, label: 'LinkedIn' },
    { icon: FaRedditAlien, href: shareLinks.reddit, label: 'Reddit' },
    { icon: FaEnvelope, href: shareLinks.email, label: 'Email' }
  ]

  const Component = animated ? motion.div : 'div'
  const componentProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.4 }
  } : {}

  return (
    <Component className="flex items-center gap-2" {...componentProps}>
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      {buttons.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label={`Share on ${label}`}
        >
          <Icon size={16} />
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        aria-label="Copy link"
      >
        <FaLink size={16} />
      </button>
      {copied && (
        <span className="text-sm text-green-600 ml-2">Copied!</span>
      )}
    </Component>
  )
}

function AuthorBio({ author, animated }: { readonly author: BlogPostAuthor; readonly animated: boolean }) {
  const Component = animated ? motion.div : 'div'
  const componentProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5 }
  } : {}

  return (
    <Component {...componentProps}>
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{author.name}</h3>
            {author.bio && (
              <p className="text-muted-foreground mt-2">{author.bio}</p>
            )}
            {author.social && (
              <div className="flex gap-3 mt-4">
                {author.social.twitter && (
                  <a
                    href={`https://twitter.com/${author.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={18} />
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${author.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                )}
                {author.social.github && (
                  <a
                    href={`https://github.com/${author.social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Component>
  )
}

function RelatedPosts({ posts, animated }: { readonly posts: readonly RelatedPost[]; readonly animated: boolean }) {
  const Component = animated ? motion.div : 'div'
  const componentProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6 }
  } : {}

  return (
    <Component {...componentProps}>
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {post.image && (
              <div className="aspect-video relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              {post.category && (
                <Badge variant="secondary" className="mb-2">
                  {post.category}
                </Badge>
              )}
              <h4 className="font-semibold mb-2 line-clamp-2">
                <a href={post.url} className="hover:text-primary transition-colors">
                  {post.title}
                </a>
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              {post.readTime && (
                <p className="text-xs text-muted-foreground mt-2">
                  {post.readTime} min read
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Component>
  )
}

function PostNavigation({ prevPost, nextPost, animated }: { 
  readonly prevPost?: PostNavigationLink; 
  readonly nextPost?: PostNavigationLink;
  readonly animated: boolean 
}) {
  const Component = animated ? motion.div : 'div'
  const componentProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.7 }
  } : {}

  return (
    <Component 
      className="flex flex-col sm:flex-row justify-between gap-4 py-8 border-t"
      {...componentProps}
    >
      {prevPost ? (
        <a
          href={prevPost.url}
          className="flex-1 group"
        >
          <div className="text-sm text-muted-foreground mb-1">← Previous</div>
          <div className="font-medium group-hover:text-primary transition-colors">
            {prevPost.title}
          </div>
        </a>
      ) : (
        <div className="flex-1" />
      )}
      {nextPost && (
        <a
          href={nextPost.url}
          className="flex-1 text-right group"
        >
          <div className="text-sm text-muted-foreground mb-1">Next →</div>
          <div className="font-medium group-hover:text-primary transition-colors">
            {nextPost.title}
          </div>
        </a>
      )}
    </Component>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function ArticleHeader({ 
  title, 
  categories, 
  publishDate, 
  readTime 
}: { 
  readonly title: string
  readonly categories: readonly string[]
  readonly publishDate: string
  readonly readTime: number
}) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>
      
      <h1 className="text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h1>
      
      <div className="flex items-center gap-4 text-muted-foreground">
        <span>{formatDate(publishDate)}</span>
        <span>•</span>
        <span>{readTime} min read</span>
      </div>
    </header>
  )
}

function TagsSection({ tags }: { readonly tags: readonly string[] }) {
  if (tags.length === 0) return null
  
  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Tags:</span>
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function CommentsPlaceholder() {
  return (
    <div className="mt-12">
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Comments section placeholder - integrate with your preferred commenting system
        </p>
      </Card>
    </div>
  )
}

function HeroImage({ 
  heroImage, 
  variant, 
  onImageClick 
}: { 
  readonly heroImage: { src: string; alt: string; caption?: string } | undefined
  readonly variant: string
  readonly onImageClick: (image: { src: string; alt: string }) => void
}) {
  if (!heroImage) return null
  
  return (
    <div className={cn(
      "mb-8",
      variant === 'magazine' && "-mx-4 lg:-mx-0"
    )}>
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        className="w-full h-auto rounded-lg cursor-pointer"
        onClick={() => onImageClick(heroImage)}
      />
      {heroImage.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {heroImage.caption}
        </p>
      )}
    </div>
  )
}

function ImageLightbox({ src, alt, onClose }: { readonly src: string; readonly alt: string; readonly onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  )
}

export default function BlogPostDetail({
  variant = 'centered',
  title,
  content,
  heroImage,
  author,
  publishDate,
  readTime,
  categories = [],
  tags = [],
  relatedPosts = [],
  prevPost,
  nextPost,
  showComments = true,
  showShareButtons = true,
  showToc = true,
  showProgressBar = true,
  animated = true,
  className,
  ...properties
}: Readonly<BlogPostDetailProps>) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const calculatedReadTime = readTime || calculateReadTime(content)
  const toc = extractTableOfContents(content)

  useEffect(() => {
    // Add IDs to headings for TOC navigation
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')
      for (const heading of headings) {
        const text = heading.textContent || ''
        const id = text.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')
        heading.id = id
      }

      // Add click handlers to images for lightbox
      const images = contentRef.current.querySelectorAll('img')
      for (const img of images) {
        img.style.cursor = 'pointer'
        img.addEventListener('click', () => {
          setLightboxImage({ src: img.src, alt: img.alt })
        })
      }
    }
  }, [content])


  const containerClasses = cn(
    "min-h-screen",
    variant === 'centered' && "max-w-4xl mx-auto px-4 py-8",
    variant === 'with-sidebar' && "max-w-7xl mx-auto px-4 py-8",
    variant === 'magazine' && "max-w-7xl mx-auto",
    variant === 'minimal' && "max-w-3xl mx-auto px-4 py-12",
    className
  )

  const ArticleComponent = animated ? motion.article : 'article'
  const articleProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {}

  return (
    <>
      <ReadingProgressBar show={showProgressBar} animated={animated} />
      
      <div className={containerClasses} {...properties}>
        {variant === 'with-sidebar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <ArticleComponent {...articleProps}>
              <HeroImage 
                heroImage={heroImage}
                variant={variant}
                onImageClick={setLightboxImage}
              />

              <ArticleHeader 
                title={title}
                categories={categories}
                publishDate={publishDate}
                readTime={calculatedReadTime}
              />

              <div 
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <TagsSection tags={tags} />

              {showShareButtons && (
                <div className="mt-8">
                  <ShareButtons 
                    url={globalThis.window === undefined ? '#' : globalThis.location.href} 
                    title={title}
                    animated={animated}
                  />
                </div>
              )}

              <div className="mt-12">
                <AuthorBio author={author} animated={animated} />
              </div>

              {showComments && <CommentsPlaceholder />}
            </ArticleComponent>

            <aside className="space-y-8">
              {showToc && toc.length > 0 && (
                <Card className="p-6 sticky top-20">
                  <TableOfContents items={toc} animated={animated} />
                </Card>
              )}
              
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 3).map((post) => (
                      <Card key={post.id} className="p-4">
                        <h4 className="font-medium mb-1 line-clamp-2">
                          <a href={post.url} className="hover:text-primary transition-colors">
                            {post.title}
                          </a>
                        </h4>
                        {post.readTime && (
                          <p className="text-sm text-muted-foreground">
                            {post.readTime} min read
                          </p>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        ) : (
          <ArticleComponent {...articleProps}>
            <HeroImage 
              heroImage={heroImage}
              variant={variant}
              onImageClick={setLightboxImage}
            />

            <div className="text-center">
              <ArticleHeader 
                title={title}
                categories={categories}
                publishDate={publishDate}
                readTime={calculatedReadTime}
              />
            </div>

            <div 
              ref={contentRef}
              className={cn(
                "prose dark:prose-invert max-w-none",
                variant === 'magazine' ? "prose-xl" : "prose-lg"
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="flex justify-center">
              <TagsSection tags={tags} />
            </div>

            {showShareButtons && (
              <div className="mt-8 flex justify-center">
                <ShareButtons 
                  url={globalThis.window === undefined ? '#' : globalThis.location.href} 
                  title={title}
                  animated={animated}
                />
              </div>
            )}

            <div className="mt-12 max-w-3xl mx-auto">
              <AuthorBio author={author} animated={animated} />
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <RelatedPosts posts={relatedPosts} animated={animated} />
              </div>
            )}

            {(prevPost || nextPost) && (
              <PostNavigation 
                prevPost={prevPost} 
                nextPost={nextPost}
                animated={animated}
              />
            )}

            {showComments && (
              <div className="max-w-3xl mx-auto">
                <CommentsPlaceholder />
              </div>
            )}
          </ArticleComponent>
        )}
      </div>

      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  )
}