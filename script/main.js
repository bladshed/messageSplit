/*
Main script for twiter web app
*/

// This where the form will be processed
function processForm(){
  // Get element value
  var message = document.getElementById("messageBox").value;

  // get split message from messageSplit
  var getSplitMessage = messageSplit(message);

  // Verify if an theres an error
  if (getSplitMessage[0] !== "") {
    $('#success-failed').show();
    setTimeout(function () {
      $('#success-failed').fadeOut();
    }, 2000);
    document.getElementById('postMessage').innerHTML = getSplitMessage[0];
  } else {
    var finalMessage = "";
    getSplitMessage.forEach(function(sentence) {
      if (sentence !== ""){
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
