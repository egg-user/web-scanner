const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const webNames = fs.readFileSync('./filewebname.txt', 'utf-8').split('\n').filter(Boolean);

const cleanedWebNames = webNames.map(name => name.trim());

const folderName = 'recon_output';

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
}

const scriptCode = function(webName) {
    const cleanWebName = webName.replace(/^https?:\/\//, '');
    const portMatch = cleanWebName.match(/:(\d+)/);
    const host = portMatch ? cleanWebName.replace(/:\d+/, '') : cleanWebName;
    const port = portMatch ? portMatch[1] : null;

    const fileName = port ? `${host}.p${port}.txt` : `${host}.txt`;

    fs.writeFileSync(path.join(folderName, fileName), `Website: ${webName}`, 'utf-8');

    const command = `wpscan --url "${webName}" --enumerate ap >> "${path.join(folderName, fileName)}"`;
    console.log(`Executing command: ${command}`);
    console.log(`Clean web name: ${fileName}`);

    exec(command, { shell: true }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
}

cleanedWebNames.forEach(webName => {
    scriptCode(webName);
});

console.log(`File telah dibuat di dalam folder "${folderName}" dan wpscan dijalankan untuk setiap nama web.`);
