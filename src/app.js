import fs from 'fs'

const file = fs.readFileSync('./package.json', {encoding: 'utf8', flag: 'r'})

console.log(file)
