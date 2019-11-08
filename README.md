# React and Node App

[Blog post](https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/) on this.

Serving a React App from a Node backend. This is a TypeScript project but the principle works in plain JS as well.

# Creation
1. Create the server at root level. The server lives in `src` and is compiled into the `dist` directory.
2. Create a React app inside the project using `yarn create react-app client -- typescript`
3. Update the `package.json` in the `client` directory to include `"proxy": "http://localhost:5000/"`. Where the port number is where the server runs. This means that calls to the API running on the node app can be relative.
4. [`concurrently`](https://www.npmjs.com/package/concurrently) can be used for development to run back end and front end in one terminal window.

# Deploying to Production

Add a condition to the `server.ts` file that listens to see if it is a production environment and if it is serves the static build of the React. This build is in `./client/build`. When deploying this app to production need to make sure the build process also builds the React app.
