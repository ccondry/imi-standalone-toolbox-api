const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
// blocked domain names for webex teams usernames
const blockedDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'inbox.com',
  'icloud.com',
  'mail.com',
  'aol.com',
  'zoho.com'
]
// add user to the support room
router.post('/', async (req, res, next) => {
  // validate input
  if (!req.query || !req.query.email || !req.query.email.length) {
    // invalid input
    console.log('failed to add user to the Webex Teams support room: invalid input')
    // return 400
    return res.status(400).send(`"email" is a required query parameter.`)
  }
  // validate email is not from a blocked domain
  try {
    const parts = req.query.email.split('@')
    const domain = parts[1]
    if (blockedDomains.includes(domain)) {
      return res.status(400).send(`Please use a valid company email address, not a personal email account.`)
    }
  } catch (e) {
    // invalid input
    console.log('failed to add user to the Webex Teams support room: failed to parse email address:', e.message)
    // return 400
    return res.status(400).send(`Failed to parse your email address. Please re-enter it and try again.`)
  }

  const email = req.query.email
  try {
    console.log('request to add user to the Webex Teams support room for', email)
    const response = await request({
      url: 'https://api.ciscospark.com/v1/memberships',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.WEBEX_BOT_TOKEN
      },
      body: {
        roomId: process.env.SUPPORT_ROOM_ID,
        personEmail: email,
        isModerator: false
      },
      json: true
    })
    // return 202 ACCEPTED
    return res.status(202).send()
  } catch (e) {
    // failed
    console.error('failed to add user to the Webex Teams support room for', email, ':', e.message)
    // return 500 SERVER ERROR
    return res.status(500).send(e.message)
  }
})

module.exports = router
