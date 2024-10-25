const checkFileExists = require('./file.js');
const networkScan = require('./network.js');
const wordpressScanVulnerability = require('./vulnerability.js')

async function main() {
    await checkFileExists('scan_network_result.txt');
    await networkScan();
    await wordpressScanVulnerability();
}

main();
