# FinTrust - Simplified Loan Approval System

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
2. **Set up Clerk Authentication:**

   - Create a free account at [Clerk](https://clerk.com/)
   - Get your Publishable Key and Secret Key from the [API Keys page](https://dashboard.clerk.com/last-active?path=api-keys)
   - Add your keys to `.env.local`:
     ```bash
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
     CLERK_SECRET_KEY=your_secret_key
     ```
3. **Run the development server:**

   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Authentication

The application now uses Clerk for authentication. Users can:

- Sign up for new accounts
- Sign in with existing accounts
- Use Clerk's built-in authentication flows
- Access role-based features (Beneficiary/Officer)

**Note:** The old test credentials are no longer used. Users must create accounts through the Clerk sign-up flow.

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

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Configuration (for future backend integration)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Feature Flags
NEXT_PUBLIC_ENABLE_ML_FEATURES=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Code Style

This project uses ESLint and Prettier for code formatting. Please ensure your code follows the established style guidelines.

### Testing

Currently, this is a frontend-only implementation. Testing will be added in future iterations when backend services are integrated.

## Architecture Overview

### Frontend Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Authentication Layer**: Role-based authentication and routing
- **UI Layer**: Reusable components using shadcn/ui
- **State Management**: Local storage for persistent data
- **Internationalization**: Multi-language support with context providers

### Future Backend Integration

The codebase is designed to easily integrate with backend services:

- API endpoints will be added for user authentication
- Database integration for persistent data storage
- ML model integration for credit scoring
- Email service integration for notifications

## API Documentation

### Authentication Endpoints

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "role": "beneficiary" | "officer"
}
```

### Application Endpoints

```http
GET /api/applications
Authorization: Bearer <token>

GET /api/applications/:id
Authorization: Bearer <token>

POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "gender": "male" | "female" | "other",
  "age": number,
  "address": "string",
  "district": "string",
  "livelihood": "string",
  "income": number
}
```

## Contact

For questions or support, please reach out to our development team.

## Changelog

### Week 1 (Current)

- Initial frontend implementation
- Role-based authentication
- Multi-language support
- Local storage integration
- Basic UI components

### Planned Features

- Backend API integration
- Database persistence
- ML model integration
- Email notifications
- Advanced analytics dashboard
