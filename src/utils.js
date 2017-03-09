export function isValidUrl(url){
	var regStr=/^http(?:s)?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;
	return regStr.test(url);
}

export function getShortUrl(req,shortCode){
	return `${req.protocol}://${req.hostname}.${getPort}/${shortCode}`;
}

function getPort(){
	return process.env.PORT||8000;
}
