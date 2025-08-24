Hello 
i got bored so i decided im tired of writing the same code everytime again and again 
so i think what i can do about it and then i remmembered ! i know how to code!!!!

why not spend 4 hours building somethin that would take me 5 minutes by hands?

so i went to my favorite indian worker (chatgpt) and told him to create me this app 

this was the prompt - 
"
create a nodejs script that creates 2 directories 
server - in the server it installs the modules - express, dotenv, mongoose,node-cron, cors, multer, axios 
client - installs react , mui , mui-datagrid,react-router-dom,dayjs, mui stylis, mui icons 
i want in the server directory to create a file called server.js that written inside the basic code to start a server

"

and i got this code next 


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




this is a good start for the project so i split it into 3 files because it is to messy for me right now 
and im going to add the ability to choose what the directory is called 
i want in the server side to initilize with 3 extras directories 
/models
/controllers
/routers

with template inside 