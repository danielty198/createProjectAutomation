Hello,
I got bored, so I decided I’m tired of writing the same code over and over again.
Then I thought about what I could do about it, and suddenly I remembered—I know how to code!

Why not spend 4 hours building something that would only take me 5 minutes to do by hand?

So, I went to my favorite Indian worker (ChatGPT) and told him to create this app for me.

This was the prompt:

"
create a nodejs script that creates 2 directories 
server - in the server it installs the modules - express, dotenv, mongoose,node-cron, cors, multer, axios 
client - installs react , mui , mui-datagrid,react-router-dom,dayjs, mui stylis, mui icons 
i want in the server directory to create a file called server.js that written inside the basic code to start a server

"

And this is the code I got back:


<---------------------------------------------------------------------------------------------------------------------->

  
// setup.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function runCommand(command, cwd) {
  try {
    console.log(`\n📦 Running: ${command} in ${cwd || process.cwd()}`);
    execSync(command, { stdio: "inherit", cwd });
  } catch (err) {
    console.error(`❌ Error running command: ${command}`);
    process.exit(1);
  }
}

// Step 1: Create server directory
const serverPath = path.join(__dirname, "server");
if (!fs.existsSync(serverPath)) {
  fs.mkdirSync(serverPath);
  console.log("📂 Created server directory");
}

// Step 2: Init server and install dependencies
runCommand("npm init -y", serverPath);
runCommand(
  "npm install express dotenv mongoose node-cron cors multer axios",
  serverPath
);

// Step 3: Create server.js file
const serverJsContent = `
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.listen(PORT, () => {
  console.log(\`✅ Server listening on port \${PORT}\`);
});
`;

fs.writeFileSync(path.join(serverPath, "server.js"), serverJsContent);
console.log("📝 Created server/server.js");

// Step 4: Create client directory
const clientPath = path.join(__dirname, "client");
if (!fs.existsSync(clientPath)) {
  fs.mkdirSync(clientPath);
  console.log("📂 Created client directory");
}

// Step 5: Setup React app in client
runCommand("npx create-react-app .", clientPath);

// Step 6: Install MUI dependencies
runCommand(
  "npm install @mui/material @mui/x-data-grid @emotion/react @emotion/styled react-router-dom dayjs stylis @mui/icons-material",
  clientPath
);

console.log("\n✅ Setup complete! Run:");
console.log("   cd server && node server.js   # to start server");
console.log("   cd client && npm start        # to start client");

<---------------------------------------------------------------------------------------------------------------------->


This is a good start for the project, so I split it into 3 files because it was too messy for me at first.
Now, I’m going to add the ability to choose the directory name, and on the server side I want it to initialize with 3 extra directories:
/models
/controllers
/routers

…with templates inside.
