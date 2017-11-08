# web-crawlers-and-scrapers

This is where I will put a bunch of web crawlers and web scrapers that I have made or am making for fun. They wil do various things and I will organize the repository as neccessary when it becomes to cluttered.

# Current crawlers and scrapers:

# Reddit-Submissions-to-list Version 0.1

Made in a day, this program will let you download the images of a reddit users top 25 post history
as long as the images are hosted on imgur.

Input: reddit users name.

Output: A txt file of the reddit users, there top 25 post titles, as well as their scores
        The images within those posts will be downloaded to this files location.

Known Bugs: if the reddit users name has _ in it, the program wont work properly. This has something to do
      with cheerio or request.
      Wont work with some older imgur posts depending on how imgur puts the image on the html page

# isItRainingInCalifornia Version 0.2

Made in a day, this program will let you know if its raining in different cities in california
by checking weather.com. It could easily be greatly improved if I had the motivation. For more details check the comments in the file.

To Run:
1. Download file to a directory.
2. Navigate to the directory using bash, git, or whatever.
3. Make sure you install node(its easy), npm install request and cheerio.
4. Type node isItRainingInCalifornia, and it should run.
