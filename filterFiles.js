const fs = require('fs')

let dir = './dir'

let files = fs.readdirSync(dir)

let re = /^u=.*\.(png|jpe?g|gif|svg)(\?.*)?$/

delFiles = files.filter(item => {
    return !re.test(item)
})

for (let i = 0, len = delFiles.length; i < len; i++) {
    let file = delFiles[i]
    fs.unlinkSync(`${dir}/${file}`)
}
