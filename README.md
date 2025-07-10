# Hendrix Academic Portfolio & Meeting Booking System

A full-stack web application combining a personal academic portfolio with integrated meeting booking functionality.

## Features

- **Academic Portfolio Display**: Professional CV/resume showcase
- **Meeting Booking System**: Integrated appointment scheduling
- **User Authentication**: Role-based access control (admin/user)
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live booking status and notifications

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session management
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hendrix-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL and session secret:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hendrix_portfolio
SESSION_SECRET=your-super-secret-session-key
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment

### Option 1: Vercel (Recommended for GitHub)

1. Fork this repository to your GitHub account
2. Connect your GitHub account to Vercel
3. Import the project in Vercel
4. Add environment variables in Vercel dashboard
5. Deploy

### Option 2: Railway

1. Connect your GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

### Option 3: Traditional VPS

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "hendrix-portfolio" -- start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `NODE_ENV` | Environment mode (development/production) | No |

## Default Admin Account

- **Username**: admin
- **Password**: 040313
- **Email**: hendrixmathsmtk@outlook.com

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### Meetings
- `GET /api/meetings` - Get user's meetings (admin: all meetings)
- `POST /api/meetings` - Create new meeting
- `GET /api/meetings/date/:date` - Get booked slots for date

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for personal portfolio use. Please respect the academic content and personal information contained within.

## Support

For deployment issues or questions, please open an issue in the GitHub repository.