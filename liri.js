// Makes connection to the keys file
var apiKeys = require("./keys.js");

var twitterKeys = apiKeys.twitterKeys;

var Twitter = require('twitter');
var Spotify = require('spotify');

// this function logs to the console
function consoleFileLog(str) {
	console.log(str);
}

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];
var argumentOne = process.argv[3];
var argumentTwo = process.argv[4];


// Based on the selections we run the appropriate if statement
if (selections == "my-tweets"){
	myTweets();
} else if (selections == "spotify-this-song"){
	mySpotify();
} else if (selections == "movie-this"){
	console.log("OMDB");
} else if (selections == "do-what-it-says"){
	console.log("Do what it says.");
}

// Twitter function 
function myTweets() {
	var client = twitterKeys;
	var params = {screen_name: 'jasonmartocci'};

	// send out the call to the Twitter API
	client.get('statuses/user_timeline', params, function(error, timeline, response) {
		
		if (!error) {
			for (tweet in timeline) {
				if (tweet < 9) { 
					// get the date of the tweet
					var tweetDate = new Date(timeline[tweet].created_at);

					// log out the date and text of our latest tweets.
					consoleFileLog("Tweet #" + (parseInt(tweet) + 1) + " // Date: " + tweetDate.toString().slice(0, 24)); 
					consoleFileLog(timeline[tweet].text);
				}
				else {
					return true;
				}
			}
		}
		else {
			consoleFileLog(error);
		}
	});
}

// Spotify function
function mySpotify() {
	console.log("Spotify");
};