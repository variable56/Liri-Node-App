# Liri-Node-App


# Purpose

This is an app that works similar to "Siri" on ios devices.  It is a bash based program running in node and will do several functions as follows:

"Spotify-this" - Returns information about a song that the user inputs.  please use quotes around the value that you are searching for

"Movie-this" - returns information about a movie that the user inputs.  Including title, rating, year released & others.

"Concert-this" - Displays information about artists that may be on tour

"Do what it says" - reads an external file called 'random.txt' and will run a command and an input that is defined in the file

# Video Demonstration

https://drive.google.com/file/d/1NIZN38vSRpRP-QHdgEnxbRTKKUQgj_K_/view

# Dependencies

This program utilizes several npm packages to work within node.

    "axios"
    "dotenv"
    "moment"
    "node-spotify-api"
    
To install the packages above run the following code to initialize the program before running.

  ```
  npm install
  ```

This program will require a .env file that will have the following contents

```
node_modules
.DS_Store
.env
```

it will also require a "keys.js" that stores the spotify key and spotify secret that will be referenced in the liri.js. Add the keys.js to the .gitignore file if you plan to upload any of your code to the internet.

```
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
