// Makes connection to the keys file
var apiKeys = require("./keys.js");

// Run functions in the keys file
// apiKeys.world();

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];

// Based on the selections we run the appropriate if statement
if (selections == "my-tweets"){
	console.log("Twitter");
} else if (selections == "spotify-this-song"){
	console.log("Spotify");
} else if (selections == "movie-this"){
	console.log("OMDB");
} else if (selections == "do-what-it-says"){
	console.log("Do what it says.");
} 