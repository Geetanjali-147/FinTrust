# FinTrust Style Guide

## Overview

This style guide documents the actual visual design system, typography, color palette, spacing, and component styling patterns used throughout the FinTrust application. Based on the actual codebase, this guide reflects the real styling implementation using Tailwind CSS v4 with OKLCH color system.

## Design Principles

### 1. Modern Minimalism with Premium Aesthetics
- Clean, uncluttered interfaces with premium dark theme
- Generous whitespace and breathing room
- Focus on content and functionality
- Subtle visual hierarchy with OKLCH color system

### 2. Accessibility First
- OKLCH-based color system for perceptual uniformity
- High contrast ratios for text and interactive elements
- Clear focus states with ring effects
- Semantic HTML structure with proper ARIA attributes

### 3. Responsive Design
- Mobile-first approach with Tailwind's responsive utilities
- Progressive enhancement for larger screens
- Flexible grid systems with CSS Grid and Flexbox
- Touch-friendly interactions

### 4. Consistent Branding
- Unified OKLCH color palette for consistent appearance
- Consistent typography hierarchy using Geist font
- Standardized component patterns via shadcn/ui
- Cohesive visual language across all pages

## Color System (OKLCH-based)

### Root Theme Colors
```css
:root {
  --background: oklch(0.12 0 0);           /* Deep black background */
  --foreground: oklch(0.98 0 0);           /* Pure white text */
  --card: oklch(0.16 0 0);                 /* Card background */
  --card-foreground: oklch(0.98 0 0);      /* Card text */
  --popover: oklch(0.16 0 0);              /* Popover background */
  --popover-foreground: oklch(0.98 0 0);   /* Popover text */
  --primary: oklch(0.98 0 0);              /* Primary text (white) */
  --primary-foreground: oklch(0.12 0 0);   /* Primary background (black) */
  --secondary: oklch(0.24 0 0);            /* Secondary background */
  --secondary-foreground: oklch(0.98 0 0); /* Secondary text */
  --muted: oklch(0.24 0 0);                /* Muted background */
  --muted-foreground: oklch(0.65 0 0);     /* Muted text */
  --accent: oklch(0.72 0.15 240);          /* Accent blue */
  --accent-foreground: oklch(0.98 0 0);    /* Accent text */
  --destructive: oklch(0.55 0.25 27);      /* Destructive orange */
  --destructive-foreground: oklch(0.98 0 0); /* Destructive text */
  --border: oklch(0.28 0 0);               /* Border color */
  --input: oklch(0.24 0 0);                /* Input background */
  --ring: oklch(0.72 0.15 240);            /* Focus ring */
}
```

### Dark Theme Colors
```css
.dark {
  --background: oklch(0.12 0.04 260);      /* Premium midnight blue */
  --foreground: oklch(0.98 0.02 260);      /* White with blue tint */
  --card: oklch(0.17 0.05 260);            /* Card with blue tint */
  --primary: oklch(0.70 0.20 250);         /* Electric blue */
  --primary-foreground: oklch(0.10 0.05 260); /* Dark background */
  --secondary: oklch(0.30 0.10 260);       /* Secondary with blue */
  --muted: oklch(0.25 0.05 260);           /* Muted with blue */
  --accent: oklch(0.35 0.12 260);          /* Accent with blue */
  --destructive: oklch(0.5 0.25 25);       /* Orange-red */
  --border: oklch(0.30 0.08 260);          /* Border with blue */
  --input: oklch(0.30 0.08 260);           /* Input with blue */
  --ring: oklch(0.70 0.20 250);            /* Electric blue ring */
}
```

## Typography (Actual Implementation)

### Font Stack
```css
--font-sans: "Geist", "Geist Fallback";
--font-mono: "Geist Mono", "Geist Mono Fallback";
```

### Font Sizes (Tailwind Classes)
```css
/* From actual button component */
text-sm:     14px      /* Small text */
text-base:   16px      /* Base text */
text-lg:     18px      /* Large text */

/* From actual card component */
text-sm:     14px      /* Card descriptions */
font-semibold:         /* Bold headings */
```

### Font Weights
```css
font-medium: 500       /* Default button text */
font-semibold: 600     /* Card titles and headings */
```

### Line Heights
```css
/* From actual input component */
text-base:   16px      /* Base line height */
leading-6:   1.5rem    /* 24px line height for inputs */
```

### Letter Spacing
```css
/* From actual implementation - using default spacing */
tracking-normal: 0em   /* Standard letter spacing */
```

