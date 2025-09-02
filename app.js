const { createClient } = require('./createClient')
const { createServer } = require('./createServer')
const { ask, closeInput } = require('./globalFunctions')



const initiliazeProject = async() => {
    console.log('Welcome to the Project Creator!')
    console.log('which project do you want me to build for you?')
    console.log('press the number of the option you desire')
    console.log('    1. Full project (client + server)')
    console.log('    2. Server ')
    console.log('    3. Client')


    let option;
    while (true) {
        option = (await ask("> ")).trim();
        if (["1", "2", "3"].includes(option)) break;
        console.log("❌ Invalid choice. Please select 1, 2, or 3.\n");
    }

    console.log(`✅ You chose option ${option}`);
    switch (option) {
        case '1':
            await createClient();
            await createServer();
            break;

        case '2':
            await createServer();
            break;

        case '3':
            await createClient();
            break;

        default:
            console.log("this should never happen if. \n if it happen to you please report to the creator of this script.");
            break;
    }
    closeInput();

}


initiliazeProject()


// console.log("\n✅ Setup complete! Run:");
// console.log("   cd server && node server.js   # to start server");
// console.log("   cd client && npm start        # to start client");