const { runCommand } = require('./globalFunctions')
const fs = require("fs");
const path = require("path");
const { ask } = require('./globalFunctions')

const createServer = async () => {


    console.log('Beginning to create the server 🗄️🤖👨🏻‍💻')


    let newDirectoryName = await ask("How do you want to call the server directory? ");
    if (!newDirectoryName) newDirectoryName = "Server";


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
    console.log("   cd server && node server.js   # to start server");
}


module.exports = {
    createServer
}