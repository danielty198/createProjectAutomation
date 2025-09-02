const { runCommand } = require('./globalFunctions')
const fs = require("fs");
const path = require("path");
const { ask } = require('./globalFunctions')


const createClient = async () => {

    console.log('Beginning to create the client 🌐👨🏻‍💼💎')


    let newDirectoryName = await ask("How do you want to call the directory? ");
    if (!newDirectoryName) newDirectoryName = "Client";
    // Step 4: Create client directory
    const clientPath = path.join(__dirname, newDirectoryName);
    if (!fs.existsSync(clientPath)) {
        fs.mkdirSync(clientPath);
        console.log(`📂 Created ${newDirectoryName} directory`);
    }

    // Step 5: Setup React app in client
    runCommand("npx create-react-app .", clientPath);

    console.log(`Installed React Successfully ✅️`)

    // Step 6: Install MUI dependencies
    runCommand("npm install @mui/material @mui/x-data-grid @emotion/react @emotion/styled react-router-dom dayjs stylis @mui/icons-material", clientPath);
    console.log(`Installed Dependencies Successfully ✅️`)
    console.log("   cd client && npm start      # to start client");
}

module.exports = {
    createClient
}