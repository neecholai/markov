// Tests for markov

const { MarkovMachine } = require('./markov');

describe("Test markov machine ", function () {
    let mm;

    beforeEach(function () {
        mm = new MarkovMachine("the cat in the hat");
    });

    test("Output type is a string", function () {
        expect(mm.makeText(10)).toEqual(expect.any(String));
    });

    test("Length does not exceed limit", function () {
        expect((mm.makeText(1).split(' ')).length).toEqual(1);
    });

    test("One word in constructor will always output markov string of word.", function () {
        let mm2 = new MarkovMachine("one");
        expect(mm2.makeText(10)).toEqual("one");
    });

    test("Input nothing should return nothing", function () {
        let mm3 = new MarkovMachine("");
        expect(mm3.makeText(10)).toEqual(null);
    });



})