# LoanFlow - Simplified Loan Approval System

A modern loan approval platform with AI-powered credit scoring and role-based access control.

## Features

### Week 1 Implementation
- **Role-Based Authentication**: Separate flows for Beneficiaries and Officers
- **Beneficiary Flow**:
  - Login with username and password
  - Onboarding form (name, gender, age, address, district, livelihood, income)
  - Consent screen with data usage explanation
  - Application status tracking
- **Officer Flow**:
  - Application list with search functionality
  - Detailed application review with credit scores
  - ML-powered eligibility explanations
  - Approve/Reject functionality
- **Multi-Language Support**: English and Hindi (persistent across pages)
- **Local Storage**: Consent status and application data stored locally

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Test Credentials

**Beneficiary Account:**
- Username: `user123`
- Password: `password`

**Officer Account:**
- Username: `officer`
- Password: `admin123`

## Project Structure

```
├── app/
│   ├── page.tsx                          # Login page
│   ├── onboarding/page.tsx               # Beneficiary onboarding
│   ├── consent/page.tsx                  # Consent screen
│   ├── status/page.tsx                   # Application status
│   └── officer/
│       └── applications/
│           ├── page.tsx                  # Application list
│           └── [id]/page.tsx             # Application details
├── components/
│   ├── login-form.tsx                    # Login form component
│   └── ui/                               # UI components
└── lib/
    └── utils.ts                          # Utility functions
```

## Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Storage**: Local Storage (frontend only)

## Week 1 Requirements Compliance

✅ Login screen with username and password  
✅ Role-based routing (Beneficiary vs Officer)  
✅ Beneficiary onboarding with required fields  
✅ Consent screen with explicit user agreement  
✅ Application status page  
✅ Officer application list and detail views  
✅ Credit score display with ML explanations  
✅ Approve/Reject functionality  
✅ Multi-language support (English/Hindi)  
✅ Local storage for consent and application data  
✅ No animations, focus on functionality  
✅ Black theme UI

## Notes

- This is a frontend-only implementation
- All data is stored in browser localStorage
- No backend API integration in Week 1
- Designed for extension with backend services in future weeks

## License

MIT
```

```json file="" isHidden
