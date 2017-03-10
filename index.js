//npm install --save babel-core babel-register babel-preset-es2015 express mongoose
'use strict'
require('babel-register');

var apps=require('./src/app').app;
var  PORT=process.env.PORT||8000;  
apps.listen(PORT,function(){
  console.log('PORT:',PORT);
});
