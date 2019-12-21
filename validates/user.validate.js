module.exports = {
  register: function(req, res, next){
    var user = req.body;
    console.log(user);
    console.log(req.body);
    var errs = [];
    console.log(user.username.length);
    if(!user.username.length){
      errs.push('User name is required!');
    }
    if(!user.password.length){
      errs.push('Password is required!');

    }else if(user.password !== user.rePassword){
      errs.push('Password does no match!');
    }
    if(errs.length){
      res.render('./user/register', {
        errs: errs,
        value: user
      });
      return;
    }
    next();
  },
  requiredLogin: function(req, res, next){
    if (!req.signedCookies.user_id) {
      res.redirect('/user/login');
      return;
    }
    next();
  }

}
