# Use Java 21
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Build JAR
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the built JAR
CMD ["java", "-jar", "target/email-writer-backend-0.0.1-SNAPSHOT.jar"]
