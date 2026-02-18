# Car Rental Application

A full-stack car rental application built with **Spring Boot** (Backend), **Angular** (Frontend), and **PostgreSQL** (Database).

## Features

- **User Authentication**: JWT-based authentication with login and registration
- **Car Search**: Search available cars by location, dates, and times
- **Agency Management**: Browse and search rental agencies across Morocco
- **Reservation System**: Book cars with different payment options (pay now or at agency)
- **Responsive Design**: Mobile-friendly UI
- **Discount Codes**: Apply promotional codes for discounts
- **User Dashboard**: View and manage reservations

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- Angular 17
- TypeScript
- Standalone Components
- Reactive Forms
- CSS3 with Custom Properties

### Database
- PostgreSQL 14+

## Project Structure

```
car-rental-app/
├── backend/                 # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/carrental/
│   │   │   │   ├── config/         # Security & CORS Configuration
│   │   │   │   ├── controller/     # REST Controllers
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   ├── entity/         # JPA Entities
│   │   │   │   ├── repository/     # Spring Data Repositories
│   │   │   │   ├── security/       # JWT & UserDetails
│   │   │   │   └── service/        # Business Logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql        # Initial Data
│   │   └── test/
│   └── pom.xml
│
├── frontend/                # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular Components
│   │   │   ├── guards/       # Route Guards
│   │   │   ├── interceptors/ # HTTP Interceptors
│   │   │   ├── models/       # TypeScript Models
│   │   │   └── services/     # Angular Services
│   │   ├── assets/
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Prerequisites

Before running this project, make sure you have the following installed:

1. **Java 17** or higher
   ```bash
   java -version
   ```

2. **Maven** 3.8+
   ```bash
   mvn -version
   ```

3. **Node.js** 18+ and **npm**
   ```bash
   node -v
   npm -v
   ```

4. **Angular CLI** 17+
   ```bash
   npm install -g @angular/cli
   ng version
   ```

5. **PostgreSQL** 14+
   ```bash
   psql --version
   ```

## Database Setup

1. **Create the PostgreSQL database:**
   ```bash
   psql -U postgres
   ```

2. **In the PostgreSQL console, run:**
   ```sql
   CREATE DATABASE carrental;
   CREATE USER carrentaluser WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE carrental TO carrentaluser;
   \q
   ```

3. **Update database credentials** in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/carrental
   spring.datasource.username=carrentaluser
   spring.datasource.password=your_password
   ```

## Running the Application

### Step 1: Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Or using your IDE, run the `CarRentalApplication.java` main class.

3. The backend will start on **http://localhost:8080**

4. **Initial data** (agencies, cars, categories) will be automatically loaded from `data.sql`.

### Step 2: Start the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

4. The frontend will start on **http://localhost:4200**

### Step 3: Access the Application

Open your browser and navigate to: **http://localhost:4200**

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Cars
- `GET /api/cars` - Get all available cars
- `GET /api/cars/{id}` - Get car by ID
- `POST /api/cars/search` - Search available cars
- `GET /api/cars/categories` - Get car categories

### Agencies
- `GET /api/agencies` - Get all active agencies
- `GET /api/agencies/search?query={search}` - Search agencies
- `GET /api/agencies/airports` - Get airport agencies
- `GET /api/agencies/{id}` - Get agency by ID

### Reservations
- `GET /api/reservations/user/{userId}` - Get user reservations (authenticated)
- `GET /api/reservations/number/{reservationNumber}` - Get reservation by number
- `POST /api/reservations/create` - Create a reservation

## Default Data

The application comes with pre-loaded data:

### Agencies (12 locations across Morocco)
- Fès-Saïss Airport & City Center
- Casablanca Mohammed V Airport & City Center
- Marrakech Ménara Airport & Gueliz
- Rabat-Salé Airport & Agdal
- Tanger Ibn Battouta Airport & City Center
- Agadir Al Massira Airport & City Center

### Car Categories
- Petite citadine (Small city car)
- Moyenne (Medium size)
- Monospace (Minivan)
- SUV
- Hybride (Hybrid)
- Premium

### Sample Cars
- Kia Picanto, Hyundai i10, Dacia Sandero
- Renault Clio, Renault Megane
- Dacia Duster, Audi Q5
- Renault Arkana (Hybrid)
- Mercedes-Benz A200 (Premium)

## Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/carrental
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT
jwt.secret=your-secret-key
jwt.expiration=86400000

# JPA
spring.jpa.hibernate.ddl-auto=create-drop  # Use 'update' in production
```

### Frontend Configuration
Edit `frontend/src/app/services/*.service.ts` to change the API base URL:

```typescript
private apiUrl = 'http://localhost:8080/api';
```

## Security

- JWT tokens are used for authentication
- Passwords are encrypted using BCrypt
- CORS is configured for Angular frontend (http://localhost:4200)
- Protected endpoints require valid JWT token

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
ng test
```

## Production Deployment

### Backend
1. Build the JAR file:
   ```bash
   mvn clean package -DskipTests
   ```

2. Run the JAR:
   ```bash
   java -jar target/car-rental-backend-1.0.0.jar
   ```

### Frontend
1. Build for production:
   ```bash
   ng build --configuration production
   ```

2. Deploy the `dist/car-rental-frontend` folder to your web server.

## Troubleshooting

### Common Issues

1. **PostgreSQL Connection Error**
   - Ensure PostgreSQL is running
   - Verify database credentials in `application.properties`
   - Check if the database `carrental` exists

2. **CORS Errors**
   - Verify the backend is running on port 8080
   - Check CORS configuration in `SecurityConfig.java`

3. **Port Already in Use**
   - Change the port in `application.properties` (backend)
   - Use `ng serve --port 4201` (frontend)

4. **Node Modules Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please open an issue on the repository.

---

**Happy Coding! 🚗**
