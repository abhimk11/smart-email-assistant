# Use Java 21
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Build the Spring Boot JAR
RUN ./mvnw clean package -DskipTests

# Expose the port
EXPOSE 8080

# Run the built JAR using wildcard and PORT env
ENV PORT=8080
CMD ["sh", "-c", "java -Dserver.port=$PORT -jar target/*.jar"]
