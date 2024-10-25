const networkScan = require('./network.js');
const wordpressScanVulnerability = require('./vulnerability.js');

const runScans = async () => {
    try {
        await networkScan(); // Wait for networkScan to complete
        await wordpressScanVulnerability(); // Then call wordpressScanVulnerability
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

runScans();
