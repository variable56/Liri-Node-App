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

//commands for spotify
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

    axios.get("http://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          // Then we print out the imdbRating
        //   * Title of the movie.
        //   * Year the movie came out.
        //   * IMDB Rating of the movie.
        //   * Rotten Tomatoes Rating of the movie.
        //   * Country where the movie was produced.
        //   * Language of the movie.
        //   * Plot of the movie.
        //   * Actors in the movie.
            // console.log(response.data)
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
    )}