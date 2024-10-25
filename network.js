const inquirer = require('inquirer');
const {exec} = require('child_process');
const { error } = require('console');
const { stderr, stdout } = require('process');


const networkScan = function() {
    const questions = [
        {
          type: 'input',
          name: 'ranges',
          message: "What's the ranges?",
        },
      ];
    inquirer.prompt(questions).then(answers => {
        console.log(`${answers.ranges}!`)

        exec(`nmap -sN ${answers.ranges}`, (error, stderr, stdout) => {
            if (error) {
                console.error(`Kode tidak dapat dijalankan`)
                return
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`)
                return
            }
            console.log(`Output: \n${stdout}`)
        })
      }).catch(error => {
        console.error('Error:', error);
      });
};

networkScan()