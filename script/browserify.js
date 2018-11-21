(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
This script will support the following functionality:
 a. If message is less than 50 characters, it will return the message as is
 b. If message is greater than 50 characters, the message will be split.
  - Each split will contain not more 50 characters
  - Split messages will have a "part indicator" appended to the beginning of
    each section (e.g. 1/2, 2/2).
 c. Messages will only be split on whitespace. If the message contains a span
 of non-whitespace characters longer than 50 characters, it will display
  an error.

This functionality that splits messages is a standalone function.
*/

module.exports = {
  // This function will split the input message
  messageSplit: function (message){

    // Initialize variable
    var finalMessage = new Array();
    var messageAry = new Array();

    // Trim message to cut whitespace/s at the end
    message = message.trim();

   // Check if message is more than 50 chars
   if(message.length > 50){

       // Initialize var
       var tempMessage = "";
       var ctr = 1;

       // Initialize value with no error
       finalMessage.push("");

       // Get line counts and reset ctr to 1
       var lineCount = getTotalLines(message);

       if(lineCount === 0){
          finalMessage[0] = "[ERROR 1] The message contains word/s with more than 50 characters."

          return finalMessage;
       } else {

         ctr=1;

         // Split message by whitespace
         messageAry = message.split(" ");

         // Finalize message
         messageAry.forEach(function(word) {

           if(word.length <= 50){
               if(tempMessage === ""){
                   tempMessage = ctr + "/" + lineCount + " " + word + " ";
               } else if ((tempMessage + word).length == 50){
                   finalMessage.push(tempMessage + word);
                   ctr++;
                   tempMessage = "";
               } else if ((tempMessage + word).length < 50) {
                   tempMessage = tempMessage + word + " ";
               } else if ((tempMessage + word).length > 50){
                   ctr++;
                   finalMessage.push(tempMessage);
                   tempMessage = ctr + "/" + lineCount + " " + word + " ";
               }
           }
         });

         finalMessage.push(tempMessage);

       }
   } else {
     // Return original message
     finalMessage.push("");
     finalMessage.push(message);
     return finalMessage;
   }

   // Return split messages
   return finalMessage;

  }
}

// Function that will the total number of lines
function getTotalLines(message){
  // Variable
  var initialCount = 1;

  // Loop until count is greater than 0
  do{
    var count = countLines(message, initialCount);
    initialCount = initialCount * 10;
  }
  while (count < 0);

  // Divide initial count to 10
  initialCount = initialCount / 10;

  // Return count value
  return countLines(message, initialCount);

}

/*
Functions that will compute the total number of lines
It will return three values:
-1 : value is greater than initial counter count
0 : encounters an error
1 : process is successful
 */
function countLines(message, initialCount){
  var inCtr = initialCount * 10;

  // Variables
  var origMessage = message;
  var tempMessage = "";
  var ctr = 1;
  var intStr = initialCount.toString();
  var tempSumStr = "";

  // Split message by whitespace
  messageAry = message.split(" ");

  // Add temp total str
  for (var i = 0; i < intStr.length; i++){
    tempSumStr = tempSumStr + "*";
  }

  var bool = false;

  // Loop words to count lines
  messageAry.forEach(function(word) {
    // Can not stop forEach loop but will end each process
    if (ctr < 0 || ctr === 0){
      return;
    }

    // Verify if word is not more than 50 characters
    if(word.length <= 50){
        if(tempMessage === ""){
            if(bool){
              ctr ++;
            }
            tempMessage = ctr + "/" + tempSumStr + " " + word + " ";
        } else if ((tempMessage + word).length == 50){
            tempMessage = "";
            bool = true;
        } else if ((tempMessage + word).length < 50) {
            tempMessage = tempMessage + word + " ";
        } else if ((tempMessage + word).length > 50){
          // Check if counter is greater than the initial total
          if(ctr >= inCtr){
              ctr = -1;
          }else{
            ctr++;
          }

          tempMessage = ctr + "/" + tempSumStr + " " + word + " ";
        }
    } else {
      // Word is more that 50 characters
      console.log("ERROR");
      ctr = 0;
      return;
    }
  });

  // Return count value
  return ctr;
}

},{}],2:[function(require,module,exports){
/*
Main script for twiter web app
*/
// This where the form will be processed

const messageSplit = require('../mochatest/splitMessage.js').messageSplit;

window.onload=function(){

  var postButton = document.getElementById('post-btn');
  postButton.addEventListener('click', processForm);

  function processForm(){
    // Get element value
    var message = document.getElementById("messageBox").value;

    // get split message from messageSplit
    var getSplitMessage = messageSplit(message);

    // Verify if theres an error
    if (getSplitMessage[0] !== "") {
      // Show alert failed
      $('#success-failed').show();
      setTimeout(function () {
        $('#success-failed').fadeOut();
      }, 2000);
      document.getElementById('postMessage').innerHTML = getSplitMessage[0];
    } else {
      var finalMessage = "";
      // Post each sentence
      getSplitMessage.forEach(function(sentence) {
        if (sentence !== ""){
          // Show alert success
          $('#success-alert').show();
          setTimeout(function () {
            $('#success-alert').fadeOut();
          }, 2000);
          finalMessage = finalMessage + sentence + "<br>";
        }

      });
      document.getElementById('postMessage').innerHTML = finalMessage;
    }

    // Clear message box
    document.getElementById('messageBox').value = "";
  }
}

},{"../mochatest/splitMessage.js":1}]},{},[2]);
