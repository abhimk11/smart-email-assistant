# Use official OpenJDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Build the Spring Boot JAR
RUN ./mvnw clean package -DskipTests

# Expose the port your app uses
EXPOSE 8080

# Run the built JAR
CMD ["java", "-jar", "target/email-writer-backend-0.0.1-SNAPSHOT.jar"]
