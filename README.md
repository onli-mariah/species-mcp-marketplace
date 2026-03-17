# Onli Marketplace - Event Flow Visualization

An interactive visualization tool for exploring the Onli Asset Marketplace event-driven architecture, service integrations, and workflow processes.

## Features

- **Interactive Workflow Canvas**: Visual representation of the complete marketplace event flow
- **Service Inspector**: Detailed documentation for each service including roles, headers, logic, TypeScript interfaces, and JSON schemas
- **Service Provider Integration**: Documentation for NOWPayments, OnliCloud, and Firefly III integrations
- **Responsive Design**: Desktop-optimized interface with mobile detection

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19 with React Flow for workflow visualization
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **TypeScript**: Full type safety throughout the application
- **Analytics**: Vercel Analytics integration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Desktop browser (mobile not supported)

### Installation

\`\`\`bash
# Install dependencies
bun install
# or
npm install

# Run development server
bun dev
# or
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
# Build the application
bun run build
# or
npm run build

# Start production server
bun start
# or
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page with mobile detection
│   └── globals.css        # Global styles and Tailwind config
├── components/            # React components
│   ├── workflow-canvas.tsx # Main workflow visualization
│   ├── service-node.tsx   # Custom service card nodes
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets
\`\`\`

## Services Documented

### Core Services
- Developer UI
- Authenticator
- Marketplace API
- Validator
- Classifier
- Matching Service
- Cashier
- Asset Delivery (AssetManager)
- Floor Manager
- Reporter (Side Car)
- Configuration Module

### External Integrations
- **NOWPayments**: Payment verification & crypto payouts
- **OnliCloud**: Asset operations & ownership management
- **Firefly III**: Double-entry accounting & ledger

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

## License

Created with v0.app
