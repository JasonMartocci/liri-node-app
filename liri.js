// Makes connection to the keys file
var apiKeys = require("./keys.js");

var twitterKeys = apiKeys.twitterKeys;

var Twitter = require('twitter');

// this function logs strings both to the console and to log.txt
function conAndFileLog(str) {
	console.log(str);
	// fs.appendFile("log.txt", str + "\n");
}

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];


// Based on the selections we run the appropriate if statement
if (selections == "my-tweets"){
	myTweets();
	function myTweets() {

	var client = twitterKeys;

	// define the parameters of our call
	var params = {screen_name: 'jasonmartocci'};

	// send out the call to the Twitter API
	client.get('statuses/user_timeline', params, function(error, timeline, response) {
		
		// if no errors... 
		if (!error) {
			for (tweet in timeline) {
				if (tweet < 10) { 
					// get the date of the tweet
					var tweetDate = new Date(timeline[tweet].created_at);

					// log out the date and text of our latest tweets.
					conAndFileLog("Tweet #" + (parseInt(tweet) + 1) + " // Date: " + tweetDate.toString().slice(0, 24)); // keep only important date info
					conAndFileLog(timeline[tweet].text);
				}
				else {
					return true;
				}
			}
		}
		// If there was an error, though
		else {
			// log it to the console.
			conAndFileLog(error);
		}
	});
}
} else if (selections == "spotify-this-song"){
	console.log("Spotify");
} else if (selections == "movie-this"){
	console.log("OMDB");
} else if (selections == "do-what-it-says"){
	console.log("Do what it says.");
} 