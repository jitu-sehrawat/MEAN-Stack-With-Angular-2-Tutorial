const User = require('../models/user');


module.exports = (router) => {

  router.post('/register', (req, res) => {
    req.body.email;
    req.body.username;
    req.body.password;

    if (!req.body.email) {
      res.send({ success: false, message: 'You must Provide E-mail' });
    } else {
      if (!req.body.username) {
        res.send({ success: false, message: 'You must Provide username' });
      } else {
        if (!req.body.password) {
          res.send({ success: false, message: 'You must Provide password' });
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });

          user.save((err) => {
            if (err) {
              if (err.code === 11000) {
                res.send({ success: false, message: 'username or email already exists' });
              } else {
                if (err.errors) {
                  if (err.errors.email) {
                    res.send({ success: false, message: err.errors.email.message });
                  } else {
                    if (err.errors.username) {
                      res.send({ success: false, message: err.errors.username.message });
                    } else {
                      if (err.errors.password) {
                        res.send({ success: false, message: err.errors.password.message });
                      } else {
                        res.send({ success: false, message: err });
                      }
                    }
                  }
                } else {
                  res.send({ success: false, message: 'Could not save user. Error: ', err });
                }
              }
            } else {
              res.send({ success: true, message: 'Account Registered!!' });
            }
          });
        }
      }
    }
  });

  return router;
};
