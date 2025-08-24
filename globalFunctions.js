
const { execSync } = require("child_process");



// cwd - current working directory

runCommand = (command, cwd) => {
    try {
        console.log(`\n📦 Running: ${command} in ${cwd || process.cwd()}`);
        execSync(command, { stdio: "inherit", cwd });
    } catch (err) {
        console.error(`❌ Error running command: ${command}`);
        process.exit(1);
    }
}

module.exports = {
    runCommand
}