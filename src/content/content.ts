// This script runs in the context of web pages
window.addEventListener("message", function (event) {
  // Handle messages from the extension
  if (event.source !== window) return;

  if (event.data.type && event.data.type === "SUI_WALLET_MESSAGE") {
    chrome.runtime.sendMessage("opcgpfmipidbgpenhmajoajpbobppdil", event.data);
  }
});

export {}; // Make this a module
