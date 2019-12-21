require('dotenv').config();
const axios = require('axios');
const apiHost = process.env.API_HOST

module.exports = {
  postRegister: function(req, res, next) {
    var url = apiHost + '/user';
    var data = req.body;
    var user = {
      username: data.username,
      password: data.password
    };
    axios.post(url, user)
    .then(function(response){
      res.render('./user/login', {
        messages: ['Sign Up Success']
      });
    }).catch(function(error) {
      res.render('./user/register', {
        errs: error.message 
      });
    });
  },
  getRegister: function(req, res, next){
    res.render('./user/register');
  },
  getLogin: function(req, res, next){
    res.render('./user/login');
  },
  postLogin: function(req, res, next) {
    var url = apiHost + '/user/login';
    var user = req.body;
    axios.post(url, user)
    .then(function(response){
      if(response.data.length){
        res.cookie('user_id', response.data[0]._id, {signed: true});
        res.redirect('/note')
        return;
      }
      res.render('./user/login', {
        errs: ['Invalid username or password'],
        value: user
      })
    })
    .catch(function(err){
      res.render('./user/login', {
        errs: [err.message],
        value: user
      })
    });
  },
  getLogout: function(req, res, next){
    res.clearCookie('user_id');
    res.redirect('/');
  }
};
