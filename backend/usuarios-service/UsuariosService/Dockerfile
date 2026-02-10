# Use the official .NET 10 runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["UsuariosService.csproj", "./"]
RUN dotnet restore "UsuariosService.csproj"

# Copy the rest of the files and build
COPY . .
WORKDIR "/src/."
RUN dotnet build "UsuariosService.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "UsuariosService.csproj" -c Release -o /app/publish

# Build the final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser
USER appuser

ENTRYPOINT ["dotnet", "UsuariosService.dll"]
