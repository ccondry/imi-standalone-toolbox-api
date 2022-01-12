const fetch = require('./fetch')

const id = process.env.IMI_WEBHOOK_ID
const key = process.env.IMI_WEBHOOK_KEY
const url = 'https://hooks.imiconnect.io/syncwebhook/' + id

function getOptions (action, email) {
  return {
    method: 'POST',
    headers: {
      key
    },
    body: {
      emailAddress: email,
      action
    }
  }
}

// get IMI standalone user
async function get (email) {
  const options = getOptions('get', email)

  try {
    const response = await fetch(url, options)
    if (response.code === '200') {
      // found user
      return response
    }
    if (response.code === '400') {
      // invalid input
      return response.description
    }
    if (response.code === '404') {
      // user not found
      return null
    }
    if (response.code === '500') {
      // server error
      return response.description
    }
    // othewise error
    throw response
  } catch (e) {
    throw e
  }
}

// create IMI standalone user
async function create (email) {
  const options = getOptions('create', email)

  try {
    const response = await fetch(url, options)
    console.log('imi standalone provision response:', response)
    if (response.code === '400' && response.userStatus === 'Invited') {
      // user already invited
      return response
    }
    if (['200', '201'].includes(response.code)) {
      // created user
      return response
    } else {
      throw Error(response.description)
    }
  } catch (e) {
    throw e
  }
}

// delete IMI standalone user
async function remove (email) {
  const options = {
    method: 'POST',
    headers: {
      key
    },
    body: {
      emailAddress: email,
      action: 'delete'
    }
  }

  try {
    const response = await fetch(url, options)
    return response
  } catch (e) {
    throw e
  }
}

// send SMS to user for the Collections demo
function startCollectionsDemo ({
  // customer SMS number
  customerNumber,
  customerEmail = 'null',
  customerName = '',
  customerSalutation = '',
  debtAmount = '200',
  currency = '$',
  reminderRequiredStatus = 'Y',
  channel = 'sms',
  customerReferenceNumber = '0012E00002AHLDEQA5',
  country = 'US'
}) {
  const url = 'https://hooks-us.imiconnect.io/events/OWPASN4AZS'

  const options = {
    method: 'POST',
    body: {
      customerNumber,
      customerEmail,
      customerName,
      customerSalutation,
      debtAmount,
      currency,
      reminderRequiredStatus,
      channel,
      customerReferenceNumber,
      country
    }
  }
  console.log('starting collections demo with this data:', options.body)
  return fetch(url, options)
}

// send SMS to user for the Appointment demo
function startAppointmentDemo ({
  // customer name
  name,
  // customer SMS number
  number,
  country = 'US',
  channel = 'sms'
}) {
  // validate input
  const countries = ['US', 'UK']
  const channels = ['whatsapp', 'sms']
  if (!countries.includes(country)) {
    throw Error(`The value for 'country' must be one of these values: ${countries.split(', ')}`)
  }
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.split(', ')}`)
  }

  const url = 'https://hooks-us.imiconnect.io/events/N9WMPI85GE'

  const options = {
    method: 'POST',
    body: {
      name,
      number,
      country,
      channel
    }
  }

  // send REST request
  return fetch(url, options)
}

module.exports = {
  get,
  create,
  remove,
  startCollectionsDemo,
  startAppointmentDemo
}