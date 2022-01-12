const express = require('express')
const router = express.Router()
const imi = require('../models/imi')
const teamsLogger = require('../models/teams-logger')

// start collections demo
router.post('/collections', async function (req, res, next) {
  try {
    await imi.startCollectionsDemo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the collections demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start appointments demo
router.post('/appointments', async function (req, res, next) {
  try {
    await imi.startAppointmentsDemo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the appointments demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

module.exports = router