## Spacing Scale

### Base Unit: 4px (0.25rem)
All spacing uses a 4px base unit for consistency.

```css
space-0:     0px       /* 0rem */
space-1:     4px       /* 0.25rem */
space-2:     8px       /* 0.5rem */
space-3:     12px      /* 0.75rem */
space-4:     16px      /* 1rem */
space-5:     20px      /* 1.25rem */
space-6:     24px      /* 1.5rem */
space-8:     32px      /* 2rem */
space-10:    40px      /* 2.5rem */
space-12:    48px      /* 3rem */
space-16:    64px      /* 4rem */
space-20:    80px      /* 5rem */
space-24:    96px      /* 6rem */
space-32:    128px     /* 8rem */
```

### Padding and Margin
```css
p-0:       padding: 0px
p-1:       padding: 4px
p-2:       padding: 8px
p-3:       padding: 12px
p-4:       padding: 16px
p-5:       padding: 20px
p-6:       padding: 24px
px-4:      padding-left: 16px; padding-right: 16px
py-6:      padding-top: 24px; padding-bottom: 24px
mx-2:      margin-left: 8px; margin-right: 8px
my-4:      margin-top: 16px; margin-bottom: 16px
```

## Component Styling Patterns (Actual Implementation)

### Buttons (shadcn/ui)

#### Base Button Implementation
```tsx
// From components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
```

#### Button Usage Examples
```tsx
// Default button
<Button>Click me</Button>

// Destructive button
<Button variant="destructive">Delete</Button>

// Small button
<Button size="sm">Small</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Icons.edit className="h-4 w-4" />
</Button>
```

### Cards (shadcn/ui)

#### Card Implementation
```tsx
// From components/ui/card.tsx
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}
```

#### Card Usage Examples
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    <Button>Save changes</Button>
  </CardFooter>
</Card>
```

### Inputs (shadcn/ui)

#### Input Implementation
```tsx
// From components/ui/input.tsx
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
```

#### Input Usage Examples
```tsx
<Input
  id="email"
  type="email"
  placeholder="Enter your email"
  className="w-full"
/>

<Input
  id="password"
  type="password"
  placeholder="Enter your password"
  className="w-full"
