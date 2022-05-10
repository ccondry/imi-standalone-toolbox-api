const package = require('../../package.json')
const os = require('os')
const fetch = require('./fetch')
const globals = require('./globals')
// find env hostname
const hostname = os.hostname()

// trim message to 7439 bytes for Webex to accept it
function trimMessage (message) {
  // does message exceed max text size for Webex?
  if (Buffer.byteLength(message, 'utf8') > 7439) {
    // make a buffer of the message
    const buf1 = Buffer.from(message, 'utf8')
    // allocate max size buffer
    const buf2 = Buffer.allocUnsafe(7439)
    // copy to the max size buffer
    buf1.copy(buf2, 0, 0, 7439)
    // set message value to truncated message
    message = buf1.toString('utf8')
  }
  return message
}

// main log method
async function log () {
  // console.log('teamslogger', Object.keys(arguments).length)
  let text = ''
  let markdown = ''
  let mentions = []

  if (Object.keys(arguments).length === 0) {
    // no arguments
    return
  }
  // has arguments
  for (const args of arguments) {
    // console.log('args', args)
    if (typeof args === 'string') {
      // user passed a string
      text += trimMessage(args) + ' '
    } else if (typeof args === 'object') {
      // user passed an object
      // save trimmed text
      text += trimMessage(args.text || '')  + ' '
      // trim markdown, if exists
      if (args.markdown) {
        markdown += trimMessage(args.markdown) + ' '
      }
      // any mentions?
      if (args.mention) {
        // make sure mentions is an array
        if (typeof args.mention === 'string' && args.mention.length) {
          // use mention string as the email and name
          mentions = [{email: args.mention, name: args.mention}]
        } else if (typeof args.mention === 'object') {
          // use mention object as single element in an array
          mentions = [args.mention]
        } else if (Array.isArray(args.mention)) {
          // copy mention arg array
          mentions = args.mention
        }

        // map mentions to array of webex markdown strings
        mentions = mentions.map(m => `<@personEmail:${m.email}|${m.name}>`)
      }
    }
  }
  // trim again
  text = trimMessage(text)
  markdown = trimMessage(markdown)

  if (!text && !markdown) {
    // empty or no log message, so do nothing
    console.log('empty log message passed to Teams Logger. noop.')
    return
  }

  if (!markdown) {
    // if no markdown set yet, add text as markdown
    markdown = text
  }

  // define text prefix for this service
  // const packageName = process.env.npm_package_name
  const packageName = package.name
  // const packageVersion = process.env.npm_package_version
  const packageVersion = package.version
  const textPrefix = `${packageName} ${packageVersion} on ${hostname}: `
  const markdownPrefix = `**${packageName} ${packageVersion}** on **${hostname}**: `
  // add prefix to plaintext
  text = textPrefix + text
  
  // any mentions?
  if (mentions.length) {
    // add prefix and mentions to markdown
    const allMentions = mentions.join(' ') + ' '
    markdown = `${markdownPrefix}${allMentions}${markdown}`
  } else {
    // add prefix to markdown
    markdown = `${markdownPrefix}${markdown}`
  }
  
  // get log token and room ID from globals
  const token = await globals.getAsync('toolbotToken')
  let roomId
  if (process.env.NODE_ENV === 'production') {
    roomId = await globals.getAsync('productionLogRoomId')
  } else {
    roomId = await globals.getAsync('developmentLogRoomId')
  }
  
  // send message to room
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: {
        roomId,
        text,
        markdown
      }
    }
    // console.log('options', options)
    await fetch('https://webexapis.com/v1/messages', options)
  } catch (e) {
    console.log('failed to log to Webex Teams room:', e.message)
  }
}

// define all levels as the same function for now
module.exports = {
  log,
  error: log,
  info: log,
  debug: log,
  warning: log
}
