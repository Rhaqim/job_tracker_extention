chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "bghighlight") {
    var color = message.color;

    if (color === "green") {
      document.body.style.backgroundColor = "green";
    } else if (color === "red") {
      document.body.style.backgroundColor = "red";
    } else {
      document.body.style.backgroundColor = "white";
    }

    console.log("The message sender is: ", sender);
    sendResponse("Background color changed!");
  }
});