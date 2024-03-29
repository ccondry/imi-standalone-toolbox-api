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
  // console.log('starting collections demo with this data:', options.body)
  return fetch(url, options)
}

// send SMS to user for the Collections v2 demo
function startCollectionsV2Demo ({
  // customer SMS number
  customerNumber,
  customerEmail = 'null',
  customerName = '',
  customerSalutation = '',
  debtAmount = '200',
  currency = 'USD',
  reminderRequiredStatus = 'Y',
  channel = 'sms',
  customerReferenceNumber = '0012E00002AHLDEQA5',
  country = 'US'
}) {
  // validate input
  const countries = ['US', 'UK', 'SNG']
  const channels = ['whatsapp', 'sms', 'rcs']
  if (!countries.includes(country)) {
    throw Error(`The value for 'country' must be one of these values: ${countries.join(', ')}`)
  }
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.join(', ')}`)
  }

  const url = 'https://hooks-us.imiconnect.io/events/31JTUI09O3'

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
  // console.log('starting collections demo with this data:', options.body)
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
  const countries = ['US', 'UK', 'SNG']
  const channels = ['whatsapp', 'sms']
  if (!countries.includes(country)) {
    throw Error(`The value for 'country' must be one of these values: ${countries.join(', ')}`)
  }
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.join(', ')}`)
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

// send SMS/whatsapp/apple chat/google chat to user for the Appointment demo in v2
function startAppointmentV2Demo ({
  // customer name
  name,
  // customer SMS number
  number,
  country = 'US',
  channel = 'sms'
}) {
  // validate input
  const countries = ['US', 'UK', 'SNG']
  const channels = ['whatsapp', 'sms', 'amb', 'rcs']
  if (!countries.includes(country)) {
    throw Error(`The value for 'country' must be one of these values: ${countries.join(', ')}`)
  }
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.join(', ')}`)
  }

  const url = 'https://hooks-us.imiconnect.io/events/4OQB0NNGSG'

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

// send RCS chat to user for the Retail Journey demo in v2
function startRetailJourneyV2Demo ({
  // customer name
  name,
  // customer SMS number
  number,
  channel = 'rcs',
  country = 'US'
}) {
  // validate input
  // validate input
  const countries = ['US', 'UK', 'SNG']
  const channels = ['rcs']
  if (!countries.includes(country)) {
    throw Error(`The value for 'country' must be one of these values: ${countries.join(', ')}`)
  }
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.join(', ')}`)
  }

  const url = 'https://hooks-us.imiconnect.io/events/1TGEYVH0YG'

  const options = {
    method: 'POST',
    body: {
      customerName: name,
      mobileNumber: number,
      country,
      channel
    }
  }

  // send REST request
  return fetch(url, options)
}

// send SMS or RCS chat to user for the Product Activation demo in v3
function startProductActivationV3Demo ({
  // customer name
  name,
  // customer SMS number
  number,
  // default channel SMS
  channel = 'sms'
  // default country US
  // country = 'US'
}) {
  // validate input
  // const countries = ['US', 'UK', 'SNG']
  const channels = ['rcs']
  if (!channels.includes(channel)) {
    throw Error(`The value for 'channel' must be one of these values: ${channels.join(', ')}`)
  }
  // if (channel === 'sms' && !countries.includes(country)) {
  //   throw Error(`The value for 'country' must be one of these values: ${countries.join(', ')}`)
  // }

  const url = 'https://hooks-us.imiconnect.io/events/K9ZOFZMSN0'

  const options = {
    method: 'POST',
    body: {
      customerName: name,
      mobileNumber: number,
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
  startCollectionsV2Demo,
  startAppointmentDemo,
  startAppointmentV2Demo,
  startRetailJourneyV2Demo,
  startProductActivationV3Demo
}