let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
{config} = require('./config/config');
const morgan = require('morgan');
const fs = require('fs');
// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//logger
var accessLog = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var skipLog = function (req, res) { return res.statusCode < 400 };
app.use(morgan('combined',{skip: skipLog,stream: accessLog}));
// Api root
const userRoute = require('./routes/users.routes');
app.use('/api', userRoute);
const imageRoute = require('./routes/image.routes');
app.use('/api', imageRoute);
// Static build location
app.use(express.static(path.join(__dirname, 'dist')));
//static path
app.use('/public',express.static(path.join(__dirname, 'public')));

// Create port
const port = 8080;

// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ', port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
