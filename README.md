# React and Node App

[Blog post](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/) on this.

Serving a React App from a Node backend. This is a TypeScript project but the principle works in plain JS as well.

# Set up

```
yarn install:all
```

# Run

```
yarn start:dev
```

# Background 

## How the client and server are connected

1. The server entry point lives in `src/server.ts` and is compiled into the `dist` directory.
2. The React app was created inside the project using `yarn create react-app client -- typescript`
3. The `package.json` in the `client` directory has `"proxy": "http://localhost:5000/"`. Where the port number is where the server runs. This means that calls to the API running on the node app can be relative. This allows development locally
4. [`concurrently`](https://www.npmjs.com/package/concurrently) is used for development to run back end and front end in one terminal window.

## Deploying to Production

Add a condition to the `server.ts` file that listens to see if it is a production environment and if it is serves the static build of the React. This build is in `./client/build`. When deploying this app to production need to make sure the build process also builds the React app.

Build and start steps:

```
yarn install:all
yarn build:all
yarn start
```
