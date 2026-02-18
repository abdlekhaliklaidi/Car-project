# Quick Start Guide

## Car Rental Application - Get Started in 5 Minutes

### Prerequisites Check

```bash
# Check Java (needs 17+)
java -version

# Check Maven
mvn -version

# Check Node.js (needs 18+)
node -v

# Check PostgreSQL
psql --version
```

### 1. Database Setup (30 seconds)

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE carrental;

# Exit
\q
```

### 2. Start Backend (1 minute)

```bash
cd backend

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

### 3. Start Frontend (1 minute)

Open a new terminal:

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
ng serve
```

Frontend starts at: **http://localhost:4200**

### 4. Open in Browser

Navigate to: **http://localhost:4200**

---

## Default Test Accounts

The application creates initial data automatically. You can:

1. **Register a new account** - Click "Se connecter" → "Créer un compte"
2. **Search for cars** - Use the search form on the homepage
3. **Make a reservation** - Select a car and complete the booking

---

## Available Agencies (Pre-loaded)

- Fès-Saïss Airport
- Casablanca Mohammed V Airport
- Marrakech Ménara Airport
- Rabat-Salé Airport
- Tanger Ibn Battouta Airport
- Agadir Al Massira Airport
- And more city centers...

---

## API Documentation

Once the backend is running, you can test APIs:

### Get All Cars
```bash
curl http://localhost:8080/api/cars
```

### Get All Agencies
```bash
curl http://localhost:8080/api/agencies
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

---

## Troubleshooting

### Port 8080 already in use
```bash
# Find and kill process
lsof -ti:8080 | xargs kill -9
```

### Port 4200 already in use
```bash
# Use different port
ng serve --port 4201
```

### PostgreSQL connection error
- Ensure PostgreSQL service is running
- Check credentials in `backend/src/main/resources/application.properties`

### npm install fails
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## Project Structure Overview

```
car-rental-app/
├── backend/          # Spring Boot (Java)
│   ├── src/main/java/com/carrental/
│   │   ├── controller/   # REST APIs
│   │   ├── service/      # Business logic
│   │   ├── repository/   # Database access
│   │   ├── entity/       # Database models
│   │   ├── security/     # JWT authentication
│   │   └── dto/          # Data transfer objects
│   └── pom.xml
│
└── frontend/         # Angular (TypeScript)
    ├── src/app/
    │   ├── components/   # UI components
    │   ├── services/     # API calls
    │   ├── models/       # TypeScript interfaces
    │   └── guards/       # Route protection
    └── package.json
```

---

## Next Steps

1. **Customize the UI** - Edit styles in `frontend/src/styles.css`
2. **Add more cars** - Update `backend/src/main/resources/data.sql`
3. **Add payment integration** - Extend `ReservationService.java`
4. **Add email notifications** - Implement email service

---

**You're all set! 🎉**
