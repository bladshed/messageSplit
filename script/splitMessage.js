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

// This function will split the input message
function messageSplit(message){

  // Initialize variable
  var finalMessage = new Array();
  var messageAry = new Array();

 // Check if message is more than 50 chars
 if(message.length > 50){

     // Initialize var
     var tempMessage = "";
     var ctr = 1;

     finalMessage.push("");

     // Get line counts and reset ctr to 1
     var lineCount = getTotalLines(message);
     console.log("Line count = " + lineCount);

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
   finalMessage.push(message);
   return finalMessage;
 }

 // Return split messages
 return finalMessage;

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
  console.log("NOT EXCEEDING COUNT : " + (initialCount * 10));
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

  // Loop words to count lines
  messageAry.forEach(function(word) {
    // Can not stop forEach loop but will end each process
    if (ctr < 0 || ctr === 0){
      return;
    }

    // console.log("ctr count : " + ctr);
    // console.log("temp message : " + tempMessage);
    // console.log("message length : " + (tempMessage + word).length);

    // Verify if word is not more than 50 characters
    if(word.length <= 50){
        if(tempMessage === ""){
            tempMessage = ctr + "/" + tempSumStr + " " + word + " ";
        } else if ((tempMessage + word).length == 50){
            tempMessage = "";
            ctr ++;
        } else if ((tempMessage + word).length < 50) {
            tempMessage = tempMessage + word + " ";
        } else if ((tempMessage + word).length > 50){
          // Check if counter is greater than the initial total
          if(ctr === (initialCount * 10) || ctr > (initialCount * 10)){
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
