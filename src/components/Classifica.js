import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Classifica({ codice }) {
  const [classifica, setClassifica] = useState([]);

  useEffect(() => {
    const fetchClassifica = async () => {
      try {
        const response = await axios.get('http://localhost:5000/classifica');
        setClassifica(response.data);
      } catch (error) {
        console.error('Errore:', error);
      }
    };
    fetchClassifica();
  }, [codice]);

  return (
    <div>
      <h2>Classifica</h2>
      <ul>
        {classifica.map((item, index) => (
          <li key={index} style={{
            backgroundColor: index === 0 ? 'gold' : index === classifica.length - 1 ? 'red' : 'white',
          }}>
            {item.bar} - Media: {item.media.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classifica;