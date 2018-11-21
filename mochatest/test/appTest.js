const assert = require('chai').assert;
const app = require('../splitMessage').messageSplit;

/*
 * This test will check if the input message with less than or equal 50 characters will remain as is
 */
describe('Message contains less than 50 characters', function(){
  it('Should return the orignal input message', function(){
    // Expected value
    var expectedMessageArray = new Array();
    expectedMessageArray.push("");
    expectedMessageArray.push("Hi! My name is LeBron James.");
    var expectedMessage = expectedMessageArray.toString

    var actualMessage = app("Hi! My name is LeBron James.").toString

    assert.equal(actualMessage, expectedMessage);
  });
});

/**
 * This test will check if the input message with more than 50 characters will be divided into 50 characters per line
 */
 describe('Message contains more than 50 characters', function(){
   it('Should return the message chunks', function(){
     // Expected value
     var expectedMessageArray = new Array();
     expectedMessageArray.push("");
     expectedMessageArray.push("1/2 I can't believe Tweeter now supports chunking");
     expectedMessageArray.push("2/2 my messages, so I don't have to do it myself.");
     var expectedMessage = expectedMessageArray.toString

     var actualMessage =
      app("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.").toString

     assert.equal(actualMessage, expectedMessage);
   });
 });

 /**
  * This test will check if the return message will have an error
  */
  describe('Message contains word/s with more than 50 characters', function(){
    it('Should return error message', function(){
      // Expected value
      var expectedMessageArray = new Array();
      expectedMessageArray.push("[ERROR 1] The message contains word/s with more than 50 characters.");
      var expectedMessage = expectedMessageArray.toString

      var actualMessage =
        app("I can't believeTweeternowsupportschunkingmymessages,soIdon'thave to do it myself.").toString

      assert.equal(actualMessage, expectedMessage);
    });
  });
