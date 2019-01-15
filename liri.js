require("dotenv").config();


var keys = require("./keys.js");


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


//create variables for all
var axios = require("axios");

var moment = require("moment");

var command = process.argv[2];

var artist = process.argv[3];

//sets up the bandsintown responses 
if (command === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {

        if (response.data.length > 0) {

            console.log("");
            console.log("");
            console.log("Current tour details for " + artist + ": \n");

            for (i = 0; i < response.data.length; i++) {

                console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log(JSON.stringify(response.data[i].venue.name));
                console.log(JSON.stringify(response.data[i].venue.city) + ", " + response.data[i].venue.region + " " + response.data[i].venue.country + "\n");
                console.log("------------------------------------ \n")

            }
        }
        else (console.log("Sorry, " + artist + " is not on tour."))
    })
}

else if (command === "spotify-this-song") {


    spotify.search({ type: 'track', query: artist }).then(function (response) {
        // console.log(response.tracks.items[0])
        for (i = 0; i < response.tracks.items.length; i++) {
            console.log("Artist Name: " + response.tracks.items[i].album.artists[0].name);
            console.log("Track Name: " + response.tracks.items[i].name);
            console.log("Album Name: " + response.tracks.items[i].album.name);
            console.log("Track Name: " + response.tracks.items[i].preview_url);
            console.log("------------------------------------ \n");

        }
    })
        .catch(function (err) {
            console.log(err);
        })

}

else if (command === "movie-this") {



}
