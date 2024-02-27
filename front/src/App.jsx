import React, { useEffect, useState } from "react";

function App() {
  const token = getAuthToken();
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:5000/sup/roteiro/ver', option);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </>
  );
}

export default App;

const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('Authorization=')) {
      return cookie.substring('Authorization='.length);
    }
  }
  return null;
};
