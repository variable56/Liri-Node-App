require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


//create variables for all
var axios = require("axios");

var command = process.argv[2];

var artist = process.argv[3];

//sets up the bandsintown responses 
if (command === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {

        if (response.data.length > 0) {
        
            console.log("Current tour details for " + artist + ":");

        for (i = 0; i < response.data.length; i++) {

            console.log(JSON.stringify(response.data[i].datetime));
            console.log(JSON.stringify(response.data[i].venue.name));
            console.log(JSON.stringify(response.data[i].venue.city) + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
            console.log("------------------------------------ \n")

        }}
        else (console.log("Sorry, " + artist + " is not on tour."))
    })
}