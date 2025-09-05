const { runCommand } = require('./globalFunctions')
const fs = require("fs");
const path = require("path");
const { ask } = require('./globalFunctions')
const { getPages } = require('./serverPages')
const createServer = async () => {


  console.log('Beginning to create the server 🗄️🤖👨🏻‍💻')


  let newDirectoryName = await ask("How do you want to call the server directory? ");
  if (!newDirectoryName) newDirectoryName = "server";


  // Step 1: Create server directory
  const serverPath = path.join(process.cwd(), newDirectoryName.toLowerCase());
  if (!fs.existsSync(serverPath)) {
    fs.mkdirSync(serverPath);
    console.log("📂 Created server directory");
  }

  // Step 2: Init server and install dependencies  
  console.log("📦 Initializing server and installing dependencies...");
  runCommand("npm init -y", serverPath);
  console.log("📦 Installing modules...");
  runCommand(
    "npm install express dotenv mongoose node-cron cors multer axios",
    serverPath
  );



  // Step 3: Create Directories
  console.log("📂 Creating server directories...");
  const folders = ['routes', 'models', 'controllers'];
  folders.forEach(folder => {
    const folderPath = path.join(serverPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`📂 Created server/${folder} directory`);
    }
  });


  const pages = getPages(serverPath)

  // Step 4: Create server files
  console.log("📝 Creating server files...");
  pages.forEach(page => {
    fs.writeFileSync(page.path, page.content);
  });
  console.log('Finished creating server files.')
  console.log("🎉 Server setup complete!");



}


module.exports = {
  createServer
}