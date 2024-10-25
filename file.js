const fs = require('fs')

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

module.exports = checkFileExists