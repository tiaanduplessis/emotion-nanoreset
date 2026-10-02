#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const readLocation = path.join(process.cwd(), 'node_modules', 'nanoreset', 'nanoreset.css')
const writeLocation = path.join(process.cwd(), 'src', 'reset.js')
const resetContent = fs.readFileSync(readLocation, 'utf-8')
const hash = content => crypto.createHash('sha256').update(content).digest('hex')

// The original committed bundle predates this one nanoreset 4.0.0 declaration.
// Keep its shipped global CSS unchanged during the tooling refresh. Any future
// reset change requires an explicit input/output fixture and hash review.
if (hash(resetContent) !== '13a0cb3011fa5bf0b4e09d9233278e23898b2daa3d4a9945303c4ac83b7dc64e') {
  throw new Error('Unexpected nanoreset CSS: review the pinned input before regenerating')
}
const compatibleReset = resetContent.replace(
  'button,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n',
  'button,\ninput,\nselect,\ntextarea {\n'
)
if (hash(compatibleReset) !== '83d89cc00ae8111f530523633c80897038313538651993987fe53558f69f2590') {
  throw new Error('Unexpected compatibility CSS: review the shipped output before regenerating')
}

const newFile = `
export default \`
${compatibleReset}
\`
`

fs.writeFileSync(writeLocation, newFile)
