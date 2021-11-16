const express = require('express')
const router = express.Router()
// get/set provision info in our database
const provisionDb = require('../models/provision-db')
// get/create provision on WXM
const imi = require('../models/imi')
const teamsLogger = require('../models/teams-logger')

// start user provision for IM Standalone demo
router.post('/', async function (req, res, next) {
  try {
    // provision in IMI
    imi.create(req.user.email)
    .then(response => {
      teamsLogger.log(`successfully provision user ${req.user.email} for IMI Standalone`)
      // mark provision complete in mongo
      provisionDb.set(req.user.id, 'complete')
    })
    .catch(error => {
      // mark provision error in mongo
      teamsLogger.error(`failed to provision user ${req.user.email} for IMI Standalone: ${error}`)
      provisionDb.set(req.user.id, 'error')
    })

    // mark provision started in mongo
    provisionDb.set(req.user.id, 'started')
    teamsLogger.debug(`started provisioning user ${req.user.email} for IMI Standalone...`)
      
    // provision requeste complete
    // return 200 OK
    return res.status(200).send()
  } catch (e) {
    // error
    const message = `failed to provision user ${req.user.username} ${req.user.id}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

module.exports = router
