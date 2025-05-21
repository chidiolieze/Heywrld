# Heywrld Enterprise E-commerce Application

## Overview

This is a full-stack e-commerce application for Heywrld Enterprise, a business that sells farm produce and luxury perfumes in Nigeria. The application follows a modern React + Express.js architecture with PostgreSQL for data storage.

The application consists of:
- React frontend with ShadCN UI components
- Express.js backend with RESTful API endpoints
- Drizzle ORM for database operations
- PostgreSQL database
- Authentication system for customers and administrators

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React (non-SSR) and uses a component-based architecture. Key architectural decisions include:

1. **UI Framework**: Uses ShadCN UI, a collection of reusable components built on Radix UI primitives with Tailwind CSS for styling.
   - Chosen for its accessibility, customizability, and modern design
   - Components are imported individually to reduce bundle size

2. **State Management**: 
   - React Context API for global state (auth, cart, theme)
   - React Query for server state and data fetching
   - This approach separates UI state from server state, improving maintainability

3. **Routing**: Uses Wouter, a lightweight routing library
   - Simpler alternative to React Router with a smaller bundle size
   - Adequate for the application's routing needs

4. **Form Handling**: React Hook Form with Zod validation
   - Provides efficient form validation with TypeScript integration
   - Reduces re-renders and improves performance

### Backend Architecture

The backend follows a RESTful API architecture using Express.js. Key decisions:

1. **API Design**: RESTful endpoints organized by resource type
   - Clear separation of concerns with routes for products, categories, users, and orders
   - Consistent response formats and error handling

2. **Database Access**: Uses Drizzle ORM with a repository pattern
   - Abstracts database operations through a storage interface
   - Enables easy switching between storage implementations (currently in-memory but designed for PostgreSQL)

3. **Authentication**: Simple token-based authentication
   - Stores user data in client-side storage
   - Server validates credentials for protected operations

4. **Schema Validation**: Uses Zod for request validation
   - Ensures data integrity before processing requests
   - Generates consistent error messages

### Data Storage

The application uses PostgreSQL (via Drizzle ORM) for persistent storage:

1. **Schema Design**: Relational model with normalized tables
   - Users, Products, Categories, Orders, and OrderItems
   - Foreign key relationships maintain data integrity

2. **Query Layer**: Drizzle ORM provides a type-safe query builder
   - Benefits: Type safety, SQL-like syntax, and migration support
   - Integration with Zod for schema validation

## Key Components

### Frontend Components

1. **Layout Components**:
   - `ShopLayout`: Main layout for customer-facing pages
   - `AdminLayout`: Dashboard layout for admin pages
   - Consistent navigation and theming across the application

2. **Page Components**:
   - Public pages: Home, Shop, Product, Cart, Checkout
   - Admin pages: Dashboard, Products, Categories, Orders
   - Authentication: Login/Register

3. **UI Components**:
   - Form components (input, select, checkbox)
   - Navigation components (menu, breadcrumbs)
   - Feedback components (toast, alert)
   - All built on ShadCN UI with consistent styling

4. **Feature Components**:
   - Product-related: ProductCard, ProductGrid, ProductFilters
   - Cart-related: CartItem, CartSummary
   - Checkout-related: CheckoutForm, PaymentMethods

### Backend Components

1. **API Routes**:
   - Authentication: `/api/auth/login`, `/api/auth/register`
   - Products: CRUD operations
   - Categories: CRUD operations
   - Orders: Order management
   - Admin: Dashboard metrics and operations

2. **Data Access Layer**:
   - Storage interface for database operations
   - Currently implemented with in-memory storage
   - Designed to be replaced with PostgreSQL implementation

3. **Middleware**:
   - Request logging
   - Error handling
   - JSON parsing
   - Authentication validation

## Data Flow

### Frontend to Backend

1. **User Interactions**:
   - User interacts with UI components
   - Component handlers update local state or trigger API requests
   - React Query manages data fetching, caching, and synchronization

2. **API Requests**:
   - `apiRequest` utility handles fetch requests with consistent error handling
   - React Query's `useQuery` and mutations for data fetching and updates
   - Responses update UI state automatically

3. **Data Display**:
   - Fetched data is passed to components through props or context
   - Loading and error states are handled by React Query
   - UI updates reactively based on data changes

### Backend Data Flow

1. **Request Handling**:
   - Express routes receive API requests
   - Middleware validates request format and authorization
   - Request data is validated with Zod schemas

2. **Business Logic**:
   - Route handlers process valid requests
   - Storage interface methods are called to interact with the database
   - Business rules are applied (e.g., checking inventory before creating orders)

3. **Response Generation**:
   - Results are formatted as JSON responses
   - Success responses include requested data
   - Error responses include appropriate status codes and messages

## External Dependencies

### Frontend Dependencies

1. **UI Libraries**:
   - `@radix-ui/*`: Unstyled, accessible UI primitives
   - `class-variance-authority`: For component variants
   - `tailwindcss`: Utility-first CSS framework
   - `lucide-react`: Icon library

2. **Data Management**:
   - `@tanstack/react-query`: Data fetching and state management
   - `@hookform/resolvers`: Form validation
   - `zod`: Schema validation

3. **Other**:
   - `date-fns`: Date formatting and manipulation
   - `wouter`: Routing library
   - `recharts`: Charting library for admin dashboard

### Backend Dependencies

1. **Core**:
   - `express`: Web server framework
   - `drizzle-orm`: TypeScript ORM
   - `@neondatabase/serverless`: PostgreSQL client

2. **Utilities**:
   - `zod`: Schema validation
   - `nanoid`: ID generation
   - `connect-pg-simple`: Session store for PostgreSQL

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Build Process**:
   - Frontend: Vite builds static assets to `dist/public`
   - Backend: esbuild bundles server code to `dist/index.js`
   - Combined into a single deployment package

2. **Runtime**:
   - Node.js 20 for server execution
   - PostgreSQL 16 for database
   - Production mode serves static assets from the dist directory

3. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: Environment mode (development/production)

4. **Development Workflow**:
   - `npm run dev`: Runs development server with hot reloading
   - `npm run build`: Builds for production
   - `npm run start`: Starts production server
   - `npm run db:push`: Updates database schema

## Database Schema

The application uses the following database schema:

1. **Users**: Customer and admin accounts
   - Core fields: id, username, password, email, fullName, isAdmin
   - Additional fields: phone, address, city, state, zipCode, country

2. **Categories**: Product categorization
   - Fields: id, name, description, slug, imageUrl, isActive

3. **Products**: Items for sale
   - Core fields: id, name, description, categoryId, price, discountPrice
   - Inventory fields: quantity, sku
   - Media: images (JSON array of URLs)

4. **Orders**: Customer purchases
   - Fields: id, userId, status, total, paymentMethod, shippingAddress, etc.

5. **OrderItems**: Line items in an order
   - Fields: id, orderId, productId, quantity, price