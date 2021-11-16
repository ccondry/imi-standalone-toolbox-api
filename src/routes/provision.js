const express = require('express')
const router = express.Router()
// get/set provision info in our database
const provisionDb = require('../models/provision-db')
// get/create provision on WXM
const imi = require('../models/imi')
const teamsLogger = require('../models/teams-logger')

// get provision status for current logged-in user from our database
router.get('/', async function (req, res, next) {
  try {
    // check mongo to see if user is provisioned or not
    const isProvisioned = await provisionDb.isProvisioned(req.user.id)
    return res.status(200).send({isProvisioned})
  } catch (e) {
    // error
    const message = `failed to get provision status for user ${req.user.username} ${req.user.id}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start user provision for IM Standalone demo
router.post('/', async function (req, res, next) {
  try {
    // provision in IMI
    await imi.create(req.user.email)
    // mark provisioned in mongo
    await provisionDb.set(req.user.id)
    // provision complete
    // return 200 OK with message
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
