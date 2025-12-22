# Clerk Authentication Integration

This document details the integration of Clerk authentication into the FinTrust application using Next.js App Router.

## Overview

Clerk provides a complete authentication solution with features like:
- User sign-up and sign-in flows
- Social authentication (Google, Apple, etc.)
- Multi-factor authentication
- User management dashboard
- Role-based access control
- Custom role selection flows

## Files Modified/Created

### New Files

1. **`.env.local`** - Environment variables for Clerk keys
2. **`proxy.ts`** - Clerk middleware configuration
3. **`middleware.ts`** - Next.js middleware for route protection
4. **`components/auth-buttons.tsx`** - Authentication UI components
5. **`app/login/page.tsx`** - Clerk sign-in page with custom styling
6. **`app/sign-up/page.tsx`** - Role selection interface before Clerk sign-up
7. **`components/beneficiary-signup.tsx`** - Custom beneficiary sign-up flow
8. **`components/officer-signup.tsx`** - Custom officer sign-up flow
9. **`components/role-assignment.tsx`** - Post-sign-up role assignment

### Modified Files

1. **`package.json`** - Added `@clerk/nextjs` dependency
2. **`app/layout.tsx`** - Wrapped app with `<ClerkProvider>` and added role assignment
3. **`app/page.tsx`** - Added authentication buttons to header
4. **`app/dashboard/layout.tsx`** - Added authentication buttons to dashboard header
5. **`README.md`** - Updated with Clerk setup instructions

## Enhanced Features

### Role Selection Flow

The application now includes a sophisticated role selection system:

1. **Role Selection Interface** (`app/sign-up/page.tsx`):
   - Users choose between "Beneficiary" or "Loan Officer"
   - Custom card-based interface with multi-language support
   - Redirects to appropriate sign-up flow based on selection

2. **Separate Sign-up Components**:
   - **`components/beneficiary-signup.tsx`**: Custom flow for loan applicants
   - **`components/officer-signup.tsx`**: Custom flow for loan officers
   - Both use Clerk SignUp component with role-specific styling

3. **Automatic Role Assignment** (`components/role-assignment.tsx`):
   - Checks localStorage for pending role after sign-up
   - Assigns role to user metadata
   - Redirects users to appropriate dashboard based on role

### Updated Authentication Components

#### Enhanced AuthButtons (`components/auth-buttons.tsx`)

```tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Link } from "next/navigation"

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:bg-secondary">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </SignInButton>
        <Link href="/sign-up">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Sign Up
          </Button>
        </Link>
      </SignedOut>
      
      <SignedIn>
        <div className="flex items-center gap-2">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-card border-border shadow-lg",
                userButtonPopoverActions: "border-t border-border",
                userButtonPopoverActionButton: "hover:bg-secondary",
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  )
}
```

#### Custom Login Page (`app/login/page.tsx`)

- Clerk SignIn component with custom appearance
- Multi-language support
- Role-based redirect logic
- Custom input and button styling

#### Role Selection Interface (`app/sign-up/page.tsx`)

```tsx
export default function SignUpPage() {
  const [userType, setUserType] = useState<"beneficiary" | "officer" | null>(null)
  const [language, setLanguage] = useState("en")
  
  const t = translations[language] || translations.en

  if (userType === "beneficiary") {
    return <BeneficiarySignUp />
  }

  if (userType === "officer") {
    return <OfficerSignUp />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Role selection interface */}
        <div className="grid md:grid-cols-2 gap-6">
          <div onClick={() => setUserType("beneficiary")}>
            {/* Beneficiary card */}
          </div>
          <div onClick={() => setUserType("officer")}>
            {/* Officer card */}
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Configuration

### Environment Variables

```bash
# Required Clerk keys (replace with your actual keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Optional: Custom domain
NEXT_PUBLIC_CLERK_API_URL=https://your-domain.clerk.accounts.dev
```

### Clerk Provider

The entire application is wrapped with `<ClerkProvider>` in `app/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs"
import { RoleAssignment } from "@/components/role-assignment"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
          <ThemeProvider>
            {children}
            <RoleAssignment />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### Middleware Configuration

