// Makes connection to the keys file
var apiKeys = require("./keys.js");

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'FDvRzy6S3u2eGD0Q5ao8L36FQ',
  consumer_secret: '3kDtvZvXS09A6mTS1ypABKAjd7853pAKYcPLLAyyJM9SMFaG6F',
  access_token_key: '2331033409-76NYiYct9DHoC2Kzgc3O5xnEfmraQIfKkFqx7Pr',
  access_token_secret: 'dda5LLQOZ2ZDnDjozcaVPUXWog4ecfIh4t28rv49Z77n5',
});

var params = {screen_name: 'jasonmartocci'};

// Run functions in the keys file
// apiKeys.world();

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];

// Based on the selections we run the appropriate if statement
if (selections == "my-tweets"){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    console.log(tweets);
	  }
	});
} else if (selections == "spotify-this-song"){
	console.log("Spotify");
} else if (selections == "movie-this"){
	console.log("OMDB");
} else if (selections == "do-what-it-says"){
	console.log("Do what it says.");
} 