/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovObj = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Create markov chains by looping through words in the text and 
    // creating keys for each word in the text, with their values as
    // a list of words that immediately follow the key.
    let markovObj = {};
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      markovObj[currentWord] ?
        markovObj[currentWord].push(nextWord) :
        markovObj[currentWord] = [nextWord]
    }
    return markovObj;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let keys = Object.keys(this.markovObj)

    // Test if string is empty
    if (keys.length === 0) {
      return null;
    }

    // Initialize first word of markov string.
    let randomWordIdx = Math.floor(Math.random() * keys.length)
    let currentWord = keys[randomWordIdx];
    let markovString = currentWord;
    let wordCount = 1;

    // Loop through markov object and find random next word in value's list for current word key.
    // Add that random word to the markov string and find next word until we reach maximum number
    // of words or until next word is null.
    while (wordCount < numWords) {
      randomWordIdx = Math.floor(Math.random() * this.markovObj[currentWord].length)
      currentWord = this.markovObj[currentWord][randomWordIdx];
      if (currentWord === null) break;
      markovString = markovString + " " + currentWord;
      wordCount++;
    }

    return markovString;
  }
}

let mm = new MarkovMachine("the cat in the hat");

module.exports = { MarkovMachine };

