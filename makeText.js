/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require('./markov');

let path = process.argv[3];

if (process.argv[2] === "file") {
    markovFile(path);
}
else if (process.argv[2] === "url") {
    markovURL(path);
}
else {
    console.log("Please input 'file' or 'url' for third command line argument")
}

function markovFile(file) {


    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        let markovFromFile = new MarkovMachine(data);
        let markovText = markovFromFile.makeText()
        console.log(markovText);
    })
}

function markovURL(url) {
    axios.get(url)
        .then(function (resp) {
            let markovFromURL = new MarkovMachine(resp.data);
            let markovText = markovFromURL.makeText()
            console.log(markovText);

        })
        .catch(function (err) {
            console.log(err);
            process.exit(1);
        })
}