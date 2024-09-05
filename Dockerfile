# Stage 1: Base setup
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to manage package managers like pnpm
RUN corepack enable

# Set working directory and copy app code
WORKDIR /app
COPY . .

# Stage 2: Install production dependencies
FROM base AS prod-deps
# Cache pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Stage 3: Build the application
FROM base AS build
# Cache pnpm store for build dependencies as well
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 4: Final stage with runtime environment
FROM node:22-slim AS runtime

# Copy the necessary artifacts from build and prod-deps stages
WORKDIR /app
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# Expose the app port
EXPOSE 8000

# Start the application
CMD ["pnpm", "start"]
