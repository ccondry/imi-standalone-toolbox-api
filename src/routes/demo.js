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

// start collections v2 demo
router.post('/collections/v2', async function (req, res, next) {
  try {
    await imi.startCollectionsV2Demo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the collections v2 demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start appointment demo
router.post('/appointment', async function (req, res, next) {
  try {
    await imi.startAppointmentDemo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the appointment demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start appointment v2 demo
router.post('/appointment/v2', async function (req, res, next) {
  try {
    await imi.startAppointmentV2Demo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the appointment v2 demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start retail journey v2 demo
router.post('/retail-journey/v2', async function (req, res, next) {
  try {
    await imi.startRetailJourneyV2Demo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the retail journey v2 demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

// start product activation v3 demo
router.post('/product/v3', async function (req, res, next) {
  try {
    await imi.startProductActivationV3Demo(req.body)
    // return 200 OK
    return res.status(200).send({})
  } catch (e) {
    // error
    const message = `failed to send SMS to start the product activation v3 demo for ${req.user.email}: ${e.message}`
    console.log(message)
    teamsLogger.log(message)
    // return 500 SERVER ERROR
    return res.status(500).send({message})
  }
})

module.exports = router
