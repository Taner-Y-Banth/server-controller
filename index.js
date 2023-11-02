const Discord = require("discord.js");
const fs = require('fs');
const { spawn } = require('child_process');
const config = require('./config'); // Separate configuration file

// Constants
const overworldTp = 'tp';
const netherTp = 'execute in nether run tp';
const endTp = 'execute in the_end run tp';
const altaccount = '"Camera Man 3000"';
const commandsFile = 'commands.json'; // JSON file to store custom commands

let commands = [];

// Load commands from JSON file
if (fs.existsSync(commandsFile)) {
    try {
        commands = JSON.parse(fs.readFileSync(commandsFile));
    } catch (error) {
        console.error('Error loading commands from JSON file:', error);
    }
}

const bds = spawn('./bedrock_server', {
    cwd: config.serverDirectory,
    env: { LD_LIBRARY_PATH: config.libraryPath }
});

bds.stdin.write('hello');

bds.stdout.on('data', (data) => {
    console.log(`Server Output: ${data}`);
});

bds.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
});

bds.on('exit', (code) => {
    console.log(`Server process exited with code ${code}`);
});

const prefix = config.prefix;
const bot = new Discord.Client();

bot.login(config.discordBotToken);

bot.on('message', async (msg) => {
    if (!msg.content.startsWith(prefix)) {
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'savecommands') {
        // Save custom commands to JSON file
        try {
            fs.writeFileSync(commandsFile, JSON.stringify(commands, null, 4));
            msg.reply('Custom commands have been saved.');
        } catch (error) {
            console.error('Error saving custom commands to JSON file:', error);
            msg.reply('An error occurred while saving custom commands.');
        }
        return;
    }

    const foundCommand = commands.find((cmd) => cmd.name === command);
    if (foundCommand) {
        foundCommand.action(msg, args);
    }
});