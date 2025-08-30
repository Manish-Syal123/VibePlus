# VibePlus

VibePlus is a cutting-edge web application powered by Next.js, tRPC, and Prisma. It empowers users to transform their ideas into reality by building applications seamlessly through interactive AI-driven conversations.

## Features

- 🔐 Secure Authentication with Clerk
- 🚀 Full-stack Type Safety with tRPC
- 📦 Database Integration with Prisma
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🌙 Dark/Light Theme Support
- ⚡ Real-time Updates
- 🤖 AI Integration with OpenAI and Gemini
- 🔥 Powered by Next.js 15 with Turbopack

## Tech Stack

- **Frontend:**

  - Next.js 15.4
  - React 19.1
  - TailwindCSS
  - Radix UI Components
  - React Query v5

- **Backend:**

  - tRPC
  - Prisma ORM
  - PostgreSQL (Neon)
  - Inngest for Background Jobs

- **Authentication:**

  - Clerk

- **AI/ML:**
  - OpenAI Integration
  - Google Gemini API
  - E2B sandbox Code Interpreter

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL Database
- npm or yarn package manager

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Manish-Syal123/VibePlus.git
   cd VibePlus
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env\` file in the root directory and add the following variables:
   \`\`\`env
   DATABASE_URL="your_postgresql_url"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

# API Keys

OPENAI_API_KEY="your_openai_api_key"
GEMINI_API_KEY="your_gemini_api_key"
E2B_API_KEY="your_e2b_api_key"

# Clerk Auth

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"
\`\`\`

4. Initialize the database:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The application will be available at `http://localhost:3000`

## Project Structure

\`\`\`
├── src/
│ ├── app/ # Next.js app router pages
│ ├── components/ # Reusable UI components
│ ├── modules/ # Feature-based modules
│ ├── trpc/ # tRPC configuration and routers
│ ├── lib/ # Utility functions and shared logic
│ └── types/ # TypeScript type definitions
├── prisma/ # Database schema and migrations
└── public/ # Static assets
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add proper documentation for new features
- Ensure all tests pass before submitting a PR
- Update README.md with any necessary changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)

## Contact

Manish Syal - [@Manish-Syal123](https://github.com/Manish-Syal123)

Project Link: [https://github.com/Manish-Syal123/VibePlus](https://github.com/Manish-Syal123/VibePlus)
