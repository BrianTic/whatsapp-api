const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
const http = require('http');
const path = require('path');
const app = express();
const port = (process.env.PORT || 5000);
const router = require('./routes/main.route');

app.set('port', port);
app.set('json spaces', 2)
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
  secret: 'T12ESTE12NFJBASDH45IBGFIGS',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(cookieParser('T12ESTE12NFJBASDH45IBGFIGSS'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/api', router);

http.createServer(app).listen(port);
console.log('Server running on port ' + port);