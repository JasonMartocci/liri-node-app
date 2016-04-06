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
	mySpotify(argumentOne);
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
function mySpotify(argumentOne){
	if(argumentOne === undefined){
	 	console.log("What's my age again");
	 }

	// send out the call to the Spotify API
	Spotify.search({ type: 'track', query: argumentOne }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    
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
	});
};

// this function logs to the console
function consoleFileLog(str) {
	console.log(str);
}
