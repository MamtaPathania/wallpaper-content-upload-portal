var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cron =require('node-cron')
const cors = require('cors');


var loginRouter = require("./routes/loginRouter/loginRouter.router.js");
var getUploadedImages=require("./routes/getUploadedImages/getUploadedImages.router.js")

var UploadRouter = require("./routes/Upload/upload.router.js")
var UpdateRouter = require("./routes/Update/Update.router.js")
var DeleteRouter = require("./routes/Delete/delete.router.js")
var pushNotificationRouter=require("./routes/pushNotification/pushNotification.router.js");
// const { sendDailyNotifications } = require("./routes/pushNotification/pushNotification.services.js");
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// CORS and other configurations
const corsOptions = {
  origin: [

'exp://192.168.1.16:8081',
'http://localhost:3000',
'exp://192.168.1.20:4080'
],
  optionsSuccessStatus: 200
};
app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));


app.use(express.static(path.join(__dirname, 'build')));


app.use("/",loginRouter );
app.use("/getupload-img",getUploadedImages)

app.use("/app",UploadRouter)
app.use("/app",UpdateRouter)
app.use("/app",DeleteRouter)
app.use("/notification",pushNotificationRouter)


// cron.schedule('0 8 * * *',()=>{
// console.log("Sending Daily Notifications")
// sendDailyNotifications()
// .then(() => console.log('Daily notifications sent successfully'))
// .catch(err => console.error('Error sending daily notifications:', err));
//   })


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
