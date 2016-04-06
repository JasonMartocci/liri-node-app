/* Load the HTTP library */
var http = require("http");

/* Create an HTTP server to handle responses */
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

// Makes connection to the keys file
var apiKeys = require("./keys.js");

var twitterKeys = apiKeys.twitterKeys;

var Spotify = require('spotify');
var request = require('request');

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];
var argumentOne = process.argv[3];

// Based on the selections we run the appropriate if statement
if (selections == "my-tweets"){
	myTweets();
} else if (selections == "spotify-this-song"){
	mySpotify(argumentOne);
} else if (selections == "movie-this"){
	omdb(argumentOne);
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
					console.log("Tweet #" + (parseInt(tweet) + 1) + " // Date: " + tweetDate.toString().slice(0, 24)); 
					console.log(timeline[tweet].text);
				}
				else {
					return true;
				}
			}
		}
		else {
			console.log(error);
		}
	});
}

// Spotify function
function mySpotify(argumentOne){
	if(argumentOne === undefined){
	 	argumentOne = "What's my age again";
	 }

	// send out the call to the Spotify API
	Spotify.search({ type: 'track', query: argumentOne }, function(error, data) {
	    if (!error) {	    
		    var items = data.tracks.items;

		    for (i=0; i<items.length; i++){
			 		for (j=0; j<items[i].artists.length; j++){
			    		console.log("Artist: "+items[i].artists[j].name);
			    	}
		    	console.log("Song Name: "+items[i].name);
		    	console.log("Preview Link of the song from Spotify: "+items[i].preview_url);
		    	console.log("Album Name: "+items[i].album.name);
				console.log("\n");
			}
		}
	});
};

// OMDB function
function omdb(argumentOne){
	 if(argumentOne === undefined){
	 	argumentOne = 'Mr. Nobody';
	 }

	// send out the call to the OMDB API
	 request('http://www.omdbapi.com/?t='+argumentOne+'&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
		if (!error) {
		   var json = JSON.parse(body);

		   console.log("Title: "+json.title);
		   console.log("Year: "+json.Year);
		   console.log("IMDB Rating: "+json.imdbRating);
		   console.log("Country: "+json.Country);
		   console.log("Language: "+json.Language);
		   console.log("Plot: "+json.Plot);
		   console.log("Actors: "+json.Actors);
		   console.log("Rotten Tomatoes rating: "+json.tomatoRating);
		   console.log("Rotten Tomatoes URL: "+json.tomatoURL);
		   console.log("\n");
		}
	})
}