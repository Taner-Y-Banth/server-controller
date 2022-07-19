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

    bds.stdin.write(message + '\n')

    const altaccount = '"Camera Man 3000"'
// switch(command){
//     'command':
//     msg.reply('One moment while I traverse the Matrix')
//     break
//     ''

// }
    if (command === 'command') {
        msg.reply('One moment while I traverse the Matrix')
    }
    if (command === 'home') {
        msg.reply('One moment while I walk back home')
        bds.stdin.write('tp ' + altaccount + ' -4212 225 -2810' + '\n')
    }
    if (command === 'raid') {
        msg.reply('Need some emeralds, or maybe some redstone?')
        bds.stdin.write('tp' + altaccount + ' 655 150 2876' + '\n')
    }
    if (command === 'gunpowder') {
        msg.reply('Would you like to ignite some TNT?')
        bds.stdin.write('tp' + altaccount + ' -1352 216 4599' + '\n')
    }
    if (command === 'iron') {
        msg.reply('Meow, meow, meowww...')
        bds.stdin.write('tp' + altaccount + ' -648 65 3852' + '\n')
    }
})



