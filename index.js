const Discord = require("discord.js");
const { spawn } = require('child_process');

const bds = spawn('./bedrock_server', {
  cwd: '/home/tbryant/Desktop/Minecraft/crimsonbedrock',
  env: { LD_LIBRARY_PATH: '/home/tbryant/Desktop/Minecraft/crimsonbedrock' }
});

bds.stdin.write('hello');

bds.stdout.on('data', (data) => {
  console.log(`${data}`);
});

bds.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

bds.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});

const prefix = '-';
const bot = new Discord.Client();
const token = 'YOUR_DISCORD_BOT_TOKEN';

bot.login(token);

const commands = [
  {
    name: 'addcommand',
    description: 'Add a new custom command',
    action: (message, args) => {
      const newCommand = args[0]; // The new command name
      const newDescription = args.slice(1).join(' '); // The new command description

      // Check if the new command doesn't already exist
      if (!commands.some((cmd) => cmd.name === newCommand)) {
        commands.push({
          name: newCommand,
          description: newDescription,
          action: () => /* Define action for the new command here */,
        });
        message.reply(`New command '${newCommand}' added.`);
      } else {
        message.reply(`Command '${newCommand}' already exists.`);
      }
    },
  },
  {
    name: 'command',
    description: 'One moment while I traverse the Matrix',
    action: (message) => message.reply('One moment while I traverse the Matrix'),
  },
  {
    name: 'tpalt_o',
    description: 'Your wish is my command',
    action: (message, args) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} ${args.join(' ')}\n`);
      message.reply('Your wish is my command');
    },
  },
  {
    name: 'tpalt_n',
    description: 'Your wish is my command',
    action: (message, args) => {
      const netherTp = 'execute in nether run tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${netherTp} ${altaccount} ${args.join(' ')}\n`);
      message.reply('Your wish is my command');
    },
  },
  {
    name: 'tpalt_e',
    description: 'Your wish is my command',
    action: (message, args) => {
      const endTp = 'execute in the_end run tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${endTp} ${altaccount} ${args.join(' ')}\n`);
      message.reply('Your wish is my command');
    },
  },
  {
    name: 'home',
    description: 'One moment while I walk back home',
    action: (message) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} 710 46 1940\n`);
      message.reply('One moment while I walk back home');
    },
  },
  {
    name: 'raid',
    description: 'Need some emeralds, or maybe some redstone?',
    action: (message) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} 655 150 2876\n`);
      message.reply('Need some emeralds, or maybe some redstone?');
    },
  },
  {
    name: 'gunpowder',
    description: 'Would you like to ignite some TNT?',
    action: (message) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} -1352 216 4599\n`);
      message.reply('Would you like to ignite some TNT?');
    },
  },
  {
    name: 'iron',
    description: 'Meow, meow, meowww...',
    action: (message) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} -648 65 3852\n`);
      message.reply('Meow, meow, meowww...');
    },
  },
  {
    name: 'shulker',
    description: 'UNLIMITED STORAGE!!!',
    action: (message) => {
      const endTp = 'execute in the_end run tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${endTp} ${altaccount} 1041.0 133 574.0\n`);
      message.reply('UNLIMITED STORAGE!!!');
    },
  },
  {
    name: 'gold',
    description: 'Oink, oink, swords galore',
    action: (message) => {
      const overworldTp = 'tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${overworldTp} ${altaccount} 32.0 84 2736.0\n`);
      message.reply('Oink, oink, swords galore');
    },
  },
  {
    name: 'fortress',
    description: 'Farming wither skeletons in Minecraft is a skeleton of a job, but someone has got to do it',
    action: (message) => {
      const netherTp = 'execute in nether run tp';
      const altaccount = '"Camera Man 3000"';
      bds.stdin.write(`${netherTp} ${altaccount} -197 67 1614\n`);
      message.reply('Farming wither skeletons in Minecraft is a skeleton of a job, but someone has got to do it');
    },
  },
  // Add more commands here
];

bot.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  const foundCommand = commands.find((cmd) => cmd.name === command);
  if (foundCommand) {
    foundCommand.action(msg, args);
  }
});
