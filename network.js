const inquirer = require('inquirer');
const { exec } = require('child_process');
const fs = require('fs');

const networkScan = async function() {
    const checkFileExists = (filePath) => {
        return new Promise((resolve, reject) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    // File does not exist, create it
                    fs.writeFile(filePath, '', (writeErr) => {
                        if (writeErr) {
                            reject(new Error(`Unable to create file ${filePath}: ${writeErr.message}`));
                        } else {
                            console.log(`File ${filePath} created.`);
                            resolve();
                        }
                    });
                } else {
                    resolve(); // File exists, proceed
                }
            });
        });
    };

    // Tunggu hingga checkFileExists selesai
    await checkFileExists('scan_network_result.txt');

    const questions = [
        {
            type: 'input',
            name: 'ranges',
            message: "What's the ranges?",
        },
    ];

    inquirer.prompt(questions).then(answers => {
        console.log(`You entered: ${answers.ranges}!`);

        exec(`nmap -sN ${answers.ranges}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }

            // Split output into lines for processing
            const lines = stdout.split('\n');
            const ipPorts = [];

            let currentIP = '';
            lines.forEach(line => {
                // Capture the IP address
                const ipMatch = line.match(/Nmap scan report for (\d+\.\d+\.\d+\.\d+)/);
                if (ipMatch) {
                    currentIP = ipMatch[1]; // Update current IP
                }

                // Capture ports associated with the current IP
                const portMatch = line.match(/^(\d+)\/tcp\s+open|filtered\s+\w+/);
                if (portMatch && currentIP) {
                    ipPorts.push(`http://${currentIP}:${portMatch[1]}`); // Add IP:PORT to the array
                }
            });

            if (ipPorts.length > 0) {
                console.log('Found IPs and ports:');
                ipPorts.forEach(match => console.log(match));
                fs.writeFile(`scan_network_result.txt`, ipPorts.join('\n'), (error) => {
                    if (error) {
                        console.error('Error writing to file:', error);
                    }
                    console.log('Result saved to scan_network_result.txt');
                });
            } else {
                console.log('No IPs and ports found.');
            }
        });
    }).catch(error => {
        console.error('Error:', error);
    });
};


module.exports = networkScan;
