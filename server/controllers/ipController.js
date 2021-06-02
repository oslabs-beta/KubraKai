const db = require('../../model/userModel');

/* Authors: Anthony Martinez,  Taylor Davis
* Controller to Create a newIp to be saved to user Profile.
*/
const ipController = {};
ipController.newIp = (req,res,next) => {
  console.log("in newIP"); 
  const { ip } = req.body;
  console.log(req.body);
  const email = req.session.passport.user;
  const queryStrNewIp = `insert into userIp (email_fk, userIp) values ($1, $2)`;

  db.query(queryStrNewIp, [email, ip])
    .then (ip => {
      // console.log("ip result", ip);
      res.locals.ip = ip;
      return next()
    }) 
    .catch(error => {
      console.log(error);
      return next(error); 
    })
};

 // Controller to get all Ip's upon rendering of App, and on subsequent changes. 
ipController.getIp = (req,res, next) => {
  const  email  = req.session.passport.user;
  const queryStrGetIp = `select * from userIp where email_fk = $1`;
  db.query(queryStrGetIp, [email])
    .then(ip => {
      res.locals.ip = ip.rows;
      return next();
    })
    .catch(error => {
      return next(error);
    });
};

module.exports = ipController;