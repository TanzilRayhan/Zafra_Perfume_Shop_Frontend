# Zafra Frontend

A premium perfume e-commerce website built with [Next.js](https://nextjs.org) and modern web technologies.

## Features

- 🌟 Modern, responsive design with light gradient themes
- 🛒 Product catalog with beautiful imagery
- 🔐 User authentication (login/register)
- 📱 Mobile-first responsive design
- 🎨 Glass morphism effects and animations
- 📧 Toast notification system
- 🔗 Backend API integration
- 🎯 Admin dashboard for management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Form Management**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Animation**: CSS animations and Styled JSX

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
zafra-frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Admin dashboard
│   ├── products/          # Product pages
│   ├── login/            # Authentication
│   └── admin/register/   # Registration
├── components/           # Reusable components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   └── Toast.tsx        # Notification system
└── public/              # Static assets
```

## Backend Integration

The frontend integrates with a backend API running on `localhost:8000/admin` with endpoints for:
- User authentication
- Product management  
- Order management
- User management
- Reviews system

## Development

You can start editing the pages by modifying files in the `app/` directory. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a modern font family.

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
