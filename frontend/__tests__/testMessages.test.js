import { stopWords, helpWords, catWords } from '../src/resources/CategoryConst';

function removeStopwords(e) {
    var noNumPuntuation = e.match(/[^_\W]+/g).join(' ');
    let msgArray = noNumPuntuation.split(' ');
    // console.log(msgArray)

    var cleanedMsg = [];

    for (let j = 0; j < msgArray.length; ++j) {
        var match = false;
        // console.log(msgArray[j]);
        for (let i = 0; i < stopWords.length; ++i) {
            // console.log(stopwords[i]);
            let stopW = stopWords[i];
            if (stopW == msgArray[j].toLowerCase()) {
                // console.log("true");
                match = true;
            }
        }
        if (!match) {
            cleanedMsg.push(msgArray[j].toLowerCase())
        }
    }

    // console.log(cleanedMsg);

    return cleanedMsg;
}

function checkForHelpwords(e, number) {
    var msgArray = e;
    // console.log(msgArray)
    let oriLength = msgArray.length;
    // console.log(oriLength)

    // check of multiple repeated words before relevance
    for (let i = 0; i < msgArray.length; ++i) {
        var repeated = 0;
        for (let j = 0; j < msgArray.length; ++j) {
            if (msgArray[j] == msgArray[i]) {
                repeated += 1;
            }
        }
        if (repeated > msgArray.length / 2) {
            return 0;
        }
    }

    // var relevanceW = catWords[number];
    var relevanceW = helpWords.concat(catWords[number]);
    // console.log("this are the list of words " + relevanceW);

    var relevanceCount = 0;

    for (let i = 0; i < relevanceW.length; ++i) {
        // console.log(stopwords[i]);
        let helpW = relevanceW[i];
        for (let j = 0; j < msgArray.length; ++j) {
            // console.log(msgArray[j]);
            if (helpW == msgArray[j]) {
                // console.log("true");
                relevanceCount += 1;
            }
        }
    }
    return relevanceCount / oriLength;
}

function checkMessageRevelance(e, number) {
    let cleanedMsg = removeStopwords(e);
    console.log(cleanedMsg);
    // let cleanedMsgArray = cleanedMsg.split(' ');
    let cleanedMsgArray = cleanedMsg;
    let prob = checkForHelpwords(cleanedMsgArray, number);
    console.log(prob);

    var relevance = false;

    if (prob > 0.25 && prob < 0.9) {
        relevance = true
    }
    return relevance;
}

describe('#check if messages are valid', () => {
    it('Check for help - fail cause not enough info', () => {
        let message = "Hello my name is something. can you help me with something please thank you."
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(false);
    });

    it('Check for help - pass', () => {
        let message = "Hello my name is something. can you help me with this please. Somehow i cannot proceed to the next page even though i have pressed next."
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(true);
    });

    it('Check for problems - fail cause not enough info', () => {
        let message = "Hello I am having problem with this."
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(false);
    });

    it('Check for problems - pass', () => {
        let message = "Hello I am having problem with the app. I do not know how to use this the emotion feature. Please assist me thank you."
        let result = checkMessageRevelance(message, 23);
        expect(result).toEqual(true);
    });

    it('Calrification', () => {
        let message = "I would like to clarify on this product that I was looking at on your webpage."
        let result = checkMessageRevelance(message, 2);
        expect(result).toEqual(true);
    });

    it('Customer considerations', () => {
        let message = "What is your companys solution to this problem? How is it different abc company?"
        let result = checkMessageRevelance(message, 1);
        expect(result).toEqual(true);
    });

    it('No relevence', () => {
        let message = "I am typing some nonsense catch me if you can!"
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(false);
    });

    it("messy words", () => {
        let message = "sierq3 5-5p3tmu039c8t4ix3] AWUEYRCQ29 YRUuh  U4IYCR19 1 UIHUQZHWUIH   8y QWRIHXQ RQIWR QOIWJ QUZEU   Y SIUGH sdugh uhg w8 83jiosjfkaesgbewe ghe geiqgqiog qqih wn wfq385 2c ma fjsoivh asahg qjnfqmw fwgisdyv asngmaen woa8yeohva;sg noagi uapg98haoangwnt. ag,.ksgj oahgawbtqtb q ausb aloa nwkr wury hsjfa sfnl aw8th q4th kjasna"
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(false);
    });

    it("messy words2", () => {
        var txtIn = "wahe n thcu eauiti teit iaaw iuhc ui ecnh ioep2 835p 0285 ";
        let result = checkMessageRevelance(txtIn);

        expect(result).toEqual(false);
    })

    it("Test foolprove", () => {
        let message = "I am just typing something relevent in the reply. This is rbbish, you won;t shouldnt know so see with there."
        let result = checkMessageRevelance(message, 3);
        expect(result).toEqual(false);
    });

    it("Test customer feedback", () => {
        let message = "HI am very unhappy with the product that I bought last week. The Ai translator is supposed to work but it is not working. When I got back to the store they reject me!"
        let result = checkMessageRevelance(message, 2);
        expect(result).toEqual(true);
    });

    it("Test software error", () => {
        let message = "Hello I am facing problems with connecting to the server. It is showing error 501 no server but I have followed the documentation. Please fix it soon thank you!"
        let result = checkMessageRevelance(message, 9);
        expect(result).toEqual(true);
    });

    it("Test customer complaint", () => {
        let message = "Hello, I'm Sarthak, I bought you a product last summer, I'm facing some problems. It seems to be still failing once you log in to the service. Please, advice on what I can do. Thank you. My membership number is 12345678."
        let result = checkMessageRevelance(message, 7);
        expect(result).toEqual(true);
    });

    it("Not related to topic", () => {
        let message = "Hello my name is something. How was your day? are you doing okay? I am fine thank you. You have been a good friend. I like to meet you someday"
        let result = checkMessageRevelance(message, 24);
        expect(result).toEqual(false);
    });

    it("repeated words that are not relevant", () => {
        var txtIn = "hello hello hello heelllo helllo";
        let result = checkMessageRevelance(txtIn, 10);

        expect(result).toEqual(false);
    });

    it("repeated words that are relevant but not enough information", () => {
        var txtIn = "Product login cannot work. Help please";
        let result = checkMessageRevelance(txtIn, 10);

        expect(result).toEqual(false);
    });

    it("repeated words that are relevant but is spam", () => {
        var txtIn = "Product not working. product not working. not working. why is it not working.";
        let result = checkMessageRevelance(txtIn, 10);

        expect(result).toEqual(false);
    })

    /*
    it("Category mismatch - AR menu and smart restraunt", () => {
        let message = "I have been managing my resturant with the menu app that you guys have. It has been working fine so far until yesterday my customers feedback to me that they cannot click on the menu times. Could you look into that please thank you!"
        let result = checkMessageRevelance(message,20);
        expect(result).toEqual(false);
    });
    */


})