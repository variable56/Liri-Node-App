//create variables for all
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var artist = process.argv[3];
var fs = require("fs");

//functions for each command
function concertThis() {
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
    });
}

function spotifyThis() {
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

function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            console.log("The movie's Title is: " + response.data.Title);
            console.log("The year the movie came out is: " + response.data.Year);
            console.log("The IMDB Rating is: " + response.data.imdbRating);
            console.log("The Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
            console.log("The Country the movie was produced: " + response.data.Country);
            console.log("The movie's Language is: " + response.data.Language);
            console.log("The Plot of the movie is: " + response.data.Plot);
            console.log("The Actors/Actresses in the movie are: " + response.data.Actors);
            console.log("------------------------------------ \n");
        


    if (response.data.Response === false) {
        axios.get("http://www.omdbapi.com/?t=mr.+nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("The movie's Title is: " + response.data.Title);
                console.log("The year the movie came out is: " + response.data.Year);
                console.log("The IMDB Rating is: " + response.data.imdbRating);
                console.log("The Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
                console.log("The Country the movie was produced: " + response.data.Country);
                console.log("The movie's Language is: " + response.data.Language);
                console.log("The Plot of the movie is: " + response.data.Plot);
                console.log("The Actors/Actresses in the movie are: " + response.data.Actors);
                console.log("------------------------------------ \n");
            }

        )
    }
})
}

function doWhat() {

    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            console.log(err)
        }

        else {

            var dataArray = data.split(",");
            command = dataArray[0];
            artist = dataArray[1];

            switch (command) {
                case "concert-this": concertThis();
                    break;
                case "spotify-this-song": spotifyThis();
                    break;
                case "movie-this": movieThis();
                    break;
                case "Do what it says": doWhat();

            }
        }
    });

}
// Switch statement to handle all of the commands the user may input
switch (command) {
    case "concert-this": concertThis();
        break;
    case "spotify-this-song": spotifyThis();
        break;
    case "movie-this": movieThis();
        break;
    case "Do what it says": doWhat();

}

