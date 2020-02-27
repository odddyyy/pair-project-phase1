const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(`admin1`, saltRounds).then(function(hash) {
    // Store hash in your password DB.
    console.log(hash)
});