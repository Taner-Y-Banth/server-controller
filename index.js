const Discord = require("discord.js");
const fs = require('fs');
const { spawn } = require('child_process');
const config = require('/home/tbryant/Desktop/server-controller/config'); // Separate configuration file

// Constants
const overworldTp = 'tp';
const netherTp = 'execute in nether run tp';
const endTp = 'execute in the_end run tp';
const altaccount = '"Camera Man 3000"';
const commandsFile = config.commandsPath; // JSON file to store custom commands

const bds = spawn('./bedrock_server', {
    cwd: config.serverDirectory,
    env: { LD_LIBRARY_PATH: config.libraryPath }
});

bds.stdout.on('data', (data) => {
    console.log(`${data}`);
});

bds.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

bds.on(' ', (code) => {
    console.log(`child process exited with code ${code}`);
});

const prefix = config.prefix;
const bot = new Discord.Client();
const token = config.discordBotToken;

bot.login(token)

// Function to load custom commands from the JSON file
function loadCommands() {
    try {
        const data = fs.readFileSync(commandsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading custom commands from JSON file:', error);
        return [];
    }
}

let commands = loadCommands();

bot.on('message', async (msg) => {
    // If our message doesn't start with our defined prefix, don't go any further into the function
    if (!msg.content.startsWith(prefix)) {
        return;
    }

    // Slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ');

    // Splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase();

    const message = args.join(' ');

    bds.stdin.write(message + '\n');

    switch (command) {
        case 'command':
            msg.reply('One moment while I traverse the Matrix');
            break;
        case 'tpalt_o':
            msg.reply('Your wish is my command');
            bds.stdin.write(`${overworldTp} ${altaccount} ${message}\n`);
            break;
        case 'tpalt_n':
            msg.reply('Your wish is my command');
            bds.stdin.write(`${netherTp} ${altaccount} ${message}\n`);
            break;
        case 'tpalt_e':
            msg.reply('Your wish is my command');
            bds.stdin.write(`${endTp} ${altaccount} ${message}\n`);
            break;
        case 'tpalt':
            msg.reply('Your wish is my command');
            bds.stdin.write(`${overworldTp} ${altaccount} ${message}\n`);
            break;
        case 'remove':
            const commandNameToRemove = args[0];
            const indexToRemove = commands.findIndex((cmd) => cmd.name === commandNameToRemove);
            if (indexToRemove !== -1) {
                commands.splice(indexToRemove, 1);
                msg.reply(`Command '${commandNameToRemove}' removed.`);
                fs.writeFileSync(commandsFile, JSON.stringify(commands, null, 4));
            } else {
                msg.reply(`Command '${commandNameToRemove}' not found.`);
            }
            break;
        case 'add':
        case 'add_n':
        case 'add_e':
            const input = args.join(' ');
            const [newCommand, descriptionCoordinates] = input.split('|').map((item) => item.trim());
            const [newDescription, coordinates] = descriptionCoordinates.split('/').map((item) => item.trim());
            if (newCommand && descriptionCoordinates && coordinates) {
                let tpDetails = '';

                // Check if the new command doesn't already exist
                if (!commands.some((cmd) => cmd.name === newCommand)) {
                    if (command === 'add') {
                        tpDetails = `overworld, ${coordinates}`
                    } else if (command === 'add_n') {
                        tpDetails = `nether, ${coordinates}`
                    } else if (command === 'add_e') {
                        tpDetails = `the_end, ${coordinates}`
                    }

                    commands.push({
                        name: newCommand,
                        description: newDescription,
                        action: tpDetails,
                    });

                    msg.reply(`New command '${newCommand}' added.`);
                    fs.writeFileSync(commandsFile, JSON.stringify(commands, null, 4));
                } else {
                    msg.reply(`Command '${newCommand}' already exists.`);
                }
            } else {
                msg.reply('Invalid input format. Please use: -addcommand [name] | [description] / [action]');
            }
            break;
        case 'savecommands':
            try {
                fs.writeFileSync(commandsFile, JSON.stringify(commands, null, 4));
                msg.reply('Custom commands have been saved.');
            } catch (error) {
                console.error('Error saving custom commands to JSON file:', error);
                msg.reply('An error occurred while saving custom commands.');
            }
            break;
        case 'listcommands':
            listCommands(msg);
            break;
        default:
            // Check if it's a custom command and execute it
            if (commands.some(cmd => cmd.name === command)) {
                executeCustomCommand(command, msg, bds, commands);
            } else {
                msg.reply('Command not found.');
            }
            break;
    }
});

// Function to execute custom commands based on the command name
function executeCustomCommand(commandName, msg, bds, commands) {
    const command = commands.find(cmd => cmd.name === commandName);
    if (command) {
        const [dimension, coords] = command.action.split(', ').map(item => item.trim());
        msg.reply(command.description);
        bds.stdin.write(`${getDimensionTp(dimension)} ${altaccount} ${coords}\n`);
    }
}

// Helper function to get the appropriate dimension TP command
function getDimensionTp(dimension) {
    switch (dimension) {
        case 'overworld':
            return overworldTp;
        case 'nether':
            return netherTp;
        case 'the_end':
            return endTp;
        default:
            return '';
    }
}

function listCommands(msg) {
    let response = 'Here are the available commands and their usage:\n\n';

    // Add commands from index.js
    response += 'Commands from index.js:\n';
    response += '1. `command`: Traverses the Matrix.\n';
    response += '2. `tpalt_o`: Teleports the alternative account to the specified location in the Overworld.\n';
    response += '3. `tpalt_n`: Teleports the alternative account to the specified location in the Nether.\n';
    response += '4. `tpalt_e`: Teleports the alternative account to the specified location in the End.\n';
    response += '5. `tpalt`: Teleports the alternative account to the specified location in the Overworld.\n';
    response += '6. `remove [name]`: Removes a custom command.\n';
    response += '7. `add [name] | [description] / [coordinates]`: Adds a new custom command for the Overworld.\n';
    response += '8. `add_n [name] | [description] / [coordinates]`: Adds a new custom command for the Nether.\n';
    response += '9. `add_e [name] | [description] / [coordinates]`: Adds a new custom command for the End.\n';
    response += '10. `savecommands`: Saves the current list of custom commands to the JSON file.\n\n';

    // Add commands from commands.json
    response += 'Commands from commands.json:\n';
    commands.forEach((cmd) => {
        response += `${cmd.name}: ${cmd.description} | ${cmd.action}\n`;
    });

    msg.reply(response);
}