# FinTrust Component Documentation

## Component Overview

This document provides detailed information about the components used in the FinTrust application, including their purpose, props, and usage patterns. The application uses Clerk authentication with role-based access control.

## Component Structure

### Root Components

#### Layout Components

##### `app/layout.tsx`
**Purpose**: Root layout component that wraps the entire application with Clerk authentication
**Features**:
- ClerkProvider integration for authentication
- Theme provider integration
- Analytics integration
- Metadata configuration
- Global styling

**Key Props**:
- `children`: React.ReactNode - Main application content

**Usage**:
```tsx
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

##### `app/dashboard/layout.tsx`
**Purpose**: Layout wrapper for authenticated dashboard pages
**Features**:
- Sidebar integration
- Header with Clerk UserButton
- Responsive layout structure
- Authentication state management

**Key Props**:
- `children`: React.ReactNode - Dashboard page content

**Usage**:
```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header>
          <AuthButtons />
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
```

### Authentication Components

#### Clerk Authentication System

##### `components/auth-buttons.tsx`
**Purpose**: Unified authentication interface with Clerk integration
**Features**:
- Clerk SignInButton and SignUpButton
- Clerk UserButton for authenticated users
- Role indicators for different user types
- Custom styling to match FinTrust design

**Key Props**: None (self-contained component)

**Usage**:
```tsx
import { AuthButtons } from "@/components/auth-buttons"

export default function Header() {
  return (
    <header>
      <AuthButtons />
    </header>
  )
}
```

##### `app/login/page.tsx`
**Purpose**: Clerk sign-in page with custom styling
**Features**:
- Clerk SignIn component with custom appearance
- Multi-language support
- Role-based redirect logic
- Custom input and button styling

**Key Props**: None (standalone page)

**Usage**: Accessed via `/login` route

##### `app/sign-up/page.tsx`
**Purpose**: Role selection interface before Clerk sign-up
**Features**:
- Role selection between Beneficiary and Officer
- Redirects to appropriate sign-up flow
- Multi-language support
- Custom card-based interface

**Key Props**: None (standalone page)

**Usage**: Accessed via `/sign-up` route

#### Role-Based Sign-up Components

##### `components/beneficiary-signup.tsx`
**Purpose**: Custom sign-up flow for loan applicants (beneficiaries)
**Features**:
- Clerk SignUp component with beneficiary-specific styling
- Role assignment to localStorage
- Automatic redirect to onboarding after sign-up
- Multi-language support

**Key Props**: None (standalone component)

**Usage**: Accessed via role selection on `/sign-up` page

##### `components/officer-signup.tsx`
**Purpose**: Custom sign-up flow for loan officers
**Features**:
- Clerk SignUp component with officer-specific styling
- Role assignment to localStorage
- Automatic redirect to officer applications after sign-up
- Multi-language support

**Key Props**: None (standalone component)

**Usage**: Accessed via role selection on `/sign-up` page

##### `components/role-assignment.tsx`
**Purpose**: Post-sign-up role assignment and user redirection
**Features**:
- Checks localStorage for pending role
- Assigns role to user metadata
- Redirects users to appropriate dashboard
- Handles authentication state changes

**Key Props**: None (self-contained component)

**Usage**: Included in app/layout.tsx for global role management

### Navigation Components

#### `components/dashboard-sidebar.tsx`
**Purpose**: Navigation sidebar for authenticated users
**Features**:
- Dynamic route highlighting
- Role-based menu items (different routes for beneficiaries vs officers)
- Responsive design
- Clerk authentication state integration

**Key Props**:
- `className`: string - Additional CSS classes

**Routes Configuration**:
```tsx
const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    active: pathname === "/dashboard",
  },
  // Role-specific routes based on user role
]
```

**Usage**:
```tsx
<DashboardSidebar className="hidden md:block w-64" />
```

### UI Components

#### Button Component (`components/ui/button.tsx`)
**Purpose**: Reusable button component with multiple variants
**Features**:
- Multiple variants (default, destructive, outline, secondary, ghost, link)
- Multiple sizes (default, sm, lg, icon variants)
- Accessibility features
- Loading states

**Key Props**:
```tsx
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
  asChild?: boolean
}
```

**Usage**:
```tsx
<Button variant="default" size="lg">Click me</Button>
<Button variant="outline" size="sm">Secondary</Button>
```

#### Card Component (`components/ui/card.tsx`)
**Purpose**: Container component for grouping related content
**Features**:
- Header, content, and footer sections
- Consistent styling
- Accessibility support

**Key Props**:
```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Usage**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Form Components

##### Input Component (`components/ui/input.tsx`)
**Purpose**: Styled input field component
**Features**:
- Consistent styling
- Accessibility attributes
- Multiple input types

**Key Props**:
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

