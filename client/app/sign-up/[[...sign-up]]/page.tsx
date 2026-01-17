import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-primary text-primary-foreground hover:bg-primary/90',
            card: 'bg-card border border-border shadow-lg',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton: 
              'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',
            formFieldLabel: 'text-foreground',
            formFieldInput: 
              'bg-secondary border border-border text-foreground',
            footerActionLink: 'text-primary hover:text-primary/80',
            identityPreviewText: 'text-foreground',
            identityPreviewEditButton: 'text-primary',
          },
          variables: {
            colorPrimary: 'hsl(var(--primary))',
            colorBackground: 'hsl(var(--card))',
            colorText: 'hsl(var(--foreground))',
            colorInputBackground: 'hsl(var(--secondary))',
            colorInputText: 'hsl(var(--foreground))',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </div>
  )
}
