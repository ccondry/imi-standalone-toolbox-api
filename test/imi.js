// load environment file
require('dotenv').config()
// imi model
const imi = require('../src/models/imi')

// get user
imi.get('ccondry@cisco.com')
.then(user => console.log(user))
.catch(e => console.error(e))

// create user 
// imi.create('ccondry@cisco.com')
// .then(r => console.log(r))
// .catch(e => console.error(e))