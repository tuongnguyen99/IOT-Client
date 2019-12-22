module.exports = {
  register: function(req, res, next) {
    var user = req.body;
    var errs = [];
    if (!user.username.trim().length) {
      errs.push('User name is required!');
    }
    if (user.password.trim().length < 8){
      errs.push('Passwords must be at least 8 characters');
    }
    if (!user.password.trim().length) {
      errs.push('Password is required!');
    } else if (user.password !== user.rePassword) {
      errs.push('Password does no match!');
    }
    if (errs.length) {
      res.render('./user/register', {
        errs: errs,
        value: user
      });
      return;
    }
    next();
  },
  requiredLogin: function(req, res, next) {
    if (!req.signedCookies.user_id) {
      res.redirect('/user/login');
      return;
    }
    next();
  }

}
