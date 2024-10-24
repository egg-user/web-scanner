const {exec} = require('child_process')
const { error } = require('console')
const fs = require('fs')
const { stdout, stderr } = require('process')


function readWEbName(filePath) {
    return fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean)
}

function webScannerWordpress(webName) {
    exec(`wpscan --url ${webName} ==enumerate -p >> ${webName}.txt`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error cant execute code')
            return
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log(`Output: ${stdout}`)
    })
}

const webName = readWEbName('./filewebname.txt')

webName.forEach(webName => {
    webScannerWordpress(webName)
})