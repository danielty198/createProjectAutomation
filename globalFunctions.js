
const { execSync } = require("child_process");

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// cwd - current working directory



const ask = question => new Promise(resolve => rl.question(question, resolve)); // makes it async


const closeInput = () => rl.close();



const runCommand = (command, cwd) => {
    try {
        execSync(command, { stdio: "inherit", cwd });
    } catch (err) {
        console.error(`❌ Error running command: ${command}`);
        process.exit(1);
    }
}



module.exports = {
    runCommand,
    ask,
    closeInput
}