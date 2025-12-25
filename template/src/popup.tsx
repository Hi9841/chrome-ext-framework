import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css'; // Import our new beautiful styles

const Popup = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Click the button!");

  // Example: How to send a message to the Background Script
  const sendMessageToBackground = () => {
    chrome.runtime.sendMessage({ type: "HELLO" }, (response) => {
      // Update UI based on response
      if (response) {
        setMessage(`Background says: ${response.reply}`);
      }
    });
  };

  return (
    <div className="container">
      <h1>🚀 Extension Ready</h1>
      <p>Start building your next big idea.</p>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/popup.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <p>{message}</p>
        <button onClick={sendMessageToBackground}>
          Ping Background Script
        </button>
      </div>

      <p className="read-the-docs">
        Powered by your custom framework
      </p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);