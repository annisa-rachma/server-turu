const bcrypt = require('bcryptjs');

function hashPassword(password) {
   const hash = bcrypt.hashSync(password)
   return hash
}

function comparePassword(password, hashPassword) {
    const compare = bcrypt.compareSync(password, hashPassword)
    return compare
}

module.exports = {
    hashPassword,
    comparePassword
}
