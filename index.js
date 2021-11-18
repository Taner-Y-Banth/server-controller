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
const token = 'Nzg5NzMwOTI1OTQzODQ4OTkx.X92UPQ.z8uU34bSWxNxz6RwNvr7r_bfumk'

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

    if (command === 'command') {
        msg.reply('One moment while I traverse the Matrix')
    }
    // if (command === 'home') {
    //     msg.reply('One moment while I walk back home')
    //     bds.stdin.write('tp ' + altaccount + ' -4212 225 -2810' + '\n')
    // }
    if (command === 'skeleton') {
        msg.reply('I need to GET SHOT IN THE BONES')
        bds.stdin.write('tp' + altaccount + ' 2565 12 -570' + '\n')
    }
    if (command === 'iron') {
        msg.reply('Smithing is something that I love')
        bds.stdin.write('tp' + altaccount + ' 1176 112 -584' + '\n')
    }
})