**Usage**:
```tsx
<Input
  id="username"
  type="text"
  placeholder="Enter username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

##### Select Component (`components/ui/select.tsx`)
**Purpose**: Styled dropdown/select component
**Features**:
- Multiple select options
- Search functionality
- Keyboard navigation

**Key Props**:
```tsx
interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {}
```

**Usage**:
```tsx
<Select value={role} onValueChange={setRole}>
  <SelectTrigger>
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="beneficiary">Beneficiary</SelectItem>
    <SelectItem value="officer">Officer</SelectItem>
  </SelectContent>
</Select>
```

### Utility Components

#### Theme Provider (`components/theme-provider.tsx`)
**Purpose**: Manages application theme state
**Features**:
- Dark/light theme switching
- System theme detection
- Persistent theme storage

**Usage**:
```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

#### Badge Component (`components/ui/badge.tsx`)
**Purpose**: Small label component for status indicators
**Features**:
- Multiple variants (default, secondary, destructive, outline)
- Icon support
- Status indicators

**Key Props**:
```tsx
interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}
```

**Usage**:
```tsx
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
```

## Component Patterns

### Clerk Integration Pattern
All authentication components follow a consistent Clerk integration pattern:

```tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton>
          <Button variant="outline">Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  )
}
```

### Role-Based Component Pattern
Components check user roles for conditional rendering:

```tsx
import { useAuth } from "@clerk/nextjs"

export function DashboardContent() {
  const { isSignedIn, isLoaded } = useAuth()
  
  if (!isLoaded) return <LoadingSpinner />
  
  if (!isSignedIn) {
    return <Redirect to="/login" />
  }
  
  return (
    <div>
      {/* Role-specific content */}
    </div>
  )
}
```

### Props Interface Pattern
All components follow a consistent props interface pattern:

```tsx
interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  // Component-specific props
  variant?: 'option1' | 'option2'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

### State Management Pattern
Components use local state for UI interactions and Clerk for authentication:

```tsx
// Local state for UI interactions
const [isOpen, setIsOpen] = useState(false)
const [value, setValue] = useState('')

// Clerk authentication state
const { isSignedIn, user } = useAuth()
```

### Event Handling Pattern
Consistent event handling with proper typing:

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}
```

### Styling Pattern
Components use Tailwind CSS with consistent class naming:

```tsx
<div className={cn(
  "base-styles",
  variantStyles[variant],
  sizeStyles[size],
  className
)}>
```

## Component Testing

### Testing Strategy
1. **Visual Testing**: Manual verification of component appearance
2. **Authentication Testing**: Clerk integration and role-based access
3. **Interaction Testing**: Form submission and state changes
4. **Accessibility Testing**: Keyboard navigation and screen reader support
5. **Responsive Testing**: Mobile and desktop layouts

### Test Scenarios
- Clerk authentication flows
- Role-based component rendering
- Form validation and error states
- Loading states and transitions
- Multi-language text rendering
- Responsive design breakpoints
- Accessibility compliance

## Component Development Guidelines

### Naming Conventions
- Use PascalCase for component names
- Use camelCase for props and state
- Use kebab-case for CSS classes
- Use descriptive names for clarity

### File Organization
- Place components in `components/` directory
- Group related components in subdirectories
- Use `index.tsx` for component exports
- Keep component files focused and single-purpose

### Code Quality
- Use TypeScript for type safety
- Include JSDoc comments for complex logic
- Follow consistent formatting with Prettier
- Use ESLint for code quality checks

### Performance Considerations
- Use memoization for expensive calculations
- Implement lazy loading for heavy components
- Optimize image assets
- Minimize re-renders with proper state management
- Use Clerk's built-in optimizations for authentication

## Future Component Enhancements

### Planned Components
1. **Data Tables**: Advanced data display with sorting and filtering
2. **Charts**: Data visualization components for analytics
3. **Modals**: Dialog components for confirmations and forms
4. **Toasts**: Notification system for user feedback
5. **Loading States**: Skeleton loaders and spinners

### Component Library
Consider creating a shared component library for:
- Reusable UI patterns
- Consistent design system
- Cross-project component sharing
- Documentation and examples

## Clerk Integration Notes

### Authentication Flow
1. **Role Selection**: Users choose role on `/sign-up` page
2. **Clerk Sign-up**: Redirects to appropriate Clerk sign-up flow
3. **Role Assignment**: Role stored in localStorage and Clerk metadata
4. **Automatic Redirect**: Users redirected to appropriate dashboard

### Role Management
- **localStorage**: Temporary role storage for immediate access
- **Clerk Metadata**: Persistent role storage in Clerk dashboard
- **Role Checking**: Components check both localStorage and Clerk metadata
- **Fallback**: Graceful handling when roles are not available

This component documentation provides a comprehensive guide for understanding and extending the FinTrust application's Clerk-based component architecture.
