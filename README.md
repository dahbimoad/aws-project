# Regional Time API

A Node.js API that returns the current time for selected regions around the world.

## Features

- Get current time for any timezone region
- List all available timezone regions
- Interactive API documentation with Swagger UI

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the server:
   ```
   npm start
   ```
4. The server will start at http://localhost:3000
5. Access the Swagger documentation at http://localhost:3000/api-docs

## AWS Amplify Deployment

### Prerequisites
- AWS Account
- AWS Amplify CLI installed and configured
- Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)

### Deployment Steps

1. Push your code to your Git repository

2. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/

3. Choose "Connect app"

4. Select your Git provider and repository

5. Follow the setup instructions:
   - Select the branch to deploy
   - Configure build settings (the amplify.yml file is already included)
   - Review and save

6. Amplify will build and deploy your application

7. Once deployed, you can access your API at the provided Amplify URL

### Environment Variables

If needed, set these environment variables in the Amplify Console:
- `PORT`: Port for the application (default: 3000)

## API Endpoints

- `GET /api/regions`: List all available timezone regions
- `GET /api/time/{region}`: Get current time for a specific region
- `GET /api-docs`: API documentation
