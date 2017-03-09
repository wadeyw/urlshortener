import express from 'express';
import mongoose from 'mongoose';
import * from './mongodb';
import * from './utils'; 
export const app=express();

/*get short url and redirect to original url*/
app.get('/:shortCode',function(req,res){
	let shortCode=parseInt(req.params.shortCode);
	if(isNaN(shortCode)){
		res.status(500).json({error:"Invalid shortCode, it must be an Integer"});
	} else {
		UrlMap.findOne({shortCode}).then(doc=>{
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
	let url=req.params[0];
	if(isValidUrl(url)){
		isExistUrl(url).then(exists=>{
			if(exists)
				res.status(500).json({error: "URL already exist",shortCode:exists});
			else {
				insertUrl(url).then(doc=>{
					res.status(200).json({original_url:url,short_url:getShortUrl(req,doc.shortCode)});
				});
			}
		});
	} else {
		res.status(500).json({error:"Invalid URL format. URL must comply to the following: http(s)://(www.)domain.ext(/*)"});
	}

});
