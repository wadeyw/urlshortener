
var mongoose=require('mongoose');
console.log("Mongoose");
var urlMapSchema=mongoose.Schema({
  original: String,
  shortCode: {type:Number, index: true}
});
urlMapSchema.index({shortCode:1});  //add index on shortCode
urlMapSchema.set('autoIndex',false);  //disable index as it may cause significant performance issue

export var UrlMap=mongoose.model('urlMap',urlMapSchema);

function getMaxShortCode(){
  return UrlMap
    .find()
    .sort({shortCode:-1})
    .limit(1)
    .select({_id:0,shortCode:1})
    .then(doc=>{return doc.length==1?doc[0].shortCode+1:1});
}

export function isExistUrl(url){
  console.log(url+"/URL Existiance check");
  return UrlMap
    .findOne({original:url})
    .select({_id:0,shortCode:1})
    .then(doc=>{console.log("existing URL:"+doc); return doc?doc.shortCode:0});
 // return UrlMap
   // .find({original:url})
    //.then(doc=> doc.length?doc[0].shortCode:false);
}

export function insertUrl(url){
  console.log("Insert new URL");
  return getMaxShortCode().then(shortcode=>{
    let newUrl=new UrlMap({original:url,shortCode:shortcode});
    return newUrl.save();
  });
}
