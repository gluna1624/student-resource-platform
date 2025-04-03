const bcrypt = require('bcrypt');
const saltRounds = 10;
const newPassword = 'test123'; // Change this to whatever you want

bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('New hash:', hash);
});