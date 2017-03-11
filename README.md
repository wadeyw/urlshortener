<b>FreeCodeCampe URL Shortener Microservice</b><br>

User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.<br>
User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.<br>
User Story: When I visit that shortened URL, it will redirect me to my original link.<br>

Example Usage1:
  https://fccurlshortener.herokuapp.com/new/http://www.google.com

Example Output1:
  {original_url:url,short_url:https://fccurlshortener.herokuapp.com/1}
  
Example Usage2:
  https://fccurlshortener.herokuapp.com/1

Example Output2:
  Will open www.google.com
  
Example Usage3:
  https://fccurlshortener.herokuapp.com/google.com

Example Output3:
  {error: Invalid URL format. URL must comply to the following: http(s)://(www.)domain.ext(/*)}
  

Reference:<br>
https://www.gorkahernandez.com/blog/create-url-shortener-node-js-mongodb/
