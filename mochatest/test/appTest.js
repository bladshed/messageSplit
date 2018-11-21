const assert = require('chai').assert;
const app = require('../splitMessage').messageSplit;

/*
 * This test will check if the input message with less than or equal 50 characters will remain as is
 */
describe('Message contains less than 50 characters', function(){
  it('Should return the orignal input message', function(){
    // Expected value
    var expectedMessage = new Array();
    expectedMessage.push("");
    expectedMessage.push("Hi! My name is LeBron James.");

    var actualMessage = app("Hi! My name is LeBron James.");

    // Verify arraylist for expected and actual values
    for (var i = 0; i < expectedMessage.length; i++){
      assert.equal(expectedMessage[i], actualMessage[i]);
    }
  });
});

/**
 * This test will check if the input message with more than 50 characters will be divided into 50 characters per line
 */
 describe('Message contains more than 50 characters', function(){
   it('Should return the message chunks', function(){
     // Expected value
     var expectedMessage = new Array();
     expectedMessage.push("");
     expectedMessage.push("1/2 I can't believe Tweeter now supports chunking ");
     expectedMessage.push("2/2 my messages, so I don't have to do it myself. ");

     var actualMessage =
      app("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.");

      // Verify arraylist for expected and actual values
      for (var i = 0; i < expectedMessage.length; i++){
        assert.equal(expectedMessage[i], actualMessage[i]);
      }
   });
 });

 /**
  * This test will check if the return message will have an error
  */
  describe('Message contains word/s with more than 50 characters', function(){
    it('Should return error message', function(){
      // Expected value
      var expectedMessage = new Array();
      expectedMessage.push("[ERROR 1] The message contains word/s with more than 50 characters.");

      var actualMessage =
        app("I can't believeTweeternowsupportschunkingmymessages,soIdon'thave to do it myself.");

      // Verify arraylist for expected and actual values
      for (var i = 0; i < expectedMessage.length; i++){
        assert.equal(expectedMessage[i], actualMessage[i]);
      }
    });
  });
