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

  // Check Email availablity
  router.get('/checkEmail/:email', (req, res) => {
    if(!req.params.email) {
      res.send({success: false, message:'E-mail not provided'});
    } else {
      User.findOne({email: req.params.email}, (err, user) => {
        if(err) {
          res.send({ success:false, message:err})
        } else {
          if(user) {
            res.send({ success:false, message: 'Email is already taken'});
          } else {
            res.send({ success: true, message: 'Email is available'})
          }
        }
      })
    }
  })

  // Check username availablity
  router.get('/checkUsername/:username', (req, res) => {
    if(!req.params.username) {
      res.send({success: false, message:'username not provided'});
    } else {
      User.findOne({username: req.params.username}, (err, user) => {
        if(err) {
          res.send({ success:false, message:err})
        } else {
          if(user) {
            res.send({ success:false, message: 'Username is already taken'});
          } else {
            res.send({ success: true, message: 'Username is available'})
          }
        }
      })
    }
  })

  return router;
};
