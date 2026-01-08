# Cymulate-exercise

## Build and Run with Docker Compose

To build and run the entire application using Docker Compose, navigate to the root directory of the project and run:

```bash
docker-compose up --build
```

This command will:
1. Build the Docker images for `phishing-simulation-service`, `phishing-management-service`, and `frontend`.
2. Start the MongoDB database.
3. Start all services and connect them.

Once running, the application will be accessible at:
- **Frontend**: http://localhost:80
- **Phishing Management API**: http://localhost:4547
- **Phishing Simulation API**: http://localhost:9845

## Please note
 You have to add mail sender environment variables (GMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN) to the docker-compose.yaml file.
s