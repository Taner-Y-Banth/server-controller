const Discord = require("discord.js");

const { spawn } = require('child_process');
const bds = spawn('./bedrock_server', { cwd: '/home/tbryant/Desktop/Minecraft/crimsonbedrock', env: { LD_LIBRARY_PATH: '/home/tbryant/Desktop/Minecraft/crimsonbedrock' } });

bds.stdin.write('hello')

bds.stdout.on('data', (data) => {
    console.log(`${data}`);
});

bds.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

bds.on(' ', (code) => {
    console.log(`child process exited with code ${code}`);
});

const prefix = '-'
const bot = new Discord.Client();
const token = 'Nzg5NzMwOTI1OTQzODQ4OTkx.X92UPQ.WyLvRS2CXl1NeUKPc-kulnSdA8A'

bot.login(token)

bot.on('message', async (msg) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if (!msg.content.startsWith(prefix)) {
        return
    }

    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ')

    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()

    const message = args.join(' ');

    const overworldTp = 'tp';
    const netherTp = 'execute in nether run tp';
    const endTp = 'execute in the_end run tp';

    bds.stdin.write(message + '\n')

    const altaccount = '"Camera Man 3000"'

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
        case 'home':
            msg.reply('One moment while I walk back home');
            bds.stdin.write(`${overworldTp} ${altaccount} 710 46 1940\n`);
            break;
        case 'raid':
            msg.reply('Need some emeralds, or maybe some redstone?');
            bds.stdin.write(`${overworldTp} ${altaccount} 655 150 2876\n`);
            break;
        case 'gunpowder':
            msg.reply('Would you like to ignite some TNT?');
            bds.stdin.write(`${overworldTp} ${altaccount} -1352 216 4599\n`);
            break;
        case 'iron':
            msg.reply('Meow, meow, meowww...');
            bds.stdin.write(`${overworldTp} ${altaccount} -648 65 3852\n`);
            break;
        case 'shulker':
            msg.reply('UNLIMITED STORAGE!!!');
            bds.stdin.write(`${endTp} ${altaccount} 1041.0 133 574.0\n`);
            break;
        case 'gold':
            msg.reply('Oink, oink, swords galore');
            bds.stdin.write(`${overworldTp} ${altaccount} 32.0 84 2736.0\n`);
            break;
        case 'fortress':
            msg.reply('Farming wither skeletons in Minecraft is a skeleton of a job, but someone has got to do it');
            bds.stdin.write(`${netherTp} ${altaccount} -197 67 1614\n`);
            break;
        default:
            break;
    }

})



