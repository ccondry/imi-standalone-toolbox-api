require('dotenv').config()
const db = require('../src/models/db')
const fs = require('fs')

const filename = 'test1.csv'
const delimiter = ','

// encode CSV data for proper formatting and delimiting
function csvEncoder (s) {
  // add double-quotes around strings and escape exisitng double-quotes
  // with a double-double-quotes
  if (typeof s === 'string') {
    return '"' + s.replace(/"/g, '""') + '"'
  } else {
    return s
  }
}

// write columns
const columnNames = [
  'email'
]

async function main () {
  // join column names into 1 line
  const columns = columnNames.map(v => csvEncoder(v)).join(delimiter)
  // write columns line to the output file
  fs.appendFileSync('./' + filename, columns + '\r\n')

  const query = {
    'demo.imi-standalone-v1.status': 'complete'
  }
  const projection = {
    email: 1,
    'demo.imi-standalone-v1': 1
  }
  // get list of users from mongo
  const users = await db.find('toolbox', 'users', query, projection)
  // write each line of data
  for (const user of users) {
    // get values for this user
    const values = columnNames.map(v => csvEncoder(user.demo['imi-standalone-v1'].email || user.email))
    // join data into 1 line
    const line = values.join(delimiter)
    // append line to output file
    fs.appendFileSync('./' + filename, line + '\r\n')
  }
  process.exit(0)
}

main()