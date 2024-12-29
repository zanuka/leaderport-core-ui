// Simple background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_SUI_WALLET") {
    chrome.runtime.sendMessage("opcgpfmipidbgpenhmajoajpbobppdil", {
      type: "sui_open",
    });
    sendResponse({ success: true });
  }
  return true;
});