/>
```

### Dashboard Sidebar (Custom Component)

#### Sidebar Implementation
```tsx
// From components/dashboard-sidebar.tsx
export function DashboardSidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Applications",
            icon: CreditCard,
            href: "/dashboard/applications",
            active: pathname?.startsWith("/dashboard/applications"),
        },
        {
            label: "Customers",
            icon: Users,
            href: "/dashboard/customers",
            active: pathname?.startsWith("/dashboard/customers"),
        },
        {
            label: "Analytics",
            icon: BarChart3,
            href: "/dashboard/analytics",
            active: pathname?.startsWith("/dashboard/analytics"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname?.startsWith("/dashboard/settings"),
        },
    ]

    return (
        <div className={cn("pb-12 h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Link href="/" className="flex items-center pl-3 mb-9">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">FinTrust</h2>
                    </Link>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        User
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/dashboard/profile">
                                <UserCircle className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Back to Website
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
```

## Layout Patterns (Actual Implementation)

### Grid System
```css
/* From actual dashboard layout */
.flex h-screen overflow-hidden {
  /* Main dashboard container */
}

/* From actual dashboard sidebar */
.pb-12 h-screen border-r bg-background {
  /* Sidebar container */
}

/* From actual card implementation */
@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 {
  /* Card header grid */
}
```

### Flexbox Utilities (From Actual Usage)
```css
/* From actual button implementation */
.inline-flex items-center justify-center gap-2 {
  /* Button layout */
}

/* From actual card implementation */
.flex flex-col gap-6 {
  /* Card container */
}

/* From actual dashboard layout */
.flex-1 flex flex-col overflow-hidden {
  /* Main content area */
}

/* From actual sidebar implementation */
.flex items-center pl-3 mb-9 {
  /* Logo container */
}

/* From actual navigation items */
.flex items-center gap-12px {
  /* Navigation item layout */
}
```

### Container Patterns
```css
/* From actual application */
.container mx-auto px-4 md:px-6 max-w-7xl {
  /* Main content container */
}

/* From actual dashboard */
.space-y-4 py-4 {
  /* Sidebar sections */
}

/* From actual card content */
.px-6 {
  /* Card content padding */
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile First */
/* Base styles for mobile */

/* Small devices (sm) */
@media (min-width: 640px) {
  /* Tablet styles */
}

/* Medium devices (md) */
@media (min-width: 768px) {
  /* Desktop styles */
}

/* Large devices (lg) */
@media (min-width: 1024px) {
  /* Large desktop styles */
}

/* Extra large devices (xl) */
@media (min-width: 1280px) {
  /* Extra large desktop styles */
}
```

### Responsive Utilities
```css
/* Hide on mobile */
.hidden-mobile {
  @media (max-width: 639px) {
    display: none;
  }
}

/* Hide on desktop */
.hidden-desktop {
  @media (min-width: 768px) {
    display: none;
  }
}

/* Responsive padding */
.p-responsive {
  padding: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
  
  @media (min-width: 1024px) {
    padding: 32px;
  }
}
```

## Animation and Transitions (Actual Implementation)

### Standard Transitions
```css
/* From actual button implementation */
transition-all {
  /* All properties transition */
}

/* From actual button implementation */
transition-[color,box-shadow] {
  /* Input specific transitions */
}
```

### Hover Effects (From Actual Usage)
```css
/* From actual button variants */
hover:bg-primary/90 {
  /* Button hover effect */
}

hover:bg-accent {
  /* Accent hover effect */
}

hover:text-accent-foreground {
  /* Text hover effect */
}

hover:bg-accent/50 {
  /* Semi-transparent hover */
}
```

### Focus States (From Actual Implementation)
```css
/* From actual button implementation */
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] {
  /* Button focus ring */
}

/* From actual input implementation */
focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] {
  /* Input focus ring */
}

/* From actual button implementation */
aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive {
  /* Error state styling */
}
```

### Animation Classes (From Tailwind)
```css
/* From actual usage */
animate-in {
  /* Entrance animations */
}

animate-out {
  /* Exit animations */
}

/* From actual button implementation */
shadow-xs {
  /* Subtle shadow */
}

/* From actual card implementation */
shadow-sm {
  /* Small shadow */
}
```

## Accessibility Guidelines (Actual Implementation)

### Color Contrast (OKLCH System)
- Uses OKLCH color system for perceptual uniformity
- High contrast ratios built into theme variables
- WCAG AA compliance through color palette design
- Semantic color names for accessibility

### Keyboard Navigation
- All interactive elements use `outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`
- Logical tab order maintained through DOM structure
- Focus indicators visible with ring effects
- Skip links and proper heading hierarchy

### Screen Reader Support
- Uses semantic HTML elements throughout
- Proper ARIA attributes in components
- Meaningful alt text for icons and images
- Form labels and descriptions for inputs

### Motion Preferences
```css
/* From actual globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Management
```css
/* From actual implementation */
outline: 2px solid var(--ring);
outline-offset: 2px;
```

## Iconography (Actual Implementation)

### Icon Sizes (From Lucide React)
```tsx
// From actual usage in components
mr-2 h-4 w-4 {
  /* Standard icon size in buttons */
}

h-10 w-10 {
  /* Large icon size */
}

h-5 w-5 {
  /* Medium icon size */
}

h-3 w-3 {
  /* Small icon size */
}
```

### Icon Colors (From Actual Usage)
```tsx
// From actual button implementation
mr-2 h-4 w-4 {
  /* Icons inherit text color */
}

// From actual usage
text-primary {
  /* Primary colored icons */
}

text-muted-foreground {
  /* Muted icons */
}

text-destructive {
  /* Destructive state icons */
}
```

### Icon Implementation Pattern
```tsx
// From actual dashboard sidebar
<route.icon className="mr-2 h-4 w-4" />

// From actual usage
<UserCircle className="mr-2 h-4 w-4" />
<Home className="mr-2 h-4 w-4" />
```

## Implementation Notes

### CSS-in-JS Patterns
```tsx
// Example component with styled classes
const Button = ({ variant = 'default', size = 'default', children }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  }
  
  const sizeClasses = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md gap-1.5 px-3',
    lg: 'h-10 rounded-md px-6',
    icon: 'size-9'
  }
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </button>
  )
}
```

### Component Consistency
- Use consistent class naming patterns
- Follow the BEM methodology for complex components
- Maintain consistent spacing and sizing
- Use semantic class names

### Performance Considerations
- Minimize CSS-in-JS for better performance
- Use CSS variables for theming
- Implement lazy loading for heavy components
- Optimize images and assets

This style guide ensures consistent, accessible, and maintainable styling across the FinTrust application. All developers should reference this guide when creating new components or modifying existing styles.
