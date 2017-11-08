const request = require('request');
const cheerio = require('cheerio');

/*
isItRainingInCalifornia Version 0.2

Made in a day, this program will let you check to see if its raining in cities in california.
This could easily be changed as is just checks zipcodes. If you want to add a zipcode you will
also have to make sure the weather.com url is still correct, it changes based on location.
This program could easily be greatly improved if I ever decided to put the effort in to fixing
it, However I think I have better things to do.


To Run:
1. Download file to a directory.
2. Navigate to the directory using bash, git, or whatever.
3. Make sure you install node(its easy), npm install request and cheerio.
4. Type node isItRainingInCalifornia, and it should run.
*/

var zipcodes = ["94582", "94583", "94506", "94568", "94588", "94566", "94507", "95060"];

var isRaining = false;

zipcodes.forEach(function(entry, idx, array) {
  function isItRaining(){
    if(isRaining){
      console.log("it is raining somewhere in CA");
    }else{
      console.log("it is not raining anywhere in CA");
    }
  }

  function visitPage(url, lastOne) {
    //console.log("Visiting page " + url);
    request(url, function(error, response, body) {
      //Check status code (200 is HTTP OK)
      //console.log("Status code: " + response.statusCode);
      if(response.statusCode !== 200) {
        console.log(response.statusCode);
        return;
      }
      // Parse the document body for the div that displays the weather in text
      var $ = cheerio.load(body);
      $('div.section-page-name').each(function( index ) {
        var weather = $(this).find('div.today_nowcard-phrase').text().trim();
        if(weather === "Rain Shower" || weather === "Partial Shower"){
          isRaining = true;
        }else{
        }
        if(lastOne != null){
          console.log("not null");
          isItRaining();
        }
      });
    });
  }

  var url = "https://weather.com/weather/today/l/" + entry + ":4:US";
  //if this is the last zipcode in the list of zipcodes we want to call isItRaining.
  //This would be unnessasary if I took the time to fix the async v sync calls.
  if(idx === array.length - 1){
    var one = 1;
    visitPage(url, one);
  }else{
    visitPage(url);
  }

});