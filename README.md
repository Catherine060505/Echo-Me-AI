# Echo Me AI 🎤🤖

## Overview

EchoMe is a modern full-stack application that transforms user thoughts into various forms of entertainment content using AI. The platform allows users to input any thought and receive AI-generated content in multiple formats including movies, songs, haikus, roasts, and jokes, complete with visual imagery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless database
- **AI Integration**: OpenAI API for content and image generation
- **Session Management**: PostgreSQL-based session storage

## Key Components

### Client-Side Components
- **Main App**: Single-page application with routing
- **Home Page**: Primary interface for user input and content generation
- **UI Components**: Comprehensive shadcn/ui component library
- **Hooks**: Custom hooks for mobile detection and toast notifications
- **Query Client**: Centralized API communication with error handling

### Server-Side Components
- **Express Server**: RESTful API with middleware for logging and error handling
- **Gemini Service**: Abstraction layer for AI content and image generation
- **Storage Layer**: Database abstraction with in-memory fallback
- **Route Handlers**: API endpoints for AI content generation

### Shared Components
- **Types**: TypeScript interfaces for API contracts
- **Schema**: Database schema definitions with Drizzle ORM
- **Validation**: Zod-based data validation

## Data Flow

1. **User Input**: User enters thoughts and selects entertainment mode
2. **API Request**: Frontend sends POST request to `/api/echome` endpoint
3. **AI Processing**: Server processes request through Gemini service
4. **Content Generation**: AI generates both text content and visual imagery
5. **Response**: Server returns structured response with generated content
6. **Display**: Frontend renders the generated content with loading states

## External Dependencies

### AI Services
- **Google Gemini 2.5 Flash**: Primary model for text content generation
- **Gemini Vision**: AI image generation for visual content
- **Structured Output**: JSON-formatted responses for consistent data structure

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database queries and migrations
- **Connection Pooling**: Efficient database connection management

### UI/UX Libraries
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **TypeScript**: Strict type checking across the stack
- **ESLint/Prettier**: Code quality and formatting tools

### Production Build
- **Client Build**: Vite optimized production build
- **Server Build**: esbuild for Node.js bundling
- **Static Assets**: Served from dist/public directory

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **AI Services**: Google Gemini API key configuration
- **Session Management**: PostgreSQL session storage

### Key Architectural Decisions

1. **Monorepo Structure**: Keeps client, server, and shared code in single repository for easier development and deployment
2. **TypeScript Throughout**: Ensures type safety across the entire stack
3. **Drizzle ORM**: Provides type-safe database operations with PostgreSQL
4. **OpenAI Integration**: Leverages latest GPT-4o model for high-quality content generation
5. **Component Library**: Uses shadcn/ui for consistent, accessible UI components
6. **Serverless Database**: Neon PostgreSQL for scalable, managed database solution
7. **Structured AI Responses**: JSON-formatted AI outputs for consistent frontend rendering

### 🔐 API Key Setup

This project uses the Google Cloud API (e.g., Text-to-Speech, Speech-to-Text). To use it:

1. Go to [Google AI Studio](https://aistudio.google.com/welcome)
2. Create an account (if have not)
3. Go to API Key
4. Create API Key
5. Create a `.env` file in the root folder and add: ITE_GOOGLE_API_KEY=your_google_api_key_here
