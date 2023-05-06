FROM openjdk:17-alpine

VOLUME /app

ARG JAR_FILE=./target/*.jar

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]