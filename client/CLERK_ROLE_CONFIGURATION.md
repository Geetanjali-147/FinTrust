# Clerk Role Configuration Guide

This guide explains how to configure user roles in the Clerk dashboard and customize the UI to match your design preferences.

## Setting Up Roles in Clerk Dashboard

### Step 1: Access Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **User & Authentication** → **Roles**

### Step 2: Create Roles

1. Click **"Create Role"**
2. Add the following roles: `beneficiary`, `officer`

### Step 3: Role Selection During Sign-up

The application includes a custom sign-up flow where users can select their role:

1. **Role Selection Interface**: Users choose between "Beneficiary" or "Loan Officer" on `/sign-up` page
2. **Separate Sign-up Components**: 
   - `components/beneficiary-signup.tsx` for loan applicants
   - `components/officer-signup.tsx` for loan officers
3. **Automatic Assignment**: Roles are assigned during the sign-up process
4. **Immediate Access**: Users are redirected to appropriate dashboards based on their role

**Note**: Admin roles should be assigned manually through the Clerk dashboard for security reasons.

### Step 4: Assign Roles to Users

#### Beneficiary Role

- **Role ID**: `beneficiary`
- **Description**: Users who apply for loans
- **Permissions**: Access to onboarding, consent, and status pages

#### Officer Role

- **Role ID**: `officer`
- **Description**: Loan officers who review applications
- **Permissions**: Access to application management and review pages

#### Admin Role

- **Role ID**: `admin`
- **Description**: System administrators with full access
- **Permissions**: Access to all features including user management and system settings

### Step 3: Assign Roles to Users

1. Go to **User Management** → **Users**
2. Select a user
3. Click **"Add Role"**
4. Assign either `beneficiary` or `officer` role

### Step 4: Configure Role-Based Access

You can also set up role-based access through:

- **Organization Memberships**: Create organizations for different user types
- **Custom Claims**: Add custom metadata to user sessions

## Customizing Clerk UI Components

### 1. Authentication Buttons Styling

The `AuthButtons` component in `components/auth-buttons.tsx` includes:

- Role indicators (Officer/Beneficiary badges)
- Custom styling to match FinTrust design
- Proper color schemes and hover effects

### 2. Sign-in/Sign-up Page Styling

Both `app/login/page.tsx` and `app/sign-up/page.tsx` include:

- Custom input field styling
- Primary button customization
- Card and header styling
- Social login button styling

### 3. User Button Customization

The UserButton in the header includes:

- Custom popover styling
- Role-based indicators
- Proper color matching

## UI Customization Examples

### Color Scheme Integration

```typescript
appearance={{
  elements: {
    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    input: 'bg-secondary border-border text-foreground',
    card: 'bg-card border-border',
  }
}}
```

### Typography Integration

```typescript
appearance={{
  elements: {
    headerTitle: 'text-2xl font-bold text-foreground',
    headerSubtitle: 'text-muted-foreground text-sm',
  }
}}
```

### Spacing and Layout

```typescript
appearance={{
  elements: {
    formFieldInput: 'w-full px-3 py-2 rounded-md',
    socialButtonsBlockButton: 'w-full bg-secondary hover:bg-secondary/80',
  }
}}
```

## Role-Based Route Protection

### Using RoleProtected Component

```tsx
import { OfficerOnly, BeneficiaryOnly } from '@/components/role-protected'

// For officer-only pages
export default function OfficerPage() {
  return (
    <OfficerOnly>
      <div>Officer dashboard content</div>
    </OfficerOnly>
  )
}

// For beneficiary-only pages
export default function BeneficiaryPage() {
  return (
    <BeneficiaryOnly>
      <div>Beneficiary content</div>
    </BeneficiaryOnly>
  )
}
```

### Manual Role Checking

```tsx
import { isOfficer, isBeneficiary } from '@/lib/clerk'

// Check roles in components
if (isOfficer()) {
  // Show officer-specific content
}

if (isBeneficiary()) {
  // Show beneficiary-specific content
}
```

## Advanced Role Configuration

### Custom Role Metadata

You can add custom metadata to roles for more granular permissions:

```typescript
// In Clerk dashboard, add metadata to roles
{
  "permissions": ["view_applications", "approve_loans"],
  "access_level": "high"
}
```

### Organization-Based Roles

For more complex scenarios, use Clerk Organizations:

1. Create organizations for different departments
2. Assign roles within organizations
3. Use organization membership for access control

### Custom Claims

Add custom claims to user sessions:

```typescript
// In Clerk dashboard, add custom claims
{
  "user_type": "beneficiary",
  "department": "loans",
  "permissions": ["read", "write"]
}
```

## Troubleshooting

### Common Issues

1. **Roles not appearing**: Ensure roles are properly assigned in Clerk dashboard
2. **Styling not applying**: Check that appearance props are correctly formatted
3. **Route protection not working**: Verify role checking logic in components

### Debug Mode

Enable Clerk debug mode:

```bash
# Add to .env.local
CLERK_DEBUG=true
```

### Testing Roles

1. Create test users in Clerk dashboard
2. Assign different roles to test users
3. Test role-based access in your application

## Best Practices

1. **Consistent Role Names**: Use consistent role IDs across your application
2. **Graceful Fallbacks**: Always provide fallback content for unauthorized users
3. **Performance**: Use memoization for role checking in frequently rendered components
4. **Security**: Never rely solely on client-side role checking for sensitive operations

## Next Steps

1. **Backend Integration**: Connect Clerk user IDs to your backend systems
2. **Audit Logs**: Set up logging for role changes and access attempts
3. **Multi-tenancy**: Consider organization-based roles for multi-tenant applications
4. **Advanced Permissions**: Implement fine-grained permission systems

## Resources

- [Clerk Roles Documentation](https://clerk.com/docs/roles/overview)
- [Clerk Appearance API](https://clerk.com/docs/nextjs/appearance)
- [Clerk Dashboard](https://dashboard.clerk.com)
