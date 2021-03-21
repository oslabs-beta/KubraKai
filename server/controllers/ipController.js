const db = require('../../model/userModel');

const ipController = {};

ipController.newIp = (req,res,next) => {
  console.log("in newIP"); 
  const { ip } = req.body;
  const email = req.session.passport.user;
  const queryStrNewIp = `insert into userIp (_id, email_fk, userIp) values(DEFAULT, $1, $2)`;

  db.query(queryStrNewIp, [email, ip])
    .then (ip => {
      console.log(ip);
      res.locals.ip = ip;
      return next()
    }) 
    .catch(error => {
      console.log(error);
      return next(error); 
    })
};

ipController.getIp = (req,res, next) => {
  const  email  = req.session.passport.user;
  console.log('email in getIP', email);
  const queryStrGetIp = `select * from userIp where email_fk = $1`
  db.query(queryStrGetIp, [email])
    .then(ip => {
      console.log(ip);
      res.locals.ip = ip;
      return next()
    })
    .catch(error => {
      return next(error);
    })
}

module.exports = ipController;