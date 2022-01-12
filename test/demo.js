// load environment file
require('dotenv').config()
// imi model
const imi = require('../src/models/imi')

imi.startCollectionsDemo({
  customerNumber: '',
  debtAmount: '9999'
})
.then(r => console.log(r))
.catch(e => console.error(e))
