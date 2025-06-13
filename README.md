# React & Node.js Skill Test

## Estimated Time

- 60 min

## Requirements

- Bug fix to login without any issues (20min) <br/>
  There is no need to change or add login function.
  Interpret the code structure and set the correct environment by the experience of building projects. <br/>
  Here is a login information. <br/>
  ✓ email: admin@gmail.com  ✓ password: admin123

- Implement Restful API of "Meeting" in the both of server and client sides (40min)<br/>
  Focus Code Style and Code Optimization. <br/>
  Reference other functions.


  ## How to Build and Run in local

  ### Prerequisites
  - Node.js 
  - npm or yarn
  - Mongodb run on your local in default port (27017)

  ### Server Setup
  1. Navigate to the server directory:
    ```bash
    cd Server
    ```
  2. Set environment variables:
    ```bash
    export DB_URL=mongodb://localhost:27017
    ```
  3. Install dependencies:
    ```bash
    npm install
    ```
  4. Start the server:
    ```bash
    npm start
    ```
  5. Set environment variable:
    ```bash
    export REACT_APP_BASE_URL=http://localhost:5001
    ```  
    
    The server will run on http://localhost:5001 by default.

  ### Client Setup
  1. Open a new terminal and navigate to the client directory:
    ```bash
    cd Client
    ```
  2. Install dependencies:
    ```bash
    npm install
    ```
  3. Start the React application:
    ```bash
    npm start
    ```
    The application will be available at http://localhost:3000.