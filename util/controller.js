const signup = require('../model/signup');


async function insertEmployee(username, email, password) {
 
    await signup.create({username, email, password});
   
}


async function getPassword(username) {
 
    const password = await signup.findOne({ where: { username } });
      
     return password;
}     

module.exports = { insertEmployee, getPassword };