Route protection is handled by `proxy.ts`:

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

## Authentication Flow

### Complete User Journey

1. **Role Selection** (`/sign-up`):
   - User visits sign-up page
   - Chooses between "Beneficiary" or "Loan Officer"
   - Redirects to appropriate sign-up flow

2. **Clerk Sign-up**:
   - **Beneficiary**: Custom beneficiary sign-up with Clerk
   - **Officer**: Custom officer sign-up with Clerk
   - Both flows use Clerk's SignUp component with custom styling

3. **Role Assignment**:
   - Role stored in localStorage as "pendingRole"
   - `RoleAssignment` component processes pending role
   - Role assigned to user metadata
   - User redirected to appropriate dashboard

4. **Dashboard Access**:
   - **Beneficiary**: Redirected to `/onboarding`
   - **Officer**: Redirected to `/officer/applications`

### Role-Based Access Control

- **Beneficiary Routes**: `/onboarding`, `/consent`, `/status`
- **Officer Routes**: `/officer/applications/*`
- **Protected Routes**: All authenticated routes protected by Clerk middleware
- **Role Checking**: Components check user roles for conditional rendering

## Customization

### Clerk Component Styling

All Clerk components are styled to match FinTrust design:

```typescript
appearance={{
  elements: {
    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    input: 'bg-secondary border-border text-foreground',
    card: 'bg-card border-border',
    headerTitle: 'text-2xl font-bold text-foreground',
    headerSubtitle: 'text-muted-foreground text-sm',
    formFieldInput: 'w-full px-3 py-2 rounded-md',
    socialButtonsBlockButton: 'w-full bg-secondary hover:bg-secondary/80',
  }
}}
```

### Multi-language Support

The application maintains its existing multi-language support:

- **Role Selection**: English/Hindi toggle
- **Sign-up Flows**: Multi-language text in all components
- **Clerk Integration**: Clerk components support multi-language

## Migration from Custom Auth

The previous custom authentication system has been completely replaced with Clerk:

- **Removed**: Custom login form, manual session management
- **Added**: 
  - Clerk's managed authentication with social login options
  - Role selection interface before sign-up
  - Separate sign-up flows for different user types
  - Automatic role assignment and redirection
- **Preserved**: Multi-language support, role-based routing logic

## Security

Clerk provides enterprise-grade security features:

- Secure session management
- CSRF protection
- Rate limiting
- Password strength requirements
- Email verification
- Multi-factor authentication
- Role-based access control

## Backend Integration Points

### Future Backend Integration

1. **Authentication API**: Connect Clerk user IDs to backend systems
2. **Role Management**: Sync Clerk roles with backend role system
3. **User Profiles**: Extend Clerk user metadata with application-specific data
4. **Audit Logs**: Log authentication events and role changes

### API Integration Pattern

```typescript
// Example backend integration
export async function getUserWithRole(clerkUserId: string) {
  const response = await fetch(`/api/users/${clerkUserId}`)
  const user = await response.json()
  return user
}

export async function updateUserRole(clerkUserId: string, role: string) {
  const response = await fetch(`/api/users/${clerkUserId}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role })
  })
  return response.json()
}
```

## Next Steps

1. **Set up Clerk Dashboard**: Configure user roles, email templates, and social providers
2. **Customize UI**: Adjust Clerk component styling to match your design system
3. **Add Roles**: Implement role-based logic for different user types
4. **Backend Integration**: Connect Clerk user IDs to your backend systems
5. **Role Management**: Set up role assignment in Clerk dashboard

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**: Ensure `.env.local` is in the project root
2. **Clerk Components Not Rendering**: Check that `ClerkProvider` wraps your app
3. **Route Protection Not Working**: Verify middleware configuration in `proxy.ts`
4. **Role Assignment Not Working**: Check that `RoleAssignment` component is included in layout

### Debug Mode

Enable Clerk debug mode by adding to your environment:

```bash
CLERK_DEBUG=true
```

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router Guide](https://clerk.com/docs/nextjs/app-router)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Roles Documentation](https://clerk.com/docs/roles/overview)
- [Clerk Appearance API](https://clerk.com/docs/nextjs/appearance)
