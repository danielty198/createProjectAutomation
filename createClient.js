const { runCommand } = require('./globalFunctions')
const fs = require("fs");
const path = require("path");
const readline = require("readline");

let newDirectoryName = 'Client'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("how do you want to call the directory?", (answer) => {
    if (answer) {
        newDirectoryName = answer
    }
    rl.close();
});
// Step 4: Create client directory
const clientPath = path.join(__dirname, newDirectoryName);
if (!fs.existsSync(clientPath)) {
    fs.mkdirSync(clientPath);
    console.log(`📂 Created ${newDirectoryName} directory`);
}

// Step 5: Setup React app in client
runCommand("npx create-react-app .", clientPath);

// Step 6: Install MUI dependencies
runCommand(
    "npm install @mui/material @mui/x-data-grid @emotion/react @emotion/styled react-router-dom dayjs stylis @mui/icons-material",
    clientPath
);