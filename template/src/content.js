console.log("🦄 Content script loaded!");

// Let's add a visual cue to prove it works
const badge = document.createElement("div");
badge.style.position = "fixed";
badge.style.bottom = "10px";
badge.style.right = "10px";
badge.style.padding = "10px";
badge.style.backgroundColor = "black";
badge.style.color = "white";
badge.style.zIndex = "9999";
badge.style.borderRadius = "5px";
badge.textContent = "⚡ Extension Active";

document.body.appendChild(badge);