
const { exec } = require('child_process');

exec('cd /home/tbryant/Desktop/Minecraft/crimsonbedrock ; LD_LIBRARY_PATH=. ./bedrock_server', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});