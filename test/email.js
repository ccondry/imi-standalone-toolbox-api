const userEmail = 'ccondry@cisco.com'
const emailParts = userEmail.split('@')
emailParts[0] += '+dcloudimi'
const email = emailParts.join('@')
console.log(email)