const db = require('../../model/userModel');

const ipController = {};

ipController.newIp = (req,res,next) => {
  const { email, ip } = req.body;
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
  const { email } = req.body;
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