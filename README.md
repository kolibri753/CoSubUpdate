# CoSubUpdate

CoSubUpdate is a web application for real-time subtitle editing. The MVP focuses on individual updates, with future plans for simultaneous editing by multiple users.

## Features
- View and manage uploaded subtitle documents.
- Edit timecodes, content, and indexes in real-time.
- Add and remove subtitle blocks with automatic recalculations.
- Ensure fast and responsive performance.
- Future: collaborative editing and access control.

## Tech Stack
- **Frontend**: React, Zustand, TypeScript, TailwindCSS.
- **Backend**: Node.js, Express.js, Prisma, Neon (PostgreSQL).
- **Infrastructure**: Authentication, WebSockets for real-time updates.

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL
- Prisma CLI

### Setup
1. Clone the repository and navigate to the project.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure settings. (haven't added yet)
4. Start the backend: `cd backend && npm run dev`
5. Start the frontend: `cd frontend && npm run dev`

## License
MIT License
