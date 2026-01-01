# Unified Server and Frontend Setup

This project is configured to run both the backend server and frontend on the same port in production, while maintaining separate development servers for better development experience.

## Development Setup

During development:
- Frontend runs on port 8080 using Vite's development server
- Backend API server runs on port 5000
- Vite proxy automatically forwards API requests (`/api/*`) to the backend server
- This provides hot-reloading and better development experience

## Production Setup

In production:
- The Express server serves both API endpoints and the built frontend
- Both API and frontend are accessible on the same port
- React Router routes are properly handled by serving index.html for non-API routes

## Configuration Details

### Frontend (Vite Configuration)
- The `vite.config.ts` file configures a proxy that forwards `/api/*` requests to `http://localhost:5000`
- The build output is configured to go to `server/dist` directory
- This allows the Express server to serve the built frontend in production

### Backend (Express Server)
- The `server/src/index.ts` file is configured to:
  - In development: Only serve API endpoints
  - In production: Serve both API endpoints and static frontend files
  - Handle React Router client-side routing by serving index.html for non-API routes

### Package Scripts
- `npm run dev`: Runs both servers simultaneously using concurrently
- `npm run build`: Builds the frontend to server/dist
- `npm run build:server`: Compiles the TypeScript server code
- `npm start`: Runs the production server that serves both API and frontend

## Environment Configuration

The setup works with the following environment detection:
- When `NODE_ENV` is 'production', the server serves both API and frontend
- When `NODE_ENV` is not 'production', the server only serves API endpoints
- The frontend proxy handles API requests during development

## Benefits

1. **Development**: Separate servers allow for hot-reloading and better development experience
2. **Production**: Single port deployment simplifies hosting and eliminates CORS issues
3. **Scalability**: Proper separation of concerns while maintaining unified deployment
4. **Simplicity**: Easy to deploy as a single unit in production

## Deployment

For deployment to platforms like Vercel, Railway, or similar:
1. Build both frontend and server: `npm run build && npm run build:server`
2. Run the production server: `npm start`
3. Both API and frontend will be available on the same port