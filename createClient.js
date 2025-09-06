const { runCommand } = require('./globalFunctions')
const fs = require("fs");
const path = require("path");
const { ask, removeDirectory } = require('./globalFunctions');
const { getPages } = require('./assets/clientPages');


const createClient = async () => {

    console.log('Beginning to create the client 🌐👨🏻‍💼💎')


    let newDirectoryName = await ask("How do you want to call the directory? ");
    if (!newDirectoryName) newDirectoryName = "client";
    // Step 4: Create client directory
    const clientPath = path.join(process.cwd(), newDirectoryName.toLowerCase());
    if (!fs.existsSync(clientPath)) {
        fs.mkdirSync(clientPath);
        console.log(`📂 Created ${newDirectoryName} directory`);
    }

    // Step 5: Setup React app in client
    console.log("📦 Setting up React app...");
    runCommand("npm create vite@latest . -- --template react", clientPath);

    console.log(`Installed React Successfully ✅️`)

    // Step 6: Install MUI dependencies
    console.log("📦 Installing dependencies...");
    runCommand("npm install @mui/material @mui/x-data-grid @emotion/react @emotion/styled react-router-dom dayjs stylis @mui/icons-material", clientPath);
    console.log(`Installed Dependencies Successfully ✅️`)


    // Step 7: Delete unwanted files from client
    console.log("🗑️ Deleting unwanted files...");

    const dirsToDelete = [path.join(clientPath, "public"), path.join(clientPath, "src")]

    dirsToDelete.forEach(dir => {
        removeDirectory(dir);
    });


    console.log("Deleted unwanted files successfully ✅️");

    // Step 8: Create necessary files and folders
    console.log("📝 Creating necessary files and folders...");

    const folders = ['src', 'src/components', 'src/pages', 'src/assets', 'src/assets/images'];
    folders.forEach(folder => {
        const folderPath = path.join(clientPath, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    });


    const pages = getPages(clientPath)

    // Step 9: Create client files
    console.log("📝 Creating client files...");
    pages.forEach(page => {
        fs.writeFileSync(page.path, page.content);
    });


    console.log("🎉 Client setup complete!");
}

module.exports = {
    createClient
}