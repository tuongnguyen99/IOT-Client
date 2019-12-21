require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const noteRoute = require('./routes/note.route');
const userValidate = require('./validates/user.validate');

const port = process.env.PORT;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET_STRING));

app.get('/', (req, res) => {
  res.render('./home/index',{
    loginState: req.signedCookies.user_id
  });
  console.log(req.signedCookies.user_id);
});
app.use('/user', userRoute);
app.use('/note', userValidate.requiredLogin, noteRoute);

app.listen(port, () => {
  console.log('sever listening on port ' + port);
});
