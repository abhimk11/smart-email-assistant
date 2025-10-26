# Use an official Java runtime as the base image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy everything from your backend folder into /app
COPY . .

# Build your Spring Boot JAR using Maven Wrapper
RUN ./mvnw clean package -DskipTests

# Expose your app's port (usually 8080)
EXPOSE 8080

# Run the built JAR
CMD ["java", "-jar", "target/*.jar"]
