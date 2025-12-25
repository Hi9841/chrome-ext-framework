// -----------------------------------------------------------------------------
// This is the Background Service Worker
// It runs independently of the web page and handles extension logic.
// -----------------------------------------------------------------------------

console.log("🤖 Background Service Worker is alive!");

// 1. Listen for when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed successfully.");
});

// 2. Listen for messages from the Popup or Content Script
// This is how different parts of your extension talk to each other.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  // Example: Handle a "HELLO" message
  if (message.type === "HELLO") {
    console.log("📩 Received message from popup:", message);
    
    // Send a response back
    sendResponse({ reply: "PONG! 🏓" });
  }

  // Important: Return true to indicate we will respond asynchronously
  return true;
});