# ApexBank: Digital Banking Dashboard

A premium, production-ready financial dashboard built autonomously using the Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Features
- **Authentication**: Email/password auth via `@supabase/ssr`.
- **Protected Routes**: Automated middleware redirection vectors.
- **Live Transfers**: Safe RPC database triggers for accounting updates.

## Project Tree
```
├── app
│   ├── actions
│   │   ├── auth.ts
│   │   └── transactions.ts
│   ├── dashboard
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── send
│   │   │   └── page.tsx
│   │   ├── transactions
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── signup
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── BalanceCard.tsx
│   ├── Chart.tsx
│   ├── Sidebar.tsx
│   ├── TransactionHistory.tsx
│   └── TransactionList.tsx
├── lib
│   └── supabase
│       ├── client.ts
│       ├── middleware.ts
│       └── server.ts
├── supabase
│   └── schema.sql
├── tsconfig.json
└── middleware.ts
```

## Step 1: Environment Variables
Create a `.env.local` file using `.env.example`.

## Step 2: Supabase Configuration
Copy the queries in `supabase/schema.sql` directly inside the Supabase SQL Editor.

