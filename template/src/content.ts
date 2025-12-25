// -----------------------------------------------------------------------------
// This is the Content Script
// It runs ON the web page. It can read and modify the DOM (HTML) of the site.
// -----------------------------------------------------------------------------

console.log("🦄 Content script loaded on:", window.location.href);

// Example: Inject a visual badge onto the page to show the extension is working
const badge = document.createElement("div");

// Style the badge (You can also use a CSS file and inject it!)
Object.assign(badge.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 15px",
  backgroundColor: "#3b82f6", // Modern Blue
  color: "white",
  zIndex: "9999",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  fontFamily: "system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: "bold",
  pointerEvents: "none", // Let clicks pass through
});

badge.textContent = "⚡ Extension Active";
document.body.appendChild(badge);

// Example: Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "change_color") {
    document.body.style.backgroundColor = "pink";
  }
});