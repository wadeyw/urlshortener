export function isValidUrl(url){
  console.log("Validing URL");
  var regStr=/^http(s)?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;
  return regStr.test(url);
}

export function getShortUrl(req,shortCode){
  console.log("get short url");
  return `${req.protocol}://${req.hostname}.${getPort()}/${shortCode}`;
}

function getPort(){
  return process.env.PORT||8000;
}
