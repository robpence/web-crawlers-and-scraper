const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM(`...`)).window;


/*
Reddit-Submissions-to-list Version 0.1

Made in a day, this program will let you download the images of a reddit users top 25 post history
as long as the images are hosted on imgur.

Input: reddit users name.

Output: A txt file of the reddit users, there top 25 post titles, as well as their scores
        The images within those posts will be downloaded to this files location.

Known Bugs: if the reddit users name has _ in it, the program wont work properly. This has something to do
      with cheerio or request.
      Wont work with some older imgur posts depending on how imgur puts the image on the html page

*/

//Interface to get input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Ask the user to enter a reddit name to get the posts of
rl.question('Enter user name of the reddit user you would like to see the top 25 posts of? ', (answer) => {

  console.log(`The redditor you entered: ${answer}`);
  var redditUserSubsURL = "https://www.reddit.com/user/" + answer + "/submitted/?sort=top";
  fs.appendFileSync('redditSubs.txt', 'Reddit User: ' + answer + '\n');
  fs.appendFileSync('redditSubs.txt', '\n' + 'Submissions:' + '\n');

  //request the users posts from reddit
  request(redditUserSubsURL, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    if(response.statusCode == 200){
      console.log('Success!');
    }

    //Load the html body with cheerio, and keep track of the number of images
    var $ = cheerio.load(body);
    var numberforpost = 0;
    
    //loops through each post in the top 25, gets the score and title, adds it to a txt file
    $('div#siteTable > div.link').each(function( index ) {
      var title = $(this).find('p.title > a.title').text().trim();
      var score = $(this).find('div.score.unvoted').text().trim();
      var imageURL = $(this).find('a.thumbnail').attr('href');
      //console.log(imageURL);
      fs.appendFileSync('redditSubs.txt', score + ' ' + title + '\n');

      var parser = document.createElement('a');
      parser.href = imageURL;

      //console.log(parser.hostname);
      
      //if its imgur, this is how you get the image source and download it
      if(parser.hostname == 'imgur.com'){
        request(imageURL, function(error, response, body) {
          if(response.statusCode !== 200) {
            callback();
            return;
          }
          // Parse the document body
          var $$ = cheerio.load(body);
          numberforpost++;
          var numberforimage = 1;
          //console.log('its imgur');

          //TODO sometimes the imgur image doesn't have this class...
          $$('img.post-image-placeholder').each(function( index ) {
            var imageToDownLoad = 'https:' + $(this).attr('src');
            var imagename = answer + numberforpost + 'Image' + numberforimage;

            console.log(imageToDownLoad);

            download(
              imageToDownLoad, 
              imagename,
              function(){console.log('done');
            });

            numberforimage++;

          });
          
        });

      }
      //TODO Parse other things that aren't imgur, like i.reddit others

    });

  });

  rl.close();
});


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    if(res.headers['content-type'] == 'image/jpeg'){
      var realfilename = filename + '.jpeg';
    }
    if(res.headers['content-type'] == 'image/png'){
      var realfilename = filename + '.png';
    }

    request(uri).pipe(fs.createWriteStream(realfilename)).on('close', callback);
  });
};
