//import express from 'express';
//import mongoose from 'mongoose';
//import {UrlMap,isExistUrl,insertNew} from './mongodb';
//imt {isValidUrl,getShortUrl} from './utils'; 
require('babel-register');
var express=require('express');
var mongoose=require('mongoose');
var mongodb=require('./mongodb');
var utils=require('./utils');
var path=require('path');

mongoose.Promise=global.Promise;
export var app=express();

mongoose.connect("mongodb://fccuser:fccuser@ds117830.mlab.com:17830/freeccexecrise");
//mongoose.connect('mongodb://localhost:27017/urlShortener');
console.log("app get"+mongoose);
//direct to home page
app.get('/', function(req, res, next) {  res.sendFile(path.join(__dirname, '/index.html'))});


/*get short url and redirect to original url*/
app.get('/:shortCode',function(req,res){
  console.log("app get shortcode");
  var shortCode=parseInt(req.params.shortCode);
  if(isNaN(shortCode)){
    res.status(500).json({error:"Invalid shortCode, it must be an Integer"});
  } else {
    mongodb.UrlMap
      .findOne({shortCode})
      .then(doc=>{
        if(!doc)
          res.status(404).json({error:"Page not found"});
        else {
          res.redirect(doc.original);   //jump to the original url
        }
    });
  }
});

/*process original url, 
if its not exist in DB, create a new shortcode.
if already exist in DB, then print out shortcode*/
app.get('/new/*',(req,res)=>{
  console.log("app get url");
  var url=req.params[0];
  if(utils.isValidUrl(url)){
    mongodb.isExistUrl(url).then(exists=>{
	console.log("URL Existing status:"+exists);
      if(exists)
        res.status(500).json({error: "URL already exist",shortCode:exists});
      else {
        mongodb.insertUrl(url).then(doc=>{
          res.status(200).json({original_url:url,short_url:utils.getShortUrl(req,doc.shortCode)});
        });
      }
    });
  } else {
    res.status(500).json({error:"Invalid URL format. URL must comply to the following: http(s)://(www.)domain.ext(/*)"});
  }

});
