import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/hello')  // URL to your backend endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

return (
  <div>
    <h1>Data from Backend:</h1>
    {data ? <p>{data.message}</p> : <p>Loading...</p>}
  </div>
);
}

export default App;
