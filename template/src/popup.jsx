import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ width: '300px', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🚀 It Works!</h1>
      <p>This extension was built with your custom framework.</p>
      <button onClick={() => alert('Hello!')}>Click Me</button>
    </div>
  </React.StrictMode>,
)