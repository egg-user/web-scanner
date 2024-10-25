const networkScan = require('./network.js');
const wordpressScanVulnerability = require('./vulnerability.js');
const checkFileExists = require('./network.js')
const fs = require('fs')


const runScans = async () => {
    try {
        await checkFileExists('scan_network_result.txt')
        await networkScan(); // Wait for networkScan to complete
        await wordpressScanVulnerability(); // Then call wordpressScanVulnerability
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

runScans();
