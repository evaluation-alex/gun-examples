console.log(
  "If module not found, install express globally `npm i express -g`!"
);
var port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  3000;
var express = require("express");
var Gun = require("gun");
require("gun/axe");

var app = express();
app.use(Gun.serve);
app.use(express.static(__dirname));

var server = app.listen(port);
var gun = Gun({ file: "/tmp/data", web: server });

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log("Server started on port " + port + " with /gun");
