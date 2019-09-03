#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const readLocation = path.join(process.cwd(), 'node_modules', 'nanoreset', 'nanoreset.css')
const writeLocation = path.join(process.cwd(), 'src', 'reset.js')
const resetContent = fs.readFileSync(readLocation, 'utf-8')

const newFile = `
export default \`
${resetContent}
\`
`

fs.writeFileSync(writeLocation, newFile)
