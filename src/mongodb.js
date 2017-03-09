import mongoose from 'mongoose';

var urlMapSchema=mongoose.Schema({
	original: String,
	shortCode: {type:Number, index: true}
});
urlMapSchema.index({shortCode:1});  //add index on shortCode
urlMapSchema.set('autoIndex',false);  //disable index as it may cause significant performance issue

var UrlMap=mongoose.model('urlMap',urlMapSchema);

function getMaxShortCode(){
	return UrlMap
		.find()
		.sort({shortCode:-1})
		.limit(1)
		.select({_id:0,shortCode:1})
		.then(doc=>{return doc.length==1?doc[0].shortCode+1:0});
}

export function isExistUrl(url){
	return UrlMap.findOne({original:url})
		.then(doc=>{return doc?doc.shortCode:false;});
}

export function insertNew(url){
	return getMaxShortCode().then(shortcode=>{
		let newUrl=new UrlMap({original:url,shortCode:shortcode});
		return newUrl.save();
	});
}