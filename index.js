const { exec } = require('child_process')

const fileName = Math.floor(Date.now() * Math.random()).toString(36)
console.log(fileName)

function executeJsFile () {
  exec('node teste.js', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}

executeJsFile()
