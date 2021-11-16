const db = require('./db')

module.exports = {
  get,
  isProvisioned,
  set
}

async function isProvisioned (userId) {
  try {
    const response = await get(userId)
    return response.demo['imi-standalone-v1'].status
  } catch (e) {
    return false
  }
}

function get (id) {
  try {
    // build provision query and projection
    const query = {id}
    const projection = {
      'demo.imi-standalone-v1': 1
    }
    // find user
    return db.findOne('toolbox', 'users', query, {projection})
  } catch (e) {
    throw e
  }
}

async function set (id) {
  try {
    // build provision data query and updates
    const query = {id}
    const updates = {
      $set: {
        'demo.imi-standalone-v1.provisioned': true
      },
      $currentDate: {
        'demo.imi-standalone-v1.lastAccess': { $type: 'date' },
        'demo.imi-standalone-v1.modified': { $type: 'date' }
      }
    }
    // update user
    await db.updateOne('toolbox', 'users', query, updates)
  } catch (e) {
    throw e
  }
}
