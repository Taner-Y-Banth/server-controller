const Discord = require("discord.js");

const { spawn } = require('child_process');
const bds = spawn('bedrock_server', { cwd: '/home/tbryant/Desktop/Minecraft/crimsonbedrock', env: { LD_LIBRARY_PATH: '/home/tbryant/Desktop/Minecraft/crimsonbedrock' } });

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

bot.on('ready', () => {
    console.log('bot is ready')
})

bot.login(token)

bot.on('message', async (msg) => {
    //if our message doesnt start with our defined prefix, dont go any further into function
    if (!msg.content.startsWith(prefix)) {
        console.log('no prefix')
        return
    }

    //slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
    const args = msg.content.slice(prefix.length).trim().split(' ')

    //splits off the first word from the array, which will be our command
    const command = args.shift().toLowerCase()
    //log the command
    console.log('command: ', command)
    //log any arguments passed with a command
    console.log(args)

    const message = args.join(' ');

    bds.stdin.write(message)

    if (command === 'command') {
        msg.reply('One moment while I traverse the Matrix')
    }
})